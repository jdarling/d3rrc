var React = require('react');
var Support = require('../lib/support');
var d3 = require('d3');

var LineChart = React.createClass({
  chart: function(selection){
    var {
      margin,
      width,
      height,
      yAxisTitle,
      lineInterpolation,
      duration,
      color,
      style,
      seriesNames,
      seriesValues,
      pointNames,
      pointIndexes,
      pointValues,
      enterSeries,
      updateSeries,
      exitSeries,
      enterPoints,
      updatePoints,
      exitPoints,
      enterSeriesTitle,
      updateSeriesTitle,
      exitSeriesTitle
    } = Support.getProps(this, 'chart', {
      margin: Support.types.Object({
                  top: Support.types.Number(20),
                  right: Support.types.Number(80),
                  bottom: Support.types.Number(30),
                  left: Support.types.Number(50)
                }),
      width: Support.types.Number(-1),
      height: Support.types.Number(420),
      yAxisTitle: Support.types.String(false),
      lineInterpolation: Support.types.String('linear'),
      duration: Support.types.Number(500),
      color: Support.types.Function(d3.scale.category10()),
      style: Support.types.Object(false),
      seriesNames: Support.types.Function(function(d) { return d[0]; }),
      seriesValues: Support.types.Function(function(d) { return d[1]; }),
      pointNames: Support.types.Function(function(d) { return d[0]; }),
      pointIndexes: Support.types.Function(function(d, i) { return i; }),
      pointValues: Support.types.Function(function(d) { return d[1]; }),
      enterSeries: Support.types.Function(function(series){
          series.append('path')
              .attr('class', 'line');
        }),
      updateSeries: Support.types.Function(function(series){
          series.select('path.line')
                   .attr('d', function(d) {
                     return line(seriesValues(d));
                   })
                   .style('stroke', function(d) { return color(seriesNames(d)); });
        }),
      exitSeries: Support.types.Function(function(series){}),
      enterPoints: Support.types.Function(function(points){
          points
            .append("circle")
            .attr("stroke", function(d){
              return color(seriesNames(this.parentNode.parentNode.__data__));
            })
            .attr("r", 5)
            .attr("fill", "white").attr("fill-opacity", .5)
        }),
      updatePoints:Support.types.Function(function(points){

        }),
      exitPoints:Support.types.Function(function(points){

        }),
      enterSeriesTitle: Support.types.Function(function(seriesTitle){
          seriesTitle
            .append('text');
        }),
      updateSeriesTitle: Support.types.Function(function(seriesTitle){
          seriesTitle
            .attr('transform', function(d) {
                var idx = d.idx;
                return 'translate(' + x(pointIndexes(d.value, idx)) + ',' + y(pointValues(d.value, idx)) + ')';
              })
            .attr('x', 3)
            .attr('dy', '.35em')
            .select('text')
            .text(function(d) { return d.name; });
        }),
      exitSeriesTitle: Support.types.Function(function(series){})
    });

    var w = width - margin.left - margin.right;
    var h = height - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, w]);

    var y = d3.scale.linear()
        .range([h, 0]);

    var xAxis = d3.svg.axis()
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var line = d3.svg.line()
        .interpolate('lineInterpolation') // a B-spline, with control point duplication on the ends
        .x(function(d, i) { return x(pointIndexes(d, i)); })
        .y(function(d, i) { return y(pointValues(d, i)); });

    selection.each(function(data) {
      var svgWidth = width===-1?this.offsetWidth:width;
      var maxChartHeight = height - margin.top - margin.bottom;

      w = svgWidth - margin.left - margin.right;

      x.range([0, w]);
      xAxis.scale(x);

      var svg = d3.select(this).selectAll('svg').data([data]);
      svg.enter().append('svg')
                 .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      svg
        .attr('width', svgWidth)
        .attr('height', height);
      svg = svg.select('g');

      if(color&&color.domain){
        var names = data.map(seriesNames);
        color.domain(names);
      }

      var indexes = data.map(seriesValues).map(function(list){
        return list.map(pointIndexes);
      }).reduce(function(curr, res){
        return res.concat(curr);
      }, []);
      x.domain(d3.extent(indexes));

      y.domain([
        d3.min(data, function(c) { return d3.min(seriesValues(c), pointValues); }),
        d3.max(data, function(c) { return d3.max(seriesValues(c), pointValues); })
      ]);

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + h + ')')
          .call(xAxis);

      var yAxisGroup = svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
      if(yAxisTitle){
        yAxisGroup
          .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text(yAxisTitle);
      }

      var series = svg.selectAll('g.series').data(data);
      var seriesEnter = series.enter()
        .append('g')
        .attr('class', 'series')
        ;
      enterSeries(seriesEnter);
      updateSeries(series);
      var seriesExit = series.exit();
      exitSeries(seriesExit);

      var points = series.selectAll('g.series.points').data(function(d){
        return seriesValues(d);
      });
      var pointsEnter = points.enter()
        .append('g')
        .attr('class', 'series points');
      points
        .attr('transform', function(d, i) {
            return 'translate(' + x(pointIndexes(d, i)) + ',' + y(pointValues(d, i)) + ')';
          })
        ;
      enterPoints(pointsEnter);
      updatePoints(points);
      var pointsExit = points.exit();
      exitPoints(pointsExit);

      var seriesTitle = svg.selectAll('g.series.title').data(data);
      var seriesTitleEnter = seriesTitle.enter()
            .append('g')
            .attr('class', 'series title')
            .datum(function(d){
                var values = seriesValues(d);
                return {name: seriesNames(d), value: values[values.length - 1], idx: values.length - 1};
              });
      enterSeriesTitle(seriesTitleEnter);
      updateSeriesTitle(seriesTitle);
      var seriesTitleExit = seriesTitle.exit();
      exitSeriesTitle(seriesTitleExit);

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
      'line-chart': true
    });
    return (
      <div className={classNames}>
      </div>
    );
  }
});

module.exports = {
  LineChart: LineChart
};
