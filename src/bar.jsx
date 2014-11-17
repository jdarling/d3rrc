var React = require('react');
var Support = require('../lib/support');
var d3 = require('d3');

var VBarChart = React.createClass({
  chart: function(selection){
    var scaleO = d3.scale.ordinal();
    var scaleL = d3.scale.linear();
    var {
      margin,
      width,
      height,
      xRoundBands,
      xValue,
      yValue,
      xScale,
      yScale,
      xAxis,
      yAxis,
      xAxisBottom,
      duration,
      getColor,
      enterBar,
      updateBar,
      exitBar,
      style
    } = Support.getProps(this, 'chart', {
      margin: {top: 30, right: 10, bottom: 50, left: 50},
      width: -1,
      height: 420,
      xRoundBands: 0.2,
      xValue: function(d) { return d[0]; },
      yValue: function(d) { return d[1]; },
      xScale: scaleO,
      yScale: scaleL,
      yAxis: d3.svg.axis().scale(scaleL).orient("left"),
      xAxis: d3.svg.axis().scale(scaleO),
      xAxisBottom: d3.svg.axis().scale(scaleO),
      duration: 500,
      getColor: false,
      enterBar: function(bar){
        bar = bar.append("rect")
          .attr("class", function(d, i) { return yValue(d) < 0 ? "negative" : "positive"; })
          ;
        if(getColor){
          bar.style('fill', getColor);
        }
      },
      updateBar: function(bar){
        bar.select('rect')
          .attr("class", function(d) { return yValue(d) < 0 ? "negative" : "positive"; })
          .attr("x", function(d) { return X(d); })
          .attr("y", function(d) { return yValue(d) < 0 ? Y0() : Y(d); })
          .attr("width", xScale.rangeBand())
          .attr("height", function(d, i) { return Math.abs( Y(d) - Y0() ); })
          ;
      },
      exitBar: function(bar){},
      style: false
    });
    var X = function(d){
      return xScale(xValue(d));
    };
    var Y0 = function(){
      return yScale(0);
    };
    var Y = function(d){
      return yScale(yValue(d));
    };
    height = parseInt(height);
    width = parseInt(width);
    duration = parseInt(duration);
    xRoundBands = parseFloat(xRoundBands);

    selection.each(function(data) {
      var w = width===-1?this.offsetWidth:width;
      // Update the x-scale.
      xScale
          .domain(data.map(xValue))
          .rangeRoundBands([0, w - margin.left - margin.right], xRoundBands);

      var ys = d3.extent(data.map(yValue));
      if(ys[0]>0){
        ys[0] = 0;
      }

      // Update the y-scale.
      yScale
          .domain(ys)
          .range([height - margin.top - margin.bottom, 0])
          .nice();

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "bars");
      gEnter.append("g").attr("class", "y axis");
      gEnter.append("g").attr("class", "x axis bottom");
      gEnter.append("g").attr("class", "x axis zero");

      // Update the outer dimensions.
      svg.attr("width", w)
         .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     // Update the bars.
      var bars = svg.select(".bars");//.selectAll(".bar");//.data(data);
      var bar = bars.selectAll('g.bar').data(data);

      var barEnter = bar.enter()
        .append("g")
        .attr('class', 'bar')
        ;
      enterBar(barEnter);
      updateBar(bar.transition().duration(duration));
      var barExit = bar.exit()
        .remove()
        ;
      exitBar(barExit);

    // x axis at the bottom of the chart
    g.select(".x.axis.bottom")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
        .call(xAxisBottom.orient("bottom"));
    // zero line
     g.select(".x.axis.zero")
        .attr("transform", "translate(0," + Y0() + ")")
        .call(xAxis.tickFormat("").tickSize(0));

      // Update the y-axis.
      g.select(".y.axis")
        .call(yAxis);
      g.selectAll(".axis line")
          .attr('style', 'shape-rendering: crispEdges; stroke: black; fill: none;')
        ;
        g.selectAll('.axis path')
          .attr('style', 'shape-rendering: crispEdges; stroke: black; fill: none;')
        ;

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
  VBarChart: VBarChart
};
