var Charts = {
  ChartTitle: require('./lib/title').ChartTitle,
  VBarChart: require('./lib/bar').VBarChart,
  PieChart: require('./lib/pie').PieChart,
  PieChart: require('./lib/pie').PieChart,
  TimeSeriesChart: require('./lib/timeseries').TimeSeriesChart,
  TimeSeries2Chart: require('./lib/timeseries2').TimeSeries2Chart,
  ScatterChart: require('./lib/scatter').ScatterChart,
  d3: require('d3'),
  React: require('react/addons')
};

module.exports = Charts;
