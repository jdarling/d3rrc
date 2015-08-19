Time Series Chart
=================

A time series is a sequence of data points, typically consisting of successive measurements made over a time interval. Examples of time series are ocean tides, counts of sunspots, and the daily closing value of the Dow Jones Industrial Average.

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

###TimeSeriesChart

```jsx
var TimeSeriesChart = D3RRC.TimeSeriesChart;

var data = (function(size){
  var data = [], day;
  var i=0, l=size;
  for(; i<l; i++){
    day = Math.floor(Math.random() * 30)+1;
    data.push([
      new Date('05/'+day+'/2014'),
      Math.floor(Math.random() * 90)+10
    ]);
  }
  return data;
})(10);

var style = {
  '.line': 'fill: none; stroke: black; stroke-width: 1.5px;',
  '.area': 'fill: steelblue;',
};
React.render(
  <TimeSeriesChart
    chart-height="120"
    chart-style={style}
    data={data}
    />,
  document.getElementById('output')
);
```
