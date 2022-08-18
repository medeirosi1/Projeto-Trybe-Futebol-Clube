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

  it('se o status é 200', async () => {
    const res = await chai.request(app).post('/login').send(loginMock);
    expect(res.status).to.be.equal(200);
  });
  it('Tem a propriedade Token e se retorno é um Token', async () => {
    const tokenString = await JwtService.sign(loginMock);
    const res = await chai.request(app).post('/login').send(loginMock);
    expect(res.body).to.be.haveOwnProperty('token');
    expect(res.body).to.deep.equal({token: tokenString})
  })
 })
 
 describe('testando o caso de erro', () => {
  it('se o status é 400 e da o erro no email', async () => {
    const res = await chai.request(app).post('/login').send({ email: '', password: 'dawdwa'});
    expect(res.status).to.be.equal(400);
    expect(res.body.message).to.be.equal('All fields must be filled');
  });
  it('se o error é no password', async() => {
    const res = await chai.request(app).post('/login').send({ email: 'dawdwadwa', password: ''});
    expect(res.body.message).to.be.equal('All fields must be filled');
  })
 })
}); 
