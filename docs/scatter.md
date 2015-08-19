Scatter Chart
==========

A scatter chart (or scatter plot) is a set of individual dots on a two-dimensional chart. You can optionally specify the size of the individual dots.

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
###chart-idx
###chart-style
###data

Methods
---

###chart-xAxis
###chart-yAxis
###chart-onUpdate
###chart-getColor
###chart-x
###chart-y
###chart-r
###chart-scaleX
###chart-scaleY
###chart-color
###chart-text
###chart-enterNode
###chart-updateNode
###chart-exitNode

Typical Usage
---

###ScatterChart

```jsx
var ScatterChart = D3RRC.ScatterChart;

var getText = function(d){
    return d.name || '';
  };
var getSize = function(d){
    return d.r;
  };
var data = (function(size){
  var data = [];
  var i=0, l=size;
  for(; i<l; i++){
    data.push({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      r:  Math.floor(Math.random() * 5)+5,
      name: "Test "+i
    });
  }
  return data;
})(10);
var styles = {
    circle: 'fill: steelblue; stroke: black;',
    'g.xAxis .tick line': 'shape-rendering: crispEdges; stroke: steelblue; fill: none;'
  };
React.render(
  <ScatterChart
    chart-height="320"
    chart-size={getSize}
    chart-xAxis={true}
    chart-yAxis={true}
    chart-text={getText}
    chart-style={styles}
    data={data}
    />,
  document.getElementById('output')
);
```
