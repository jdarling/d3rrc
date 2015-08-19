Time Series Chart
=================

A time series is a sequence of data points, typically consisting of successive measurements made over a time interval. Examples of time series are ocean tides, counts of sunspots, and the daily closing value of the Dow Jones Industrial Average.

Properties
---

###chart-margin
###chart-width
The margins for the chart.  These can be set as a whole or individually.

```
<Chart
  chart-margin={{left: 10, right: 10, top: 10, bottom: 10}}
  />
<Chart
  chart-margin-bottom: 50
  />
```

###chart-height
###chart-area
###chart-line
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
