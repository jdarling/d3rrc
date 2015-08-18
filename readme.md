D3 React Reusable Charts
========================

Latest Updates
-------------

  * v1.0.2 - Bug fixes to Timeseries2
  * v1.0.1 - Examples updates
  * v1.0.0 - Changed to Webpack, removed React from direct dependencies, upgraded to React v0.13.3

Install
=======

```
npm install d3rrc
```

Examples
========

See the examples folder.  You can also use RawGit to view them live at:
http://rawgit.com/jdarling/d3rrc/master/examples/index.html

Usage
=====

d3rrc 1.x.x is designed to work with webpack.  It can also be used as a stand alone
javascript file (just download the bundle.js file and include it in your project).

If you use the bundle.js file know that after version 1.x.x it
NO LONGER includes the supported version of React/Addons
but still includes D3, and all of the support libraries utilized.

You should have your own version of React loaded with your project.

Feel free to create your own custom build.

Development
====

```
npm start
```

Development server is now running on http://localhost:8090/

Browse the examples at http://localhost:8090/examples/

Create dist/bundle.js
====

```
npm run-script build
```

Why?
====

D3+Reusable Charts API+React=Easy Charts

Chart Types
======

###Pie

A type of graph in which a circle is divided into sectors that each represent a proportion of the whole.

###Donut

A type of graph in which a circle is divided into sectors that each represent a proportion of the whole.  The big difference between the Donut and the Pie Chart is that the Donut has the center cut out.

###Bar

A bar chart or bar graph is a chart that presents Grouped data with rectangular bars with lengths proportional to the values that they represent. The bars can be plotted vertically or horizontally.

###Line

A line chart or line graph is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments. It is a basic type of chart common in many fields.

###Scatter

A scatter chart (or scatter plot) is a set of individual dots on a two-dimensional chart. You can optionally specify the size of the individual dots. A scatter plot can accept only one data series.

###Time Series

A time series is a sequence of data points, typically consisting of successive measurements made over a time interval. Examples of time series are ocean tides, counts of sunspots, and the daily closing value of the Dow Jones Industrial Average.

HELP!
=====

This is a starting point and hopefully a good one.  I would really appreciate
help with this library.  Pull Requests for features and addons are welcome.
Suggestions made in the issues will be addressed as I have time, but my time
will be devoted more towards reviewing Pull Requests if there are any.

The code should set the standard to follow.  Just follow what is already being
done and you should be good.  Every chart should have an example in the examples
folder with a link from the examples/index.html file to it.  Ideally there
would be a description of the example as well.  The Source block
(from //SOURCE DUMP) should be copied from another example into new examples.

Properties should utilize the Support.getProps function.  I know it isn't
perfect yet, but it will be improved over time and it ensures that the property
values get converted to the proper types from their default string
representation.

All Charts should be implemented in JSX in the src folder and then added to the
charts.js file in the root folder.

HISTORY
=======

  * v1.0.2 - Bug fixes to Timeseries2
  * v1.0.1 - Fixed examples
  * v1.0.0 - Changed to Webpack, removed React from direct dependencies, upgraded to React v0.13.3
  * v0.0.7 - Upgrade to React v0.13.0
  * v0.0.6 - Fix Line Chart interpolation
  * v0.0.5 - Fix TimeSeries2 height
  * v0.0.4 - Fix TimeSeries & TimeSeries2 width of -1 to calculate width
  * v0.0.3 - Introduced new Line Chart, cleanup work on coloring and width layouts


LICENSE
=======

The MIT License (MIT)

Copyright (c) 2014 Jeremy Darling

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
