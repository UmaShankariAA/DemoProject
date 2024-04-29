/// <reference types="cypress" />
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const { Client } = require('pg');
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

function readFileAndParseXlsx(filePath,sheetName,isWorkBook=false) {
  const fileContent = fs.readFileSync(filePath, 'binary');
  const workbook = XLSX.read(fileContent, { type: 'binary' });
  if(isWorkBook)
    return workbook;
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

module.exports = (on,config) => {
  on('task', {
    

    parseXlsx: (fileDetails) => {
      try {
        const absolutePath = path.join(config.projectRoot, fileDetails.filePath);
        var data = readFileAndParseXlsx(absolutePath, fileDetails.sheetName);
        // below if case is used to filter the rows based on the row ID passed
        if(fileDetails.hasOwnProperty('rows')){
          if(fileDetails.rows.length>0){
            var temp = [];
            for(var row of fileDetails.rows){
                for(var obj of data)
                {
                  if(row==obj.testCase)
                    temp.push(obj)
                }
            }
            data = temp;
          }
          else{
            data = [];
          }
        }  

        // console.log(data)
        return { success: true, data }          
      } catch (error) {
        console.log(error)
        return { success: false, error: error.message } ;
      }
    },


    printInConsole: (data) => {
      console.log(JSON.stringify(data));
      return null;
    },


    writeNewXlsx: (fileDetails) => {
      const absolutePath = path.join(config.projectRoot, fileDetails.filePath);
      var data = fileDetails.data;

      var ws = XLSX.utils.json_to_sheet(data);
      /* create workbook and export */
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, fileDetails.sheetName);
      XLSX.writeFile(wb, absolutePath);

      return null;
  },

  })
}