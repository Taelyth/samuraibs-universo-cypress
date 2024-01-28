# Universo Cypress
Projeto criado para acompanhar as aulas do curso Universo Cypress, a plataforma do curso não está mais disponível, entretanto é possível adquirir as aulas do professor Papito através da [QAxperience].

---

### Índice

* [Universo Cypress](#universo-cypress)
  * [Índice](#índice)
  * [SamuraiBS](#samuraibs)
    * [Pré-Requisitos](#pré-requisitos)
    * [Banco de Dados](#banco-de-dados)
    * [Glossário](#glossário)
  * [Créditos](#créditos)

---

## SamuraiBS

Projeto criado para automatizar **testes web** utilizando **Cypress**.

### Pré-requisitos

- Instalar o [node.js]
- Instalar o [yarn]
- Instalar dependências do projeto usando o comando:

```
yarn install
```
- Iniciar as aplicações WEB e API.
    - Para isso foi adicionado um zip contendo ambos os projetos: [samuraibs-apps.zip](util\samuraibs-apps.zip)
    - O projeto deverá ser extraído, e então executado pelo comando `yarn start` abrindo a pasta de ambos.
-  Iniciar o Cypress usando o comando:
```
npx cypress open
```

### Banco de Dados
Foi criado um DB utilizando o [ElephantSQL] para a realização das aulas.

- Após a criação da conta e DB no site acima, as informações dele deverão ser adicionadas a um arquivo `.env` na raiz do projeto, da seguinte forma:

```js
HOST='preencher com o host'
USER='preencher com o user'
PASSWORD='preencher com a senha'
DATABASE='colocar nome do Database'
PORT='colocar porta do Database'
```
- Todas essas informações podem ser adquiridas dentro do próprio site do [ElephantSQL] nas configurações do DB criado.

### Glossário

`e2e` Diretório contendo os casos de teste montados em cypress.

`fixtures` Massa de dados json utilizada em alguns casos de teste.

`support\pages` Organização do projeto utilizando Page Objects.

`support\commands.js` Comandos adicionais criados para serem utilizados nos testes.

`support\factories` Massa de dados utilizando javascript.

`support\components` Código utilizado nos testes ao usar componentes reutilizados em diversas páginas, como alerts, toasts, etc.

---

### Créditos

- Antiga QAcademy e QANinja, que disponibilizaram o curso.
- Ao [Fernando Papito][Papito] que ensina QAs com maestria.

[<img src="util\qaxperience-logo.png" width="20%"/>][QAxperience]

<!-- links -->
[QAxperience]: https://qaxperience.com/pt
[node.js]: https://nodejs.org/en
[yarn]: https://yarnpkg.com/
[ElephantSQL]: https://www.elephantsql.com/
[Papito]: https://github.com/papitorcks

<!-- imagens -->
[QAxperience-Logo]: util\qaxperience-logo.png (QAxperience-logo)