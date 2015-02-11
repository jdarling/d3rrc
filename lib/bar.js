var React = require('react');
var Support = require('../lib/support');
var d3 = require('d3');

var VBarChart = React.createClass({displayName: 'VBarChart',
  chart: function (selection) {
    var $__0=
      
      
      
      
      
      
      
      
      
      
      
      
      
      Support.getProps(this, 'chart', {
      margin: Support.types.Object({
        top: Support.types.Number(10),
        right: Support.types.Number(10),
        bottom: Support.types.Number(20),
        left: Support.types.Number(50)
      }),
      width: Support.types.Number(-1),
      height: Support.types.Number(420),
      xRoundBands: Support.types.Number(0.2),
      names: Support.types.Function(function (d) {
        return d[0];
      }),
      values: Support.types.Function(function (d) {
        return d[1];
      }),
      duration: Support.types.Number(500),
      color: Support.types.Function(false),
      enterBar: Support.types.Function(function (bar) {
        bar = bar.append('rect')
          .attr('class', function (d, i) {
            return values(d) < 0 ? 'negative' : 'positive';
          });
        if (color) {
          bar.style('fill', function (d) {
            return color(names(d));
          });
        }
      }),
      updateBar: Support.types.Function(function (bar) {
        bar.select('rect')
          .attr('class', function (d) {
            return values(d) < 0 ? 'negative' : 'positive';
          })
          .attr('x', function (d) {
            return X(d);
          })
          .attr('y', function (d) {
            return values(d) < 0 ? Y0() : Y(d);
          })
          .attr('width', xScale.rangeBand())
          .attr('height', function (d, i) {
            return Math.abs(Y(d) - Y0());
          });
      }),
      exitBar: Support.types.Function(function (bar) {}),
      style: Support.types.Object(false)
    }),margin=$__0.margin,width=$__0.width,height=$__0.height,xRoundBands=$__0.xRoundBands,names=$__0.names,values=$__0.values,xAxisBottom=$__0.xAxisBottom,duration=$__0.duration,color=$__0.color,enterBar=$__0.enterBar,updateBar=$__0.updateBar,exitBar=$__0.exitBar,style=$__0.style;
    var X = function (d) {
      return xScale(names(d));
    };
    var Y0 = function () {
      return yScale(0);
    };
    var Y = function (d) {
      return yScale(values(d));
    };
    var scaleO = xScale = d3.scale.ordinal();
    var scaleL = yScale = d3.scale.linear();
    var yAxis = d3.svg.axis().scale(scaleL).orient('left');
    var xAxis = d3.svg.axis().scale(scaleO);
    var xAxisBottom = d3.svg.axis().scale(scaleO);
    height = parseInt(height);
    width = parseInt(width);
    duration = parseInt(duration);

    selection.each(function (data) {
      var w = width === -1 ? this.offsetWidth : width;
      // Update the x-scale.
      xScale
        .domain(data.map(names))
        .rangeRoundBands([0, w - margin.left - margin.right], parseFloat(xRoundBands));

      var ys = d3.extent(data.map(values));
      if (ys[0] > 0) {
        ys[0] = 0;
      }

      // Update the y-scale.
      yScale
        .domain(ys)
        .range([height - margin.top - margin.bottom, 0])
        .nice();

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll('svg').data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append('svg').append('g');
      gEnter.append('g').attr('class', 'bars');
      gEnter.append('g').attr('class', 'y axis');
      gEnter.append('g').attr('class', 'x axis bottom');
      gEnter.append('g').attr('class', 'x axis zero');

      // Update the outer dimensions.
      svg.attr('width', w)
        .attr('height', height);

      // Update the inner dimensions.
      var g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // Update the bars.
      var bars = svg.select('.bars'); //.selectAll('.bar');//.data(data);
      var bar = bars.selectAll('g.bar').data(data);

      var barEnter = bar.enter()
        .append('g')
        .attr('class', 'bar');
      enterBar(barEnter);
      updateBar(bar.transition().duration(duration));
      var barExit = bar.exit()
        .remove();
      exitBar(barExit);

      // x axis at the bottom of the chart
      g.select('.x.axis.bottom')
        .attr('transform', 'translate(0,' + (height - margin.top - margin.bottom) + ')')
        .call(xAxisBottom.orient('bottom'));
      // zero line
      g.select('.x.axis.zero')
        .attr('transform', 'translate(0,' + Y0() + ')')
        .call(xAxis.tickFormat('').tickSize(0));

      // Update the y-axis.
      g.select('.y.axis')
        .call(yAxis);
      g.selectAll('.axis line')
        .attr('style', 'shape-rendering: crispEdges; stroke: black; fill: none;');
      g.selectAll('.axis path')
        .attr('style', 'shape-rendering: crispEdges; stroke: black; fill: none;');

      if (style) {
        Object.keys(style).forEach(function (key) {
          svg.selectAll(key).attr('style', style[key]);
        });
      }
    });
  },
  renderChart: function (data) {
    if (!data) {
      return;
    }
    var container = this.getDOMNode();
    d3.select(container)
      .datum(data)
      .call(this.chart);
  },
  componentDidMount: function () {
    return this.renderChart(this.props.data);
  },
  componentDidUpdate: function () {
    return this.renderChart(this.props.data);
  },
  render: function () {
    var classNames = Support.classList(this, {
      'bar-chart': true
    });
    return React.createElement("div", {className: classNames});
  }
});

var HBarChart = React.createClass({displayName: 'HBarChart',
  chart: function (selection) {
    var $__0=
      
      
      
      
      
      
      
      
      
      
      
      Support.getProps(this, 'chart', {
      margin: Support.types.Object({
        top: Support.types.Number(0),
        right: Support.types.Number(10),
        bottom: Support.types.Number(20),
        left: Support.types.Number(50)
      }),
      width: Support.types.Number(-1),
      height: Support.types.Number(420),
      names: Support.types.Function(function (d) {
        return d[0];
      }),
      values: Support.types.Function(function (d) {
        return d[1];
      }),
      duration: Support.types.Number(500),
      color: Support.types.Function(d3.scale.category10()),
      enterBar: Support.types.Function(function (bar) {
        bar = bar.append('rect')
          .attr('class', 'bar');
        if (color) {
          bar.style('fill', function (d) {
            return color(names(d));
          });
        }
      }),
      updateBar: Support.types.Function(function (bar) {
        bar.select('rect')
          .attr('x', function (d) {
            return margin.left;
          })
          .attr('y', function (d) {
            return Y(d);
          })
          .attr('width', function (d) {
            return X(d);
          })
          .attr('height', yScale.rangeBand());
      }),
      exitBar: Support.types.Function(function (bar) {}),
      style: Support.types.Object(false)
    }),margin=$__0.margin,width=$__0.width,height=$__0.height,names=$__0.names,values=$__0.values,duration=$__0.duration,color=$__0.color,enterBar=$__0.enterBar,updateBar=$__0.updateBar,exitBar=$__0.exitBar,style=$__0.style;
    var xScale = d3.scale.linear();
    var yScale = d3.scale.ordinal();
    var X = function (d) {
      return xScale(values(d));
    };
    var Y = function (d) {
      return yScale(names(d)) + margin.top;
    };

    selection.each(function (data) {
      var w = width === -1 ? this.offsetWidth : width;
      var maxChartHeight = height - margin.top - margin.bottom;

      if (color && color.domain) {
        var cnames = data.map(names);
        color.domain(cnames);
      }

      var svg = d3.select(this).selectAll('svg').data([data]);
      svg.enter().append('svg')
        .attr('width', w)
        .attr('height', height);

      var maxValue = d3.max(data, values);
      yScale.domain(data.map(names));
      xScale.range([0, w - margin.left - margin.right]).domain([0, maxValue]).nice();
      yScale.rangeBands([0, maxChartHeight], 0.1, 0.25);

      var yAxis = d3.svg.axis().scale(yScale).orient('left');
      var xAxis = d3.svg.axis().scale(xScale).orient('bottom');

      var bars = svg.selectAll('.bar')
        .data(data);
      var barEnter = bars.enter()
        .append('g')
        .attr('class', 'bar');
      enterBar(barEnter);
      updateBar(bars.transition().duration(duration));

      var barExit = bars.exit()
        .remove();
      exitBar(barExit);

      //append x axis
      svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + (maxChartHeight + margin.top) + ")")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .style("stroke", "black")
        .style("fill", "none")
        .style("stroke-width", 1)
        .style("shape-rendering", "crispEdges")
        .call(xAxis)
        .selectAll("text")
        .attr("stroke", "none")
        .attr("fill", "black");

      //append y axis
      svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .style("stroke", "black")
        .style("fill", "none")
        .style("stroke-width", 1)
        .style("shape-rendering", "crispEdges")
        .call(yAxis)
        .selectAll("text")
        .attr("stroke", "none")
        .attr("fill", "black");

      if (style) {
        Object.keys(style).forEach(function (key) {
          svg.selectAll(key).attr('style', style[key]);
        });
      }
    });
  },
  renderChart: function (data) {
    if (!data) {
      return;
    }
    var container = this.getDOMNode();
    d3.select(container)
      .datum(data)
      .call(this.chart);
  },
  componentDidMount: function () {
    return this.renderChart(this.props.data);
  },
  componentDidUpdate: function () {
    return this.renderChart(this.props.data);
  },
  componentWillReceiveProps: function(props) {
    console.log('got new props');
    return this.renderChart(props.data);
  },
  render: function () {
    var classNames = Support.classList(this, {
      'bar-chart': true
    });
    return React.createElement("div", {className: classNames});
  }
});

module.exports={
  VBarChart: VBarChart,
  HBarChart: HBarChart
};
