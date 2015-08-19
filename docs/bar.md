Bar Chart's
===========

A bar chart or bar graph is a chart that presents Grouped data with rectangular bars with lengths proportional to the values that they represent. The bars can be plotted vertically or horizontally.

Properties
---

###chart-duration

Sets the transition time in milliseconds for when data changes to provide a smooth view update.

###chart-height

The height of the chart, if not specified defaults to 420.

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

###chart-style

Used to set custom styles on the chart.

###chart-width

Sets the width of the chart, if not specified is set to the current parents width.

###chart-xRoundBands

  * HBarChart only

Sets the spacing between the bands (or bars) of the chart.  Defaults to 0.2

###data

This is the data the chart will render.

Methods
---

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

###chart-enterBar

Called when new data is entered into the chart and a new bar is needed.

###chart-exitBar

Called when data removed from the chart and a bar is removed.

###chart-names

Used to get the name for the bar being rendered.

```jsx
var name = function(d){
  return d.name;
};

<Chart
  chart-name={name}
  />
```

###chart-updateBar

Called when data changes and a bar needs updating.

###chart-values

Used to get the value for the bar being rendered.

```jsx
var value = function(d){
  return d.value;
};

<Chart
  chart-value={value}
  />
```

Typical Usage
---

###HBarChart


```jsx
var HBarChart = D3RRC.HBarChart;

var names = function(d){
    return d.text;
  };
var values = function(d){
    return d.value||0;
  };
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
React.render(
  <HBarChart
      chart-height="320"
      chart-names={names}
      chart-values={values}
      data={data}
    />,
  document.getElementById('output')
);
```

###VBarChart

```jsx
var VBarChart = D3RRC.VBarChart;

var names = function(d){
    return d.text;
  };
var values = function(d){
    return d.value||0;
  };
var data = (function(size){
  var data = [];
  var i=0, l=size;
  for(; i<l; i++){
    data.push({
      value: Math.floor(Math.random() * 90)-40,
      text: "Test "+i
    });
  }
  return data;
})(10);
var styles={
  'rect.positive': 'fill: steelblue;',
  'rect.negative': 'fill: brown;'
};
React.render(
  <VBarChart
    chart-height="320"
    chart-names={names}
    chart-values={values}
    chart-style={styles}
    data={data}
    />,
  document.getElementById('output')
);
```
