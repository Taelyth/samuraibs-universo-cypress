// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import moment from 'moment'
import loginPage from './pages/login'
import dashPage from './pages/dash'

// App Actions --------------------------------
Cypress.Commands.add('uiLogin', (user) => {
	// outra forma de definir função
	loginPage.go()
	loginPage.form(user)
	loginPage.submit()

	dashPage.header.userLoggedIn(user.name)
})

// ------------------------------------------

Cypress.Commands.add('postUser', function (user) {
	// removendo usuário no DB para deixar a massa de testes válida
	cy.task('removeUser', user.email).then(function (result) {
		console.log(result)
	})

	// fazer requests usando cypress para criar massa de dados
	cy.request({
		method: 'POST',
		url: Cypress.config('apiServer') + '/users',
		body: user
	}).then(function (response) {
		expect(response.status).to.eq(200)
	})
})

Cypress.Commands.add('recoveryPass', function (email) {
	cy.request({
		method: 'POST',
		url: Cypress.config('apiServer') + '/password/forgot',
		body: { email: email }
	}).then(function (response) {
		expect(response.status).to.eq(204)
	})

	cy.task('findToken', email).then(function (result) {
		//console.log(result.token)
		Cypress.env('recoveryToken', result.token)
	})
})

Cypress.Commands.add('createAppointment', function (hour) {
	let now = new Date()

	now.setDate(now.getDate() + 1) // para criar no dia seguinte
	//now.setDate(now.getDate()) // para criar no mesmo dia

	if (now.getDay() === 5){
		now.setDate(now.getDate() + 3)
	}

	if (now.getDay() === 6){
		now.setDate(now.getDate() + 2)
	}

	Cypress.env('appointmentDay', now.getDate())

	const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)

	const payload = {
		provider_id: Cypress.env('providerID'),
		date: date
	}

	cy.request({
		method: 'POST',
		url: Cypress.config('apiServer') + '/appointments',
		body: payload,
		headers: {
			authorization: 'Bearer ' + Cypress.env('apiToken')
		}
	}).then(function (response) {
		expect(response.status).to.eq(200)
	})
})

Cypress.Commands.add('setProviderID', function (providerEmail) {
	cy.request({
		method: 'GET',
		url: Cypress.config('apiServer') + '/providers',
		headers: {
			authorization: 'Bearer ' + Cypress.env('apiToken')
		}
	}).then(function (response) {
		expect(response.status).to.eq(200)

		const providerList = response.body

		providerList.forEach(function (provider) {
			if (provider.email === providerEmail) {
				Cypress.env('providerID', provider.id)
			}
		})
	})
})

Cypress.Commands.add('apiLogin', function (user, setLocalStorage = false) {
	const payload = {
		email: user.email,
		password: user.password
	}

	cy.request({
		method: 'POST',
		url: Cypress.config('apiServer') + '/sessions',
		body: payload
	}).then(function (response) {
		expect(response.status).to.eq(200)
		Cypress.env('apiToken', response.body.token)

		if (setLocalStorage) {
			// para login web usando API
			const { token, user } = response.body
			localStorage.setItem('@Samurai:token', token)
			localStorage.setItem('@Samurai:user', JSON.stringify(user))

			cy.visit('/dashboard')
		}
	})
})
