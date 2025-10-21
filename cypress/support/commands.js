import { faker } from '@faker-js/faker';


Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })
Cypress.Commands.add('cadastrarUsuario', () => {
const user = {
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}
cy.request({
  method: 'POST',
  url: 'usuarios',
  body: {
    nome: user.nome,
    email: user.email,
    password: user.password,
    administrador: "true"
  },
}).then((response) => {
  expect(response.status).to.eq(201);
  expect(response.body).to.have.property('_id');
  expect(response.body.username).to.eq(user.name);
});
});

Cypress.Commands.add('editarUsuario', () => {
const user = {
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}
cy.request({
  method: 'POST',
  url: 'usuarios',
  body: {
    nome: user.nome,
    email: user.email,
    password: user.password,
    administrador: "true"
  },
}).then((response) => {
  failOnStatusCode: false
  expect(response.body).to.have.property('_id');
  return cy.request({
    method: 'POST',
    url: '/usuarios',
    body: user,
  }).then((response) => {
    expect(response.status).to.eq(201);
    return { user, response };
  });
});
});