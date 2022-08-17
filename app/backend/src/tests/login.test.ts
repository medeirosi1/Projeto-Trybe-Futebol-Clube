import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'email@email.com',
  password: "senha"
}

describe('Testando a rota Post /login', () => {
  describe('Testando o caso de Sucesso', () => { 
    beforeEach(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(loginMock)
    })
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;


  // afterEach(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
} 
}); 
