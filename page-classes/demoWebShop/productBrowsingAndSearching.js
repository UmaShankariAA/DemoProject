import { textShouldBeVisible } from "../commercePanel/UiComponents"
import { getBooleanFromString } from "../core/coreUtils"



export class productBrowsingAndSearching{

    constructor() {
        this.filePath = './test-data/demoWebShop/productBrowsingAndSearching.xlsx'
        this.sheetName = 'Sheet1'

    }

    callproductBrowsingAndSearching(testCase) {
        cy.task('parseXlsx',{filePath :this.filePath, sheetName :this.sheetName, rows:[testCase]})
        .then((result) => {
            result["data"].forEach(value => { this.main(value)})
        })
    }
   
    clickCategoryLink(category){
        cy.get(`a[href="/${category}"]`).eq(2).click()
       }
    clickCartLink(){
        cy.get(`a[href="/cart"]`).eq(0).click()
       }
    main(value) {
    
        cy.task('printInConsole', {'product listing': 'product listing'})
        //click computers category
        this.clickCategoryLink(value.category)
       
        // assertion to verify category page is loaded successfully

        const category = value.category;

        var newCategory=category[0].toUpperCase()+category.substring(1);

        cy.get(".page-title").should('contain',newCategory)

        //get product price
        var index=value.prodIndex+1

        cy.xpath(`(//*[@class='prices'])[${index}]/span[2]`).then((e1)=>{

             cy.task('printInConsole', {'product price is': e1.text()})

             Cypress.env('productPrice',e1.text())

        })

        // Verify add to cart is enabled
        if(!getBooleanFromString(value.isSoldOut)){
            cy.get("[value='Add to cart']").eq(value.prodIndex).should('be.visible')

            //Click add to cart from plp
            cy.get("[value='Add to cart']").eq(value.prodIndex).click()
             
           // confirm product is added successfully
            textShouldBeVisible("The product has been added to your ")

            //navigate to cart
            this.clickCartLink()

            cy.wait(1000)

        }
        else
        {
            cy.get("[value='Add to cart']").eq(value.prodIndex).should('not.exist')
            return;
        }

        


         

}
}