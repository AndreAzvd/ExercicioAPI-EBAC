/// <reference types="cypress" />
import Joi from 'joi-browser';
import { faker } from '@faker-js/faker';
import userSchema from '../contracts/usuarios.contract';

describe('Testes da Funcionalidade Usuários', () => {
  
  beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then((tkn) => {
      cy.wrap(tkn).as('token');
    });
  });

  it('Deve validar contrato de usuários', () => {
  cy.request('GET', 'usuarios').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('usuarios');
    expect(response.body.usuarios).to.be.an('array');
    response.body.usuarios.forEach((user) => {
      const { error } = userSchema.validate(user);
    });
  });
});

  it('Deve listar usuários cadastrados', () => {
    cy.request('GET', 'usuarios').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('usuarios');
    });
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario(); 
  });

  it('Deve validar um usuário com email inválido', () => {
    const invalidUser = {
      nome: faker.person.firstName(),
      email: 'emailinvalido', 
      password: faker.internet.password(),
    };

    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: invalidUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.editarUsuario().then(({ user, response }) => {
      
      const userId = response.body._id;
      const updatedUser = {
        nome: user.nome + '_edit',
        email: faker.internet.email(),
        password: user.password,
        
        
    };

    cy.request({
      method: 'PUT',
      url: `/usuarios/${userId}`,
      body: updatedUser
    }).then((updateResponse) => {
      expect(updateResponse.body.message).to.eq('Registro alterado com sucesso');
    });
  });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario().then(({ response }) => {

      const userId = response.body._id;

      cy.request({
        method: 'DELETE',
        url: `usuarios/${userId}`,
        failOnStatusCode: false,
      }).then((delResponse) => {
        expect(delResponse.status).to.eq(204);

        // Validar que o usuário não existe mais
        cy.request({
          method: 'GET',
          url: `usuarios/${userId}`,
          failOnStatusCode: false,
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(404);
        });
      });
    });
  });


});
