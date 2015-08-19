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

Sets the width of the chart, if not specified is set to the current parents width.

###chart-height

The height of the chart, if not specified defaults to 420.

###chart-duration

Sets the transition time in milliseconds for when data changes to provide a smooth view update.

###chart-identity

The identity member for a given slice.  By default '_id' but you can set it to whatever you want.  If your identity isn't on the main object then look at getIdentity to return it.

###chart-style

Used to set custom styles on the chart.

###chart-xAxis

Show or hide the X Axis of the chart, defaults to true.

###chart-yAxis

Show or hide the Y Axis of the chart, defaults to true.

###data

This is the data the chart will render.

Methods
---

###chart-x

Used to get the X value for a data point.

```jsx

var x = function(d){
  return d.x;
};

<Chart
  chart-x={x}
  />
```

###chart-y

Used to get the Y value for a data point.

```jsx

var y = function(d){
  return d.y;
};

<Chart
  chart-y={y}
  />
```

###chart-r

Used to get the radius for a data point.

```jsx

var y = function(d){
  return d.r||8;
};

<Chart
  chart-r={r}
  />
```

###chart-scaleX

Used to determine the position on the X Axis for a dot within the graph.

```jsx

var scaleX = function(data, w){
  var min = d3.min(data, getX), max = d3.max(data, getX);
  var r = ((max - min) * 0.1) || 1;
  min -= r;
  max += r;
  return d3.scale.linear()
    .domain([min, max])
    .range([0, w])
    ;
};

<Chart
  chart-scaleX={scaleX}
  />
```

###chart-scaleY

Used to determine the position on the Y Axis for a dot within the graph.

```jsx

var scaleY = function(data, h){
  var min = d3.min(data, getY), max = d3.max(data, getY);
  var r = ((max - min) * 0.1) || 1;
  min -= r;
  max += r;
  return d3.scale.linear()
    .domain([max, min])
    .range([0,h])
    ;
};

<Chart
  chart-scaleY={scaleY}
  />
```

###chart-color

The color function used to colorize each of the dots.

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

###chart-text

###chart-getIdentity

Called to get the identity of a slice.

```jsx
var getIdentity = function(d){
  return d[identity] || (d[identity] = ++idx);
};

<Chart
  chart-getIdentity={getIdentity}
  />
```

###chart-enterNode

Called when a new node is added to the chart and renders its initial view.

###chart-updateNode

Called when a node is updated and renders the updates.

###chart-exitNode

Called when a node is removed from the chart and does any cleanup.

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
