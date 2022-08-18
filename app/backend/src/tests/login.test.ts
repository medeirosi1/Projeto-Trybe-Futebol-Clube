import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import User from '../database/models/User'

// import { Response } from 'superagent';
import JwtService from '../services/jwt.service';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'email@email.com',
  password: "senha"
}

//  let chaiHttpResponse: Response;

describe('Testando a rota Post /login', () => {
  describe('Testando o caso de Sucesso', () => { 
    beforeEach(async () => {
      sinon
        .stub(JwtService, 'sign')
        .resolves(loginMock)
    })

    afterEach(()=>{
      sinon.restore();
    })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('se o status é 200', async () => {
    const tokenString = await JwtService.sign(loginMock);
    const res = await chai.request(app).post('/login').send(loginMock);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.haveOwnProperty('token');
    expect(res.body).to.deep.equal({token: tokenString})
  });
 }) 
}); 
