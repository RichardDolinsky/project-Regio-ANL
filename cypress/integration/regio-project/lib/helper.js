export const one = 6


export function generateCurrentDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return dd
}


export function getNearMonday() {
    const date = generateCurrentDay()
    const mondaysMarch = [6, 13, 20, 27]

    if (date <= mondaysMarch[0]) {
        return mondaysMarch[0]
    }
    else if (date <= mondaysMarch[1] && date > mondaysMarch[0]) {
        return mondaysMarch[1]
    }

    else if (date <= mondaysMarch[2] && date > mondaysMarch[1]) {
        return mondaysMarch[2]
    }
    else if (date <= mondaysMarch[3] && date > mondaysMarch[2]) {
        return mondaysMarch[3]
    }

    else {
        return 27
    }

}


export function getAllResults(resultLabelAtribut) {
    cy.get(resultLabelAtribut).find('li').then((res) => {
        // wrap all resources into one variable
        let array = []
        cy.wrap(res).as('results')
        cy.log("Number of results: ", res.length)
        // output each content  
        for (let index = 0; index < res.length; index++) {
            cy.get('@results').eq(index).find('[class="flex gap-2"]').find('div').eq(0).children('span').invoke('text').then((reso) => {
                //Check if solving element is Direct connect 
                if (reso == "Direct") {
                    cy.log("Yes Direct")
                    cy.get('@results').eq(index).find('[aria-label^="Journey length"]').invoke('text').then((resol) => {
                        // replace last two charakter to avoid " h"
                        const onlyTime = resol.substring(0, 5)
                        const timeArray = onlyTime.split(':')
                        const hourToMinute = Number(timeArray[0] * 60)
                        const minutes = Number(timeArray[1])
                        const resultInMinute = hourToMinute + Number(timeArray[1])
                        // push every duration time/ journey length into array
                        array.push(resultInMinute)
                        // array.sort(function(a, b){return a-b});
                        cy.log("Journey Time in [" + index + "] Tab is: ", resultInMinute + ' Minutes')
                        cy.log(index + " vs " + res.length)
                        if (index === res.length - 1) {

                            //if index was last, find minimal value and his index, Index Means-component positio
                            // var min = Math.min.apply(Math,array)
                            for (var i = 1; i < array.length; i++) {
                                var indexo = 0;
                                var value = array[0];

                                if (array[i] < value) {
                                    value = array[i];
                                    indexo = i;

                                    cy.log('Lowest number is: ', value, " and his index is " + index)
                                    //set index of lowerst arrival time
                                    Cypress.env('indexOfLowestTime', index)
                                }
                            }
                            cy.wrap(array).as('arrayOfContent')

                            cy.get('@arrayOfContent').its('length')


                        }
                    })
                }
                else {
                }
            })
        }
    })
}