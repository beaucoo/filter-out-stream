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
