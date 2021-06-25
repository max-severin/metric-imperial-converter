# Metric-Imperial Converter

### Quality Assurance Projects for FCC

Example usage:

* /api/convert?input=4gal
* /api/convert?input=1/2km
* /api/convert?input=5.4/3lbs
* /api/convert?input=kg

Example return:

    { 
        initNum: 3.1, 
        initUnit: 'mi', 
        returnNum: 4.98895, 
        returnUnit: 'km', 
        string: '3.1 miles converts to 4.98895 kilometers'
    }
    
Unit Tests:

* **convertHandler** should correctly read a whole number input.
* **convertHandler** should correctly read a decimal number input.
* **convertHandler** should correctly read a fractional input.
* **convertHandler** should correctly read a fractional input with a decimal.
* **convertHandler** should correctly return an error on a double-fraction (i.e. **3/2/3**).
* **convertHandler** should correctly default to a numerical input of **1** when no numerical input is provided.
* **convertHandler** should correctly read each valid input unit.
* **convertHandler** should correctly return an error for an invalid input unit.
* **convertHandler** should return the correct return unit for each valid input unit.
* **convertHandler** should correctly return the spelled-out string unit for each valid input unit.
* **convertHandler** should correctly convert **gal** to **L**.
* **convertHandler** should correctly convert **L** to **gal**.
* **convertHandler** should correctly convert **mi** to **km**.
* **convertHandler** should correctly convert **km** to **mi**.
* **convertHandler** should correctly convert **lbs** to **kg**.
* **convertHandler** should correctly convert **kg** to **lbs**.

Functional Tests:

* Convert a valid input such as **10L**: **GET** request to **/api/convert**.
* Convert an invalid input such as **32g**: **GET** request to **/api/convert**.
* Convert an invalid number such as **3/7.2/4kg**: **GET** request to **/api/convert**.
* Convert an invalid number AND unit such as **3/7.2/4kilomegagram**: **GET** request to **/api/convert**.
* Convert with no number such as **kg**: **GET** request to **/api/convert**.


The project available on replit.com  
https://metric-imperial-converter.maxseverin.repl.co/
