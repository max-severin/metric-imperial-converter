const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('convertHandler.getNum(input)', function () {
    test('Should correctly read a whole number input', function () {
      assert.equal(convertHandler.getNum('11gal'), 11);
      assert.equal(convertHandler.getNum('23L'), 23);
      assert.equal(convertHandler.getNum('7lbs'), 7);
    });

    test('Should correctly read a decimal number input', function () {
      assert.equal(convertHandler.getNum('1.1gal'), 1.1);
      assert.equal(convertHandler.getNum('101.1km'), 101.1);
      assert.equal(convertHandler.getNum('1.001mi'), 1.001);
    });

    test('Should correctly read a fractional input', function () {
      assert.equal(convertHandler.getNum('1/4gal'), 0.25);
      assert.equal(convertHandler.getNum('1/8kg'), 0.125);
      assert.approximately(convertHandler.getNum('1/3mi'), 0.33, 0.01);
    });

    test('Should correctly read a fractional input with a decimal', function () {
      assert.equal(convertHandler.getNum('1/0.4gal'), 2.5);
      assert.equal(convertHandler.getNum('1.1/2km'), 0.55);
      assert.approximately(convertHandler.getNum('1.001/2.001lbs'), 0.5, 0.1);
    });

    test('Should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
      assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number');
      assert.equal(convertHandler.getNum('3/2/3/2km'), 'invalid number');
      assert.equal(convertHandler.getNum('3/2.3/2/3gal'), 'invalid number');
    });

    test('Should correctly default to a numerical input of 1 when no numerical input is provided', function () {
      assert.equal(convertHandler.getNum('gal'), 1);
    });
  });

  suite('convertHandler.getUnit(input)', function () {
    test('Should correctly read each valid input unit', function () {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

      for (let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.getUnit(`11${input[i]}`), output[i]);
        assert.equal(convertHandler.getUnit(`11${input[i].toUpperCase()}`), output[i]);
      };
    });

    test('Should correctly return an error for an invalid input unit', function () {
      assert.equal(convertHandler.getUnit('23gall'), 'invalid unit');
      assert.equal(convertHandler.getUnit('23g'), 'invalid unit');
      assert.equal(convertHandler.getUnit('23test'), 'invalid unit');
      assert.equal(convertHandler.getUnit('11lbss'), 'invalid unit');
    });
  });

  suite('convertHandler.getReturnUnit(initUnit)', function () {
    test('Should return the correct return unit for each valid input unit', function () {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const output = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];

      for (let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.getReturnUnit(input[i]), output[i]);
      };
    });
  });

  suite('convertHandler.spellOutUnit(unit)', function () {
    test('Should correctly return the spelled-out string unit for each valid input unit', function () {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];

      for (let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.spellOutUnit(input[i]), output[i]);
      };
    });
  });

  suite('convertHandler.convert(initNum, initUnit)', function () {
    test('Should correctly convert gal to L', function () {
      assert.equal(convertHandler.convert(11, 'gal'), 41.63951);
    });

    test('Should correctly convert L to gal', function () {
      assert.equal(convertHandler.convert(11, 'L'), 2.90589);
    });

    test('Should correctly convert mi to km', function () {
      assert.equal(convertHandler.convert(11, 'mi'), 17.70274);
    });

    test('Should correctly convert km to mi', function () {
      assert.equal(convertHandler.convert(11, 'km'), 6.83510);
    });

    test('Should correctly convert lbs to kg', function () {
      assert.equal(convertHandler.convert(11, 'lbs'), 4.98951);
    });

    test('Should correctly convert kg to lbs', function () {
      assert.equal(convertHandler.convert(11, 'kg'), 24.25087);
    });
  });

});