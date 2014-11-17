var React = require('react');
var Support = require('../lib/support');

var ChartTitle = React.createClass({
  render: function(){
    var classNames = Support.classList(this, {
      'chart-title': true
    });
    var title = this.props.children;
    return (
      <h2 {...props} className={classNames}>{title}</h2>
    );
  }
});

module.exports = {
  ChartTitle: ChartTitle
};
