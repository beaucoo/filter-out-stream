#FilterOutStream

A stream that filters out data, or updates it, optionally to a limit kept, optionally consuming as much as
possible past limit until another to keep is encountered.

Install via <code>npm install filter-out-stream</code>

Properties:

* **filteredInCount** tracks the number of items kept.
* **lastItem** is the last item inspected.

<pre>
// Example (see tests for more):
<code>
var filterOutStream = require('filter-out-stream');
var s = filterOutStream(function(item) { return item.key === "SOME_VALUE"; }, 10, true);
s.on('data', function(item) {
  console.log(item);
});
s.on('end', function() {
  console.log("filteredInCount: %d, lastItem: %j", s.filteredInCount, s.lastItem);
});

// Then with some data stream
dataStream.pipe(s);
</code>
</pre>

##Release Notes
v0.0.1 First

##Use Cases
Filter data out of the stream i.e. discard it. Optionally, consume as much as possible without exceeding the limit.
This is useful when receiving data from a broad query and wanting to capture details for retrieving
the next page of data in a future request.

##Running Tests

* Run 'npm test'
* or run `mocha test --require should --reporter spec --recursive`

##License
(The MIT License)

Copyright (c) 2013-20* BeauCoo Technologies Inc. <info@beaucoo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

