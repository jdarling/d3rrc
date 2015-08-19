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

Sets the width of the chart, if not specified is set to the current parents width.

###chart-height

The height of the chart, if not specified defaults to 420.

###chart-duration

Sets the transition time in milliseconds for when data changes to provide a smooth view update.

###chart-identity

The identity member for a given slice.  By default '_id' but you can set it to whatever you want.  If your identity isn't on the main object then look at getIdentity to return it.

###chart-innerRadius

If you want to render the Pie chart as a Donut this sets the inner radius to cut out.

###chart-style

Used to set custom styles on the chart.

###data

This is the data the chart will render.

Methods
---

###chart-value

Used to return the value associated with a slice of data.

###chart-colorRange

Similar to Color but used to set the start and stop colors that are then used to render the slices.

###chart-color

The color function used to colorize each of the segments.

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

Returns the text for each individual slice.

```jsx
var text = function(d){
  return d.text;
};

<Chart
  chart-text={text}
  />
```

###chart-getIdentity

Called to get the identity of a slice.

```jsx
var getIdentity = function(d){
  return d.data[identity] || (d.data[identity] = ++idx);
};

<Chart
  chart-getIdentity={getIdentity}
  />
```

###chart-enterSlice

Called when a new slice is added to the chart and renders its initial view.

###chart-updateSlice

Called when a slice is updated and renders the updates.

###chart-exitSlice

Called when a slice is removed from the chart and does any cleanup.

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
