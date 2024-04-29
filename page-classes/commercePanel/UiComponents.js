import { 
    getCustomDate,
    arraysToHash } from "../core/coreUtils"

export function elementIdClick(id){
    cy.get(`#${id}`).click({force:true})
}

export function elementIdType(id, text){
    cy.get(`#${id}`).type(text)
}

export function textShouldBeVisible(text){
    cy.contains(text).should('be.visible')
}
