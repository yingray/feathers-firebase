const assert = require('assert');
const cj = require("color-json");
const rules = require('./rules.json');
const input = require('./input.json');
const output = require('./output.json');

const feathersFirebase = require('../src');

feathersFirebase.init(rules.rules);


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('#indexOf()', function() {
    it('', function() {
      console.log(cj(feathersFirebase.getObj(input)))
      // assert.equal(feathersFirebase.getFeahtersArray(rules, input), output);
    });
  });
});