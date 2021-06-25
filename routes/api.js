'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', function (req, res) {
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit'){
      res.status(200).json('invalid number and unit');
    }

    if (initNum === 'invalid number'){
      res.status(200).json(initNum);
    }

    if (initUnit === 'invalid unit'){
      res.status(200).json(initUnit);
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    res.status(200).json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      "string": convertHandler.getString(initNum, initUnit, returnNum, returnUnit),
    });
  });

};
