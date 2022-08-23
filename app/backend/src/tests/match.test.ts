import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
// import { Response } from 'superagent';
import Match from '../database/models/Match';
import listMock, { matchAll } from './mock/matchMock';
import { MatchFull } from '../interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testand a rota /matches', () => {

  before(async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(listMock as Match[])
    })

  after(()=>{
    sinon.restore();
  })

  it('Espera que o retorno seja 200', async () => {
    const match = await chai.request(app).get('/matches')
    expect(match.status).to.be.eq(200);
  });
  it('Espera retorno seja um array e o conteúdo', async () => {
    const match = await chai.request(app).get('/matches')
    expect(match.body).to.deep.eq(listMock);
    expect(match.body).to.be.an('array');
  })
})

describe('Testando a rota /matches/:id/finish', () => {

    before(async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(listMock as Match[])
      })
  
    after(()=>{
      sinon.restore();
    })
  
    it('Espera que o retorno seja 200 e retorna uma mensagem top', async () => {
      const match = await chai.request(app).patch('/matches/:id/finish')
      expect(match.status).to.be.eq(200);
      expect(match.body.message).to.deep.eq('Finished');
    });
  })

  describe('Testando a rota /matches/?InProgress', () => {
    
    before(async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchAll as unknown as Match[])
      })
  
    after(()=>{
      sinon.restore();
    })
  
    it('Espera que o retorno seja 200', async () => {
      const match = await chai.request(app).get('/matches/?InProgress=false')
      expect(match.status).to.be.eq(200);
    });
    it('Espera que o retorno do body seja quando colocar false', async () => {
      const match = await chai.request(app).get('/matches/?InProgress=false')
      expect(match.body).to.deep.eq(matchAll);
    });
    it('Espera que o retorno do body seja quando colocar false', async () => {
      const match = await chai.request(app).get('/matches/?InProgress=true')
      expect(match.body).to.deep.eq(matchAll);
    });
  });
