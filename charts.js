var Charts = {
  ChartTitle: require('./src/title.jsx').ChartTitle,
  VBarChart: require('./src/bar.jsx').VBarChart,
  HBarChart: require('./src/bar.jsx').HBarChart,
  LineChart: require('./src/line.jsx').LineChart,
  PieChart: require('./src/pie.jsx').PieChart,
  PieChart: require('./src/pie.jsx').PieChart,
  TimeSeriesChart: require('./src/timeseries.jsx').TimeSeriesChart,
  TimeSeries2Chart: require('./src/timeseries2.jsx').TimeSeries2Chart,
  ScatterChart: require('./src/scatter.jsx').ScatterChart,
  d3: require('d3'),
  //React: require('react/addons')
};

module.exports = Charts;

if(typeof(window)==='object'){
  window.D3RRC = Charts;
}
