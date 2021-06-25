function ConvertHandler() {
  this.unitMap = {
    gal: 'L',
    L: 'gal',
    lbs: 'kg',
    kg: 'lbs',
    mi: 'km',
    km: 'mi',
  };

  this.spellOutUnitMap = {
    gal: 'gallons',
    L: 'liters',
    lbs: 'pounds',
    kg: 'kilograms',
    mi: 'miles',
    km: 'kilometers',
  };
  
  this.getNum = function(input) {
    let result = input.replace(/[a-zA-Z]+$/, '');

    if (result === '') {
      return 1;
    }

    const fractionalRegExp = /\//g;

    if (fractionalRegExp.test(result)) {
      const fractionalMatch = result.match(fractionalRegExp);

      if (fractionalMatch.length > 1) {
        return 'invalid number';
      }

      const resultArr = result.split('/');
      
      result = resultArr[0] / resultArr[1];
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    const unitRegExp = /[a-zA-Z]+$/;

    if (unitRegExp.test(input)) {
      let result = input.toLowerCase().match(unitRegExp);

      result = result[0] === 'l'
                  ? 'L' 
                  : result[0].toLowerCase();

      if (Object.keys(this.unitMap).includes(result)){
        return result;
      }      
    }

    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    return this.unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return this.spellOutUnitMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const convertMap = {
      gal: initNum * galToL,
      L: initNum / galToL,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg,
      mi: initNum * miToKm,
      km: initNum / miToKm,
    };
    
    return parseFloat(convertMap[initUnit].toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
