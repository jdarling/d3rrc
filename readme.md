D3 React Reusable Charts
========================

Latest Updates
--------------

  * v0.0.3 - Introduced new Line Chart, cleanup work on coloring and width layouts

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

d3rrc is designed to work with browserify.  It can also be used as a stand alone
javascript file (just download the build.js file and include it in your project).

If you use the build.js file know that it includes the supported version of
React/Addons, D3, and all of the support libraries utilized.

Feel free to create your own custom build.

Why?
====

D3+Reusable Charts API+React=Easy Charts

Charts
======

For now see the examples directory for the charts and how to use them.  More
details will be coming soon.

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
