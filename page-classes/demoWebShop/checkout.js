import { elementIdType} from "../core/UiComponents"
import { getBooleanFromString } from "../core/coreUtils"



export class checkout{

    constructor() {
        this.filePath = './test-data/demoWebShop/checkout.xlsx'
        this.sheetName = 'Sheet1'

    }

    billindAddressDetails(billDetailsMap){

        elementIdType('BillingNewAddress_FirstName',billDetailsMap.FirstName)
        elementIdType('BillingNewAddress_LastName',billDetailsMap.LastName)
        elementIdType('BillingNewAddress_Email',billDetailsMap.Email)
        elementIdType('BillingNewAddress_Company',billDetailsMap.Company)
        cy.get('select').eq(0).select(billDetailsMap.Country)
        elementIdType('BillingNewAddress_City',billDetailsMap.City)
        elementIdType('BillingNewAddress_Address1',billDetailsMap.Address1)
        elementIdType('BillingNewAddress_Address2',billDetailsMap.Address2)
        elementIdType('BillingNewAddress_ZipPostalCode',billDetailsMap.Zip)
        elementIdType('BillingNewAddress_PhoneNumber',billDetailsMap.Phone)
        elementIdType('BillingNewAddress_FaxNumber',billDetailsMap.Fax)
        
    }



      callCheckout(testCase) {
        cy.task('parseXlsx',{filePath :this.filePath, sheetName :this.sheetName, rows:[testCase]})
        .then((result) => {
            result["data"].forEach(value => { this.main(value)})
        })
    }

    main(value) {
    
        cy.task('printInConsole', {'checkout': 'checkout started'})
        cy.addContext("Checkout started");

        if(getBooleanFromString(value.isGuestCheckout)){
             cy.get("[value='Checkout as Guest']").click()
             cy.get(".page-title").should('contain','Checkout')
             var billDetailsMap = {}
              billDetailsMap.FirstName = value.FirstName
              billDetailsMap.LastName = value.LastName
              billDetailsMap.Email = value.Email
              billDetailsMap.Company = value.Company
              billDetailsMap.Country = value.Country
              billDetailsMap.City = value.City
              billDetailsMap.Address1 = value.Address1
              billDetailsMap.Address2 = value.Address2
              billDetailsMap.Zip = value.Zip
              billDetailsMap.Phone = value.Phone
              billDetailsMap.Fax = value.Fax
              this.billindAddressDetails(billDetailsMap)
        }
                cy.addContext("Checkout finished");

        }        

}