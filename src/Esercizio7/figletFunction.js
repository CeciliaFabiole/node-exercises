let figlet = require('figlet');
const greet = require('../Esercizio3/exportedFunction.js')
const message = greet('Hello guys !')

figlet(`${message}`, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
