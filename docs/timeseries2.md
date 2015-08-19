Time Series 2 Chart
=================

A time series is a sequence of data points, typically consisting of successive measurements made over a time interval. Examples of time series are ocean tides, counts of sunspots, and the daily closing value of the Dow Jones Industrial Average.

Time Series 2 is a time series chart that provides a secondary chart below allowing to zoom into the dataset being visualized.

Properties
---

###chart-margin
The margins for the chart.  These can be set as a whole or individually.

In the time series 2 chart the bottom margin is used to set the space that the zoom chart will be placed in.  By default this is 100.

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

###chart-style

Used to set custom styles on the chart.

###data

This is the data the chart will render.

Methods
---

###chart-xValue

Used to get the X value for a data point.

```jsx
var x = function(d){
  return d.x;
};

<Chart
  chart-xValue={x}
  />
```

###chart-yValue

Used to get the Y value for a data point.

```jsx
var y = function(d){
  return d.y;
};

<Chart
  chart-yValue={y}
  />
```

###chart-xScale

Used to calculate the X Scale on the chart.

```jsx
<Chart
  chart-xScale={d3.time.scale()}
  />
```

###chart-yScale

Used to calculate the Y Scale on the chart.

```jsx
<Chart
  chart-yScale={d3.scale.linear()}
  />
```

###chart-xAxis

Used to render the X Axis on the chart.

```jsx
var xAxis = function(){
  d3.svg.axis().scale(_scale).orient("bottom").tickSize(6, 0);
};

<Chart
  chart-xAxis={xAxis}
  />
```


Typical Usage
---

###TimeSeries2Chart

```jsx
var TimeSeries2Chart = D3RRC.TimeSeries2Chart;

var data = (function(size){
  var data = [];
  var i=0, l=size;
  var month = 1;
  for(; i<l; i++){
    var day = Math.floor(Math.random() * (month===2?27:30))+1;
    var date = new Date(month+'/'+day+'/2014');
    data.push([
      date,
      (Math.random() * 90)+10
    ]);
    month++;
  }
  return data;
})(12);

var style={
  '.area': 'fill: steelblue; clip-path: url(#clip);',
  '.axis path': 'fill: none; stroke: #000; shape-rendering: crispEdges;',
  '.axis line': 'fill: none; stroke: #000; shape-rendering: crispEdges;',
  '.brush .extent': 'stroke: #fff; fill-opacity: .125; shape-rendering: crispEdges;',
};

React.render(
  <TimeSeries2Chart
    chart-height="400"
    chart-style={style}
    data={data}
    />,
  document.getElementById('output')
);
```
