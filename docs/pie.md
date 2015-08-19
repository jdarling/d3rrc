Pie Chart
==========

A type of graph in which a circle is divided into segments that each represent a proportion of the whole.

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
###chart-height
###chart-duration
###chart-identity
###chart-innerRadius
###chart-style
###data

Methods
---

###chart-onUpdate
###chart-getValue
###chart-colorRange
###chart-color
###chart-getText
###chart-getIdentity
###chart-enterSlice
###chart-updateSlice
###chart-exitSlice

Typical Usage
---

###PieChart

```jsx
var PieChart = D3RRC.PieChart;

var data = (function(size){
  var data = [];
  var i=0, l=size;
  for(; i<l; i++){
    data.push({
      value: Math.floor(Math.random() * 90)+10,
      text: "Test "+i
    });
  }
  return data;
})(10);
var colorRange = d3.scale.linear()
      .domain([0, 50, 100])
      .range(["red", "green", "blue"]);

React.render(
  <PieChart
    chart-height="320"
    chart-innerRadius="0"
    chart-colorRange={colorRange}
    data={data}
    />,
  document.getElementById('output')
);
```

###PieChart (as Donut)

```jsx
var PieChart = D3RRC.PieChart;

var data = (function(size){
  var data = [];
  var i=0, l=size;
  for(; i<l; i++){
    data.push({
      value: Math.floor(Math.random() * 90)+10,
      text: "Test "+i
    });
  }
  return data;
})(10);
var colorRange = d3.scale.linear()
      .domain([0, 50, 100])
      .range(["red", "green", "blue"]);

React.render(
  <PieChart
    chart-height="320"
    chart-innerRadius="80"
    chart-colorRange={colorRange}
    data={data}
    />,
  document.getElementById('output')
);
```
