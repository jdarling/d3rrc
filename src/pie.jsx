var React = require('react');
var Support = require('../lib/support');
var d3 = require('d3');

var PieChart = React.createClass({
  chart: function(selection){
    var idx = 1;
    var {
      margin,
      width,
      height,
      duration,
      identity,
      innerRadius,
      style,
      onUpdate,
      getValue,
      colorRange,
      color,
      getText,
      getIdentity,
      enterSlice,
      updateSlice,
      exitSlice,
    } = Support.getProps(this, 'chart', {
      margin: Support.types.Object({
                  top: Support.types.Number(20),
                  right: Support.types.Number(10),
                  bottom: Support.types.Number(20),
                  left: Support.types.Number(50)
                }),
      width: Support.types.Number(-1),
      height: Support.types.Number(500),
      duration: Support.types.Number(500),
      identity: Support.types.String('_id'),
      innerRadius: Support.types.Number(0),
      style: Support.types.Object(false),
      onUpdate: Support.types.Function(false),
      getValue: Support.types.Function(function x(d){
        return +d.value;
      }),
      colorRange: Support.types.Function(false),
      color: Support.types.Function(false),
      getText: Support.types.Function(function(d){
        return d.text||'';
      }),
      getIdentity: Support.types.Function(function(d){
        return d.data[identity] || (d.data[identity] = ++idx);
      }),
      enterSlice: Support.types.Function(function(node, arc){
        node.append('path')
          .style('fill', function(d){
            return color(d.data);
          })
          ;
        node.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return getText(d.data); });
      }),
      updateSlice: Support.types.Function(function(node, arc){
        node.select('path')
          .style('fill', function(d){
            return color(d.data);
          })
          .attrTween('d', function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
              return arc(interpolate(t));
            };
          });
        node.select('text')
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .text(function(d) { return getText(d.data); });
      }),
      exitSlice: Support.types.Function(function(node, arc){})
    });

    color = color || function(d){
      return d.color||colorRange(getValue(d));
    };

    selection.each(function(data){
      var wid = width===-1?this.offsetWidth:width;
      var w = wid - margin.left - margin.right;
      var h = height - margin.top - margin.bottom;
      var r = (w>h)?Math.floor(h/2):Math.floor(w/2);
      var svg = d3.select(this).select('svg');
      var min = d3.min(data, getValue), max = d3.max(data, getValue);
      var i=0, l=data.length;
      for(;i<l; i++){
        data[i][identity] = data[i][identity] || idx++;
      }
      colorRange = colorRange || d3.scale.linear().domain([min, max]).range(["#ddd", "#333"]);

      if(!svg[0][0]){
        svg = d3.select(this).append('svg');
      }
      svg
        .attr('width', wid)
        .attr('height', height)
        ;

      var arc = d3.svg.arc()
          .outerRadius(r)
          .innerRadius(innerRadius);

      var pie = d3.layout.pie()
          .value(getValue);

      var main = svg.select('g');
      var slices = main.select('.slices');
      if(!main[0][0]){
        main = svg.append('g');
        slices = main.append('g').attr('class', 'slices');
      }
      main
        .attr('transform', 'translate('+(margin.left+(w/2))+', '+(margin.top+(h/2))+')')
        ;

      var slice = slices.selectAll('g.slice')
        .data(pie(data, getIdentity));
        ;

      var sliceEnter = slice.enter()
        .append('g')
        .attr('class', 'slice')
        ;
      enterSlice(sliceEnter, arc);

      updateSlice(slice.transition().duration(duration), arc);

      var sliceExit = slice.exit()
        .remove()
        ;

      exitSlice(sliceExit);

      if(style){
        Object.keys(style).forEach(function(key){
          svg.selectAll(key).attr('style', style[key]);
        });
      }
    });
  },
  renderChart: function(data){
    if(!data){
      return;
    }
    var container = this.getDOMNode();
    d3.select(container)
      .datum(data)
      .call(this.chart)
      ;
  },
  componentDidMount: function(){
    return this.renderChart(this.props.data);
  },
  componentDidUpdate: function(){
    return this.renderChart(this.props.data);
  },
  render: function(){
    var classNames = Support.classList(this, {
      'bar-chart': true
    });
    return (
      <div className={classNames}>
      </div>
    );
  }
});

module.exports = {
  PieChart: PieChart
};
