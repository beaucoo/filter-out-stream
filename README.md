#FilterOutStream

A stream that filters out data, or updates it, optionally to a limit kept, optionally consuming as much as
possible past limit until another to keep is encountered.

##Release Notes
v0.0.1 First

##Use Cases
Filter data out of the stream i.e. discard it. Optionally, consume as much as possible without exceeding the limit.
This is useful when receiving data from a broad query and wanting to capture details for retrieving
the next page of data in a future request.

##Running Tests
Run `mocha test --require should --reporter spec --recursive`
