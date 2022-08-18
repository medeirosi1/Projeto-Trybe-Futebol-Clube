import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import User from '../database/models/User'

// import { Response } from 'superagent';
import JwtService from '../services/jwt.service';
import User from '../database/models/User';
// import { hash } from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;


//  let chaiHttpResponse: Response;

// const mockSenha = async () => {
//   const newPassword = await hash('xablau', 8)

// }

const UserMock = {
  id: 1,
  username: 'xablau',
  role: 'xa',
  email: 'email@email.com',
  password: 'xablau',
}
const loginMock = {
  email: 'admin@admin.com',
  password: "secret_admin"
}

describe('Testando o Token de Login', () => {
  before(async () => {
    sinon
      .stub(JwtService, 'sign')
      .resolves(loginMock)
  })

  after(()=>{
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


describe('Testando a rota Post /login', () => {
  describe('Testando o caso de Sucesso', () => { 
  beforeEach(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves( UserMock as User)
    })
  
  afterEach(()=>{
      sinon.restore()
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

})

describe('testando o login validate', () => {
 it('se o status é 200 em caso de sucesso e vem a role', async () => {
  const tokenString = await JwtService.sign(loginMock);
   const res = await chai.request(app).get('/login/validate').set('Authorization', tokenString);
   expect(res.status).to.be.equal(200);
   expect(res.body.role).to.be.equal('admin')
});
it('se caso der erro aparece a mensagem e o status', async () => {
   const res = await chai.request(app).get('/login/validate').set('Authorization', 'failToken');
   expect(res.status).to.be.equal(401);
   expect(res.body.message).to.be.equal('Invalid token')
})
})