import { elementIdClick } from "../core/UiComponents"


export class cart{

    constructor() {
        this.filePath = './test-data/demoWebShop/cart.xlsx'
        this.sheetName = 'Sheet1'

        
    }

     callCart(testCase) {
        cy.task('parseXlsx',{filePath :this.filePath, sheetName :this.sheetName, rows:[testCase]})
        .then((result) => {
            result["data"].forEach(value => { this.main(value)})
        })
    }

    main(value) {
    
       cy.task('printInConsole', 'Cart started')

       cy.get(".page-title").should('contain','Shopping cart')

       var productPrice=Cypress.env('productPrice')

       cy.task('printInConsole', {'product price is': productPrice})

       cy.addContext("cart started");

       // cy.addContext("product price is "+productPrice);
       //cy.addContext("product price is "+str(productPrice));

       cy.xpath("(//*[@class='product-price order-total'])[1]/Strong[1]").should('contain',productPrice)

       //click accpet terms

       elementIdClick('termsofservice')

       elementIdClick('checkout')

       cy.task('printInConsole', 'Cart finished')

}
}