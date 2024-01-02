import { el } from './elements'
import header from '../../components/header'

class DashPage {
	constructor() {
		this.header = header
	}

	calendarShouldBeVisible() {
		cy.get(el.calendar, { timeout: 7000 }).should('be.visible')
	}

	translateMonth(date) {
		var months = [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro'
		]

        let monthShown = date.getMonth() > 10 ? 'Janeiro' : months[date.getMonth() + 1]

		return monthShown
    }

	selectDay(day) {
		let today = new Date()
		let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

		if (lastDayOfMonth.getUTCDate() - today.getUTCDate() < 3) {
			if (
				today.getDay() === 0 ||
				today.getDay() === 5 ||
				today.getDay() === 6
			) {
				cy.intercept({
					method: 'GET',
					url: '/providers/**'
				}).as('providers')

				cy.get(el.nextMonthButton).should('be.visible').click()

				cy.wait('@providers') // espera rota interceptada ter resultado

				cy.contains(el.nextMonthYear, this.translateMonth(today))
                    .should('be.visible') // checa se o mês atual está sendo exibido
			}
		}

		const target = new RegExp('^' + day + '$', 'g')
		cy.contains(el.boxDay, target).click({ force: true }) // serve para forçar o click no elemento, mesmo que ele esteja invisível
	}

	appointmentShouldBeVisible(customer, hour) {
		cy.contains('div', customer.name)
			.should('be.visible')
			.parent()
			.contains(el.boxHour, hour)
			.should('be.visible')
	}
}

export default new DashPage()
