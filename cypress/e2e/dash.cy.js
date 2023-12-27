import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('dashboard', function () {
	context('quando o cliente faz um agendamento no app mobile', function () {
		const data = {
			customer: {
				name: 'Phoenix Wright',
				email: 'phoenix@teste.com',
				password: 'pwd123',
				is_provider: false
			},
			provider: {
				name: 'Gale Baldur',
				email: 'gale@teste.com',
				password: 'pwd123',
				is_provider: true
			},
            appointmentHour: '14:00'
		}

		before(function () {
			//before: cliente fazendo agendamento no app mobile
			cy.postUser(data.provider)
			cy.postUser(data.customer)

			cy.apiLogin(data.customer)
			/*.then(function(token){
                token = Cypress.env('apiToken')
                cy.log('apiToken: ' + token)
            }) */
			//Salvar o token no log do cypress para debug

			cy.setProviderID(data.provider.email)
			cy.createAppointment(data.appointmentHour)
		})

		it('o mesmo deve ser exibido no dashboard', function () {
			loginPage.go()
			loginPage.form(data.provider)
			loginPage.submit()

			dashPage.calendarShouldBeVisible()

			const day = Cypress.env('appointmentDay')
			dashPage.selectDay(day)

            dashPage.appointmentShouldBeVisible(data.customer, data.appointmentHour)
		})
	})
})