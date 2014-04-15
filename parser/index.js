var excelParser = require('excel-parser');

/*var dir = process.cwd();
console.log(dir + '/master.xls');

excelParser.worksheets({
  inFile: dir + '/inp.xls'
}, function(err, worksheets){
  if(err) console.log(err);
  console.log(worksheets);
});*/

/*excelParser.parse({
  inFile: 'inp.xls',
  worksheet: 1,
  skipEmpty: true,
  searchFor: {
	limit: 1
//    term: ['my serach term'],
 //   type: 'loose'
  }
},function(err, records){
  if(err) console.error(err);
  console.log(records);
});*/

/*var xlrd = require('xlrd-parser');

xlrd.parse('inp.xls', function (err, workbook) {
	console.log(workbook);
    // Iterate on sheets
    workbook.sheets.forEach(function (sheet) {
        console.log('sheet: ' + sheet.name);
        // Iterate on rows
        sheet.rows.forEach(function (row) {
            // Iterate on cells
            row.forEach(function (cell) {
                console.log(cell.address + ': ' + cell.value);
            });
        });
    });
});*/

var SpreadsheetReader = require('pyspreadsheet').SpreadsheetReader;

SpreadsheetReader.read('inp.xls', {maxRows: 3 }, function (err, workbook) {
  // Iterate on sheets
  workbook.sheets.forEach(function (sheet) {
    console.log('sheet: ' + sheet.name);
    // Iterate on rows
    sheet.rows.forEach(function (row) {
      // Iterate on cells
      row.forEach(function (cell) {
        console.log(cell.address + ': ' + cell.value);
      });
    });
  });
});


