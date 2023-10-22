//import {fakerPT_BR as faker} from '@faker-js/faker'
import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    context('quando o usuário é novato', function () {
        const user = {
            name: 'Teste A',
            email: 'teste@teste.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
            // task para remver usuário no banco de dados criada dentro do cypress.config.js
        })

        it('deve cadastrar com sucesso', function () {

            //const email = faker.internet.email() -> Faker removido pois iremos usar um mock para validar o cadastro
            signupPage.go()

            signupPage.form(user)
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
        const user = {
            name: 'Teste B',
            email: 'testeb@teste.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            // removendo usuário no DB para deixar a massa de testes válida
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            // fazer requests usando cypress para criar massa de dados
            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('não deve cadastrar o usuário', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Teste C',
            email: 'testec.teste.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })

    })

    context('quando a senha é muito curta', function () {

        const passwords = ['p', 'pw', 'pwd', 'pwd1', 'pwd12']

        beforeEach(function(){
            signupPage.go()
        })

        passwords.forEach(function(p){
            it('não deve cadastrar com a senha: '+ p, function(){
                const user = {
                    name: 'Teste D',
                    email: 'tested@teste.com',
                    password: p
                }

                signupPage.form(user)
            })
        })

        afterEach(function(){
            signupPage.submit()
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context('quando não preencho nenhum dos campos', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), function(){
                signupPage.alertHaveText(alert)
            })
        })
    })
})