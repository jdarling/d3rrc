Line Chart
==========

A line chart or line graph is a type of chart which displays information as a series of data points connected by line segments.

Properties
---

###chart-margin

The margins for the chart.  These can be set as a whole or individually.

```jsx
<Chart
  chart-margin={{left: 10, right: 10, top: 10, bottom: 10}}
  />
<Chart
  chart-margin-bottom: 50
  />
```

###chart-width

Sets the width of the chart, if not specified is set to the current parents width.

###chart-height

The height of the chart, if not specified defaults to 420.

###chart-yAxisTitle

The title displayed for the X Axis

###chart-lineInterpolation

If lineInterpolation is specified, sets the interpolation mode to the specified string or function. The following named interpolation modes are supported:

  * linear - piecewise linear segments, as in a polyline.
  * linear-closed - close the linear segments to form a polygon.
  * step - alternate between horizontal and vertical segments, as in a step function.
  * step-before - alternate between vertical and horizontal segments, as in a step function.
  * step-after - alternate between horizontal and vertical segments, as in a step function.
  * basis - a B-spline, with control point duplication on the ends.
  * basis-open - an open B-spline; may not intersect the start or end.
  * basis-closed - a closed B-spline, as in a loop.
  * bundle - equivalent to basis, except the tension parameter is used to straighten the spline.
  * cardinal - a Cardinal spline, with control point duplication on the ends.
  * cardinal-open - an open Cardinal spline; may not intersect the start or end, but will intersect other control points.
  * cardinal-closed - a closed Cardinal spline, as in a loop.
  * monotone - cubic interpolation that preserves monotonicity in y.


###chart-duration

Sets the transition time in milliseconds for when data changes to provide a smooth view update.

###chart-color

The color function used to colorize each of the bars.

```jsx
var color = function(name){
  if(name==='something'){
    return '#f00'; // red
  }
  if(name==='else'){
    return '#0f0'; // blue
  }
};

<Chart
  chart-color={color}
  />
```

###chart-style

Used to set custom styles on the chart.

###data

This is the data the chart will render.

Methods
---

###chart-seriesNames

Used to get the name for each series.

```jsx
var seriesNames = function(d){
  return d.name;
};

<Chart
  chart-seriesNames={seriesNames}
  />
```

###chart-seriesValues

Used to get the values for each series.

```jsx
var seriesValues = function(d){
  return d.values;
};

<Chart
  chart-seriesValues={seriesValues}
  />
```

###chart-pointNames

Used to get the names for each point in a series.

```jsx
var pointNames = function(d){
  return d.text;
};

<Chart
  chart-pointNames={pointNames}
  />
```

###chart-pointIndexes

Used to get the positional index for each point in a series.

```jsx
var pointIndexes = function(d, i){
  return d.index; // by default uses i
};

<Chart
  chart-pointIndexes={pointIndexes}
  />
```

###chart-pointValues

Used to get the values for each point in a series.

```jsx
var pointValues = function(d){
  return d.value;
};

<Chart
  chart-pointValues={pointValues}
  />
```

###chart-enterSeries

Called when a new series is added to the chart and renders its initial view.

###chart-updateSeries

Called when a series is updated and renders the updates.

###chart-exitSeries

Called when a series is removed from the chart and does any cleanup.

###chart-enterPoints

Called when a new point of data is added to a series and renders its initial view.

###chart-updatePoints

Called when a point of data is updated and renders the updates.

###chart-exitPoints

Called when a point of data is removed from a series and does any cleanup.

###chart-enterSeriesTitle

Called when a new series is added to the chart and renders its title.

###chart-updateSeriesTitle

Called when a series is updated and renders the updated title or title position.

###chart-exitSeriesTitle

Called when a series is removed from the chart and does any cleanup.

Typical Usage
---

###LineChart (single line)

```jsx
var LineChart = D3RRC.LineChart;

var seriesNames = function(d){
    return d.name;
  };
var seriesValues = function(d){
    return d.values;
  };
var pointNames = function(d){
    return d.text;
  };
var pointValues = function(d){
    return d.value;
  };
var pointIndexes = function(d, i){
  return d.index;
};

var data = (function(size){
  var data = [], series;
  var i, l=size;
  series = {name: 'Test Series', values: []};
  for(i=0; i<l; i++){
    series.values.push({
      value: Math.floor(Math.random() * 90)+10,
      text: "Value "+i,
      index: i
    });
    series.max = i;
  }
  data.push(series);
  return data;
})(10);

var style = {
  '.axis path': 'fill: none; stroke: #000; shape-rendering: crispEdges;',
  '.axis line': 'fill: none; stroke: #000; shape-rendering: crispEdges;',
  '.x.axis path': 'display: none;',
  '.line': 'fill: none; stroke-width: 1.5px;',
};

React.render(
  <LineChart
    chart-height="320"
    chart-seriesNames={seriesNames}
    chart-seriesValues={seriesValues}
    chart-pointNames={pointNames}
    chart-pointValues={pointValues}
    chart-pointIndexes={pointIndexes}
    chart-style={style}
    data={data}
    />,
  document.getElementById('output')
);
```

###LineChart (multilpe line with updates)

```jsx
var LineChart = D3RRC.LineChart;

var seriesNames = function(d){
    return d.name;
  };
var seriesValues = function(d){
    return d.values;
  };
var pointNames = function(d){
    return d.text;
  };
var pointValues = function(d){
    return d.value;
  };
var pointIndexes = function(d, i){
  return d.index;
};
var data = (function(num, size){
  var data = [], series;
  var i, l=size, j=0, k=num;
  for(; j<k; j++){
    series = {name: 'Series '+j, values: []};
    for(i=0; i<l; i++){
      series.values.push({
        value: Math.floor(Math.random() * 90)+10,
        text: "Series "+j+" - Value "+i,
        index: i
      });
      series.max = i;
    }
    series.num = j;
    data.push(series);
  }
  return data;
})(2, 10);

var Demo = React.createClass({
  getInitialState(){
    return {
      data: this.props.data||[]
    }
  },
  componentDidMount(){
    setInterval(function(){
      var data = this.state.data;
      data.forEach(function(series){
        var val = {
          value: Math.floor(Math.random() * 90)+10,
          text: "Series "+series.num+" - Value "+series.max,
          index: series.max
        };
        var old = series.values.shift();
        series.max++;
        series.values.push(val);
      });
      this.setState({
        data: data
      });
    }.bind(this), 1000);
  },
  render(){
    var style = {
      '.axis path': 'fill: none; stroke: #000; shape-rendering: crispEdges;',
      '.axis line': 'fill: none; stroke: #000; shape-rendering: crispEdges;',
      '.x.axis path': 'display: none;',
      '.line': 'fill: none; stroke-width: 1.5px;',
    };
    return (<LineChart
      chart-height="320"
      chart-seriesNames={seriesNames}
      chart-seriesValues={seriesValues}
      chart-pointNames={pointNames}
      chart-pointValues={pointValues}
      chart-pointIndexes={pointIndexes}
      chart-lineInterpolation="cardinal"
      chart-style={style}
      data={this.state.data}
      />);
  }
});

React.render(
  <Demo data={data} />,
  document.getElementById('output')
);
```
