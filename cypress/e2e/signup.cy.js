//import {fakerPT_BR as faker} from '@faker-js/faker'
import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    before(function () {
        cy.fixture('signup').then(function(signup){
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('quando o usuário é novato', function () {

        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
            // task para remver usuário no banco de dados criada dentro do cypress.config.js
        })

        it('deve cadastrar com sucesso', function () {

            //const email = faker.internet.email() -> Faker removido pois iremos usar um mock para validar o cadastro
            signupPage.go()

            signupPage.form(this.success)
            // test usando mock do backend, removido para incluir acesso ao banco de dados que remove o usuário.
            // cy.intercept('POST', '/users', {
            //     statusCode: 200
            // }).as('postUser')

            signupPage.submit()
            // clicamos no botão

            // cy.wait('@postUser') // esperamos o mock do alias (postUser) ser executado.

            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('quanto o email já existe', function () {
        
        before(function () {
            cy.postUser(this.email_dup)
        })

        it('não deve cadastrar o usuário', function () {

            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', function () {

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })

    })

    context('quando a senha é muito curta', function () {

        const passwords = ['p', 'pw', 'pwd', 'pwd1', 'pwd12']

        beforeEach(function(){
            signupPage.go()
        })

        passwords.forEach(function(p){
            it('não deve cadastrar com a senha: '+ p, function(){
                this.short_password.password = p

                signupPage.form(this.short_password)
            })
        })

        afterEach(function(){
            signupPage.submit()
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })

    })

    context('quando não preencho nenhum dos campos', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), function(){
                signupPage.alert.haveText(alert)
            })
        })
    })
})