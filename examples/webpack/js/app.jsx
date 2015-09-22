var React = require('react');
var Charts = require('../../../charts.js');

var PieChart = Charts.PieChart;

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
