var React = require('react');
var Support = require('../lib/support');

var ChartTitle = React.createClass({displayName: 'ChartTitle',
  render: function(){
    var classNames = Support.classList(this, {
      'chart-title': true
    });
    var title = this.props.children;
    return (
      React.createElement("h2", React.__spread({},  props, {className: classNames}), title)
    );
  }
});

module.exports = {
  ChartTitle: ChartTitle
};
