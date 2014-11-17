var React = require('react');
var Support = require('../lib/support');
var d3 = require('d3');

var TimeSeriesChart = React.createClass({
  chart: function(selection){
    var _scale = d3.time.scale();
    var lscale = d3.scale.linear();
    var _X = function(d){
      return xScale(xValue(d));
    };
    var _Y = function(d){
      return yScale(yValue(d));
    };
    var {
      margin,
      width,
      height,
      xValue,
      yValue,
      xScale,
      yScale,
      xAxis,
      area,
      line,
      style
    } = Support.getProps(this, 'chart', {
      margin: Support.types.Object({
                  top: Support.types.Number(20),
                  right: Support.types.Number(20),
                  bottom: Support.types.Number(20),
                  left: Support.types.Number(20)
                }),
      width: Support.types.Number(760),
      height: Support.types.Number(120),
      style: Support.types.Object(false),
      xValue: Support.types.Function(function(d) {
          return d[0];
        }),
      yValue: Support.types.Function(function(d) {
          return d[1];
        }),
      xScale: Support.types.Function(_scale),
      yScale: Support.types.Function(lscale),
      xAxis: Support.types.Function(d3.svg.axis().scale(_scale).orient("bottom").tickSize(6, 0))
    });
    var area = d3.svg.area().x(_X).y1(_Y);
    var line = d3.svg.line().x(_X).y(_Y);

    selection.each(function(data) {


      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      }).sort(function(a, b){
        return a[0]-b[0];
      });

      // Update the x-scale.
      xScale
          .domain(d3.extent(data, function(d) { return d[0]; }))
          .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      yScale
          .domain([0, d3.max(data, function(d) { return d[1]; })])
          .range([height - margin.top - margin.bottom, 0]);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "area");
      gEnter.append("path").attr("class", "line");
      gEnter.append("g").attr("class", "x axis");

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the area path.
      g.select(".area")
          .attr("d", area.y0(yScale.range()[0]));

      // Update the line path.
      g.select(".line")
          .attr("d", line);

      // Update the x-axis.
      g.select(".x.axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis);

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
  TimeSeriesChart: TimeSeriesChart
};
