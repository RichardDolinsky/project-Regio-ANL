
import { generateCurrentDay, getNearMonday, getAllResults } from './lib/helper'

describe("test case regio jet", () => {
    // visit main page and get all cookies
    before(() => {
        cy.log(generateCurrentDay() + " Current day ")
        cy.log(getNearMonday() + "  Nearest monday day")

    })
    //preserve cookies
    beforeEach(() => {
    })

    //delete file as last step
    //   after(() => {
    //     cy.task('deleteFiles', { pathDelete: './cypress/fixtures/runFilesFolder' }).then((res) => {
    //       cy.log(res + ': response')
    //       //check if files in directory was deleted
    //       expect(res).to.be.true
    //     })
    //   })
    it('Visit regio jet', () => {
        cy.intercept({
            method: 'GET',
            url: '**/_next/data/**'
        }).as('waitGET-API')
        cy.visit('https://regiojet.com/')

        //wait for load API _next/data
        cy.wait('@waitGET-API')


    })
    it('Type Destination', () => {

        // Write destination 

        //type FROM
        cy.get('[aria-label="Enter where you are travelling from and to"]').contains('From')
            .type('Ostrava{enter}')
        //type TO
        cy.get('[aria-label="Enter where you are travelling from and to"]').contains('To')
            .type('Brno{enter}')
    })

    it('Select day departure', () => {
        // Method getNearMonday select nearest date of upcoming monday accord actual time

        //type Departure on monday
        cy.get('[data-id="departure-date"]').eq(1)
            .click().then(() => {
                cy.viewport(1200, 1000)
                cy.get('[class^="DayPicker"]')
                    // cy.get('[class="CalendarMonth CalendarMonth_1"]')
                    .eq(0)
                    .contains(getNearMonday()).scrollIntoView()
                    .click({ force: true })


            })
    })

    it('Confirm Search', () => {
        cy.get('[data-id="search-btn"]').click()
    })

    it('Get information about content', () => {
        // analyze content as shown rows about criteria + output into screen about total time spending abroad
        // content analyzing througt through option "DIRECT" as direct abroad line
        // use shortest time for further use
        // cy.visit('https://regiojet.com/?departureDate=2023-03-06&tariffs=REGULAR&fromLocationId=10202000&fromLocationType=CITY&toLocationId=10202002&toLocationType=CITY')
        getAllResults('[aria-label="Search results"]')
    })


    it('Select shortest arrival time', () => {
        // select shortest time travel option accord step above
        cy.get('[aria-label="Search results"]').find('li').eq(Cypress.env('indexOfLowestTime'))
    })
})
