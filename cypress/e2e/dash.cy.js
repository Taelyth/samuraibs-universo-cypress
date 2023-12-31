import dashPage from '../support/pages/dash'

import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function () {
	context('quando o cliente faz um agendamento no app mobile', function () {
		before(function () {
			//before: cliente fazendo agendamento no app mobile
			cy.postUser(provider)
			cy.postUser(customer)

			cy.apiLogin(customer)
			/*.then(function(token){
                token = Cypress.env('apiToken')
                cy.log('apiToken: ' + token)
            }) */
			//Salvar o token no log do cypress para debug

			cy.setProviderID(provider.email)
			cy.createAppointment(appointment.hour)
		})

		it('o mesmo deve ser exibido no dashboard', function () {
			const day = Cypress.env('appointmentDay')
			
			//cy.uiLogin(provider)
			cy.apiLogin(provider, true)

			dashPage.calendarShouldBeVisible()			
			dashPage.selectDay(day)
			dashPage.appointmentShouldBeVisible(customer, appointment.hour)
		})
	})
})
