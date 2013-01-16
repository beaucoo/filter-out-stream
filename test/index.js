require('should'); // 'should.js' https://github.com/visionmedia/should.js
var filterStream = require('../index');
var ArrayStream = require('arraystream');


describe('Filter Stream should', function () {
    "use strict";


//    before(function (done) {
//        done();
//    });
//    after(function (done) {
//        done();
//    });


    function filterFunc(data) {
        return data.v === "a";
    }


    it('not be limited', function (done) {
        var count = 0;

        var fs = filterStream(filterFunc);
        fs.on('data', function (data) {
            count++;
            data.v.should.equal("a");
        });
        fs.on('end', function () {
            count.should.equal(3);
            fs.filteredInCount.should.equal(3);
            fs.lastItem.should.eql({v:"a", i:4});
            done();
        });

        ArrayStream.create([
            {v:"a", i:0},
            {v:"b", i:1},
            {v:"a", i:2},
            {v:"c", i:3},
            {v:"a", i:4}
        ]).pipe(fs);
    });


    it('not consume filtered-out data past filtered-in limit', function (done) {
        var count = 0;

        var fs = filterStream(filterFunc, 2, false);
        fs.on('data', function (data) {
            count++;
            data.v.should.equal("a");
        });
        fs.on('end', function () {
            count.should.equal(2);
            fs.filteredInCount.should.equal(2);
            fs.lastItem.should.eql({v:"a", i:2});
            done();
        });

        ArrayStream.create([
            {v:"a", i:0},
            {v:"b", i:1},
            {v:"a", i:2},
            {v:"c", i:3},
            {v:"a", i:4}
        ]).pipe(fs);
    });


    it('consume filtered-out data past filtered-in limit without exceeding it', function (done) {
        var count = 0;

        var fs = filterStream(filterFunc, 2, true);
        fs.on('data', function (data) {
            count++;
            data.v.should.equal("a");
        });
        fs.on('end', function () {
            count.should.equal(2);
            fs.filteredInCount.should.equal(2);
            fs.lastItem.should.eql({v:"d", i:4});
            done();
        });

        ArrayStream.create([
            {v:"a", i:0},
            {v:"b", i:1},
            {v:"a", i:2},
            {v:"c", i:3},
            {v:"d", i:4},
            {v:"a", i:5},
            {v:"e", i:6}
        ]).pipe(fs);
    });
});