import { cart } from "./cart"
import { productBrowsingAndSearching } from "./productBrowsingAndSearching"
import { checkout } from "./checkout"

export class demoWebShopRegression{

    constructor() {
        this.filePath = './test-data/demoWebShop/demoWebShopRegression.xlsx'
        this.sheetName = 'Sheet1'

        this.cartObj = new cart()
        this.checkoutObj = new checkout()
        this.productObj = new productBrowsingAndSearching()

    }

    demoWebShopRegression(value) {
    
        cy.task('printInConsole', {'demoWebShop': 'demoWebShop Regression started'})
        
         cy.visit(Cypress.env('demoUrl'))
         cy.wait(2000)
        this.productObj.callproductBrowsingAndSearching(value.productData)
        this.cartObj.callCart(value.cartData)
        this.checkoutObj.callCheckout(value.checkoutData)
        
    }
}