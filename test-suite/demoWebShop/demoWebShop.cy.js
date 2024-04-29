var masterData=require('../../cypress/fixtures/testData.json');
const { demoWebShopRegression } = require('../../page-classes/demoWebShop/demoWebShopRegression');

describe('Demo Web shop', () => {

    const demoweb = masterData['data']['demoweb'] || []
    const demoWebObj = new demoWebShopRegression()

    demoweb.forEach((testCase) => {
        it(`Demo web shop : ${testCase}`, () => {
            cy.task('parseXlsx',{filePath :demoWebObj.filePath, sheetName :demoWebObj.sheetName, rows:[testCase]})
            .then((result) => {
                demoWebObj.demoWebShopRegression(result["data"][0])
            })
        })
    })
})