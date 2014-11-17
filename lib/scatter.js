var React = require('react');
var Support = require('../lib/support');
var d3 = require('d3');

var ScatterChart = React.createClass({displayName: 'ScatterChart',
  chart: function(selection){
    var $__0=
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      Support.getProps(this, 'chart', {
      margin: Support.types.Object({
            top: Support.types.Number(30),
            right: Support.types.Number(10),
            bottom: Support.types.Number(50),
            left: Support.types.Number(50)
          }),
      width: Support.types.Number(-1),
      height: Support.types.Number(420),
      duration: Support.types.Number(500),
      showXAxis: Support.types.Boolean(true),
      showYAxis: Support.types.Boolean(true),
      identity: Support.types.String('_id'),
      idx: Support.types.Number(1),
      style: Support.types.Object(false),
      getColor: Support.types.Function(false),
      getX: Support.types.Function(function x(d){
        return d.x;
      }),
      getY: Support.types.Function(function y(d){
        return d.y;
      }),
      getR: Support.types.Function(function(d){
        return 8;
      }),
      getScaleX: Support.types.Function(function(data, w){
        var min = d3.min(data, getX), max = d3.max(data, getX);
        var r = ((max - min) * 0.1) || 1;
        min -= r;
        max += r;
        return d3.scale.linear()
          .domain([min, max])
          .range([0, w])
          ;
      }),
      getScaleY: Support.types.Function(function(data, h){
        var min = d3.min(data, getY), max = d3.max(data, getY);
        var r = ((max - min) * 0.1) || 1;
        min -= r;
        max += r;
        return d3.scale.linear()
          .domain([max, min])
          .range([0,h])
          ;
      }),
      getColor: Support.types.Function(function(d){
        return 'black';
      }),
      getText: Support.types.Function(function(d){ return d.text||''; }),
      enterNode: Support.types.Function(function(node){
        var circle = node.append('svg:circle')
            .attr('r', 1e-6);

        if(getColor){
          circle.style('fill', getColor);
        }

        node.append('svg:text')
            .attr('text-anchor', 'middle')
            .attr('dy', function(d){return -getR(d)-3})
            .text(getText)
            .style('fill-opacity', 1);
      }),
      updateNode: Support.types.Function(function(node){
        node.select('text')
          .text(getText);

        node.select('circle')
            .attr('r', getR);
      }),
      exitNode: Support.types.Function(function(node){
        node.select('circle')
            .attr('r', 1e-6);

        node.select('text')
            .style('fill-opacity', 1e-6);
      })
    }),margin=$__0.margin,width=$__0.width,height=$__0.height,duration=$__0.duration,showXAxis=$__0.showXAxis,showYAxis=$__0.showYAxis,identity=$__0.identity,idx=$__0.idx,style=$__0.style,onUpdate=$__0.onUpdate,getColor=$__0.getColor,getX=$__0.getX,getY=$__0.getY,getR=$__0.getR,getScaleX=$__0.getScaleX,getScaleY=$__0.getScaleY,getColor=$__0.getColor,getText=$__0.getText,enterNode=$__0.enterNode,updateNode=$__0.updateNode,exitNode=$__0.exitNode,style=$__0.style;

    selection.each(function(data){
      var wid = width===-1?this.offsetWidth:width;
      var w = wid - margin.left - margin.right;
      var h = height - margin.top - margin.bottom;
      var svg = d3.select(this).select('svg');
      var x = getScaleX(data, w);
      var y = getScaleY(data, h);

      if(showXAxis){
        var xAxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')
          ;
      }
      if(showYAxis){
        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
          ;
      }

      if(!svg[0][0]){
        svg = d3.select(this).append('svg');
      }
      svg
        .attr('width', wid)
        .attr('height', height)
        ;

      var node = svg.selectAll('g.node')
          .data(data, function(d) { return d[identity] || (d[identity] = ++idx); })
          ;
      var nodeEnter = node.enter().append('svg:g')
          .attr('class', 'node')
          .attr('transform', function(d, i) {
            return 'translate(' + (x(getX(d, i)) + margin.left) + ',' +  (margin.top+h)  + ')';
          })
          ;
      enterNode(nodeEnter);

      var nodeUpdate = node.transition()
          .duration(duration)
          .attr('transform', function(d, i) { return 'translate(' + (x(getX(d, i)) + margin.left) + ', ' +  (y(getY(d, i)) + margin.top) + ')'; })
          ;

      updateNode(nodeUpdate);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr('transform', function(d, i) { return 'translate(' + (x(getX(d, i)) + margin.left) + ', ' +  (margin.top+h) + ')'; })
          .remove()
          ;

      exitNode(nodeExit);

      if(showXAxis){
        var xA = svg.select('g.xAxis');
        if(!xA[0][0]){
          xA = svg.append('g')
            .attr('class', 'axis xAxis')
            .attr('transform', 'translate(' + margin.left + ',' + (h+margin.top) + ')')
            .call(xAxis)
            ;
        }else{
          xA.transition()
            .duration(duration)
            .call(xAxis)
            ;
        }
        xA.selectAll('line')
          .attr('style', 'shape-rendering: crispEdges; stroke: black; fill: none;')
          ;
        xA.selectAll('path')
          .attr('style', 'shape-rendering: crispEdges; stroke: black; fill: none;')
          ;
      }

      if(showYAxis){
        var yA = svg.select('g.yAxis');
        if(!yA[0][0]){
          yA = svg.append('g')
            .attr('class', 'axis yAxis')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(yAxis)
            ;
        }else{
          yA.transition()
            .duration(duration)
            .call(yAxis)
            ;
        }
        yA.selectAll('line')
          .attr('style', 'shape-rendering: crispEdges; stroke: black; fill: none;')
          ;
        yA.selectAll('path')
          .attr('style', 'shape-rendering: crispEdges; stroke: black; fill: none;')
          ;
      }

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
      React.createElement("div", {className: classNames}
      )
    );
  }
});

module.exports = {
  ScatterChart: ScatterChart
};
