//
// FilterOutStream v0.0.1
// BeauCoo 2013
// info@beaucoo.com
//
// A stream that filters out data, or updates it, optionally to a limit kept, optionally consuming as much as
// possible past limit until another to keep is encountered.
//
// Parameters:
// 'filterFunc(item)' is a function that returns true to keep or false to discard
// 'filterInLimit' (optional) is a limit of items to keep. Defaults to unlimited.
// 'consumePastLimit' (optional) controls whether to consume past the 'filterInLimit' until another item that would be
//   kept is encountered (but it won't be).
//
// Properties:
// 'filteredInCount' is the number of items filtered in/kept
// 'lastItem' is the last item inspected
//
var through = require('through');
module.exports = function filterStream(filterFunc, filterInLimit, consumePastLimit) {
    "use strict";


    if (!filterFunc) {
        filterFunc = function () {
            return true;
        };
    }


    if (consumePastLimit !== false && consumePastLimit !== true) {
        consumePastLimit = true;
    }


    var writeFilteringFunc = (!!filterInLimit) ? writeLimitedFiltering : writeUnlimitedFiltering;
    var stream = through(write);
    stream.filteredInCount = 0;
    stream.lastItem = {};


    function write(data) {
        if (filterFunc(data)) {
            writeFilteringFunc(data);
        } else {
            stream.lastItem = data;
        }
    }


    function writeLimitedFiltering(data) {
        if (stream.filteredInCount < filterInLimit) {
            stream.filteredInCount++;
            stream.lastItem = data;
            stream.queue(data);

            // If consumption of filtered-out items is not allowed
            // and this item meets filtered-in limit then end the stream
            if (stream.filteredInCount === filterInLimit && !consumePastLimit) {
                stream.queue(null);
            }
        } else {
            // When consuming past the limit, the next encountered filter match ends the stream
            // As items have been processed as can be without exceeding the limit
            stream.queue(null);
        }
    }


    function writeUnlimitedFiltering(data) {
        stream.filteredInCount++;
        stream.lastItem = data;
        stream.queue(data);
    }


    return stream;
};