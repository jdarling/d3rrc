Time Series 2 Chart
=================

A time series is a sequence of data points, typically consisting of successive measurements made over a time interval. Examples of time series are ocean tides, counts of sunspots, and the daily closing value of the Dow Jones Industrial Average.

Time Series 2 is a time series chart that provides a secondary chart below allowing to zoom into the dataset being visualized.

Properties
---

###chart-margin
The margins for the chart.  These can be set as a whole or individually.

In the time series 2 chart the bottom margin is used to set the space that the zoom chart will be placed in.  By default this is 100.

```
<Chart
  chart-margin={{left: 10, right: 10, top: 10, bottom: 10}}
  />
<Chart
  chart-margin-bottom: 50
  />
```

###chart-width
###chart-height
###chart-style
###data

Methods
---

###chart-xValue
###chart-yValue
###chart-xScale
###chart-yScale
###chart-xAxis

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
