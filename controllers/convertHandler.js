function ConvertHandler() {
  this.unitMap = {
    gal: 'L',
    L: 'gal',
    lbs: 'kg',
    kg: 'lbs',
    mi: 'km',
    km: 'mi',
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
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
