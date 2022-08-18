import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
// import User from '../database/models/User'

// import { Response } from 'superagent';
chai.use(chaiHttp);

const TeamMock = [
    {
        id: 1,
        teamName: 'Ibis'
    },
    {
        id: 2,
        teamName: 'Teste'
    }
]

const oneTeam = {
        id: 1,
        teamName: 'Ibis'
}

const { expect } = chai;

describe('Testando a rota /teams', () => {
    before(async () => {
      sinon
        .stub(Team, 'findAll')
        .resolves(TeamMock as Team[]);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('Espera o status 200 e o array certo', async () => {
      const teams = await chai.request(app).get('/teams')
      expect(teams.status).to.be.eq(200);
      expect(teams.body).to.deep.equal(TeamMock);
      expect(teams.body).to.be.an('array')
    });
  });
  
  describe('testando a rota /teams/:id', () => {
    before(async () => {
        sinon
          .stub(Team, 'findByPk')
          .resolves(oneTeam as Team);
      });
    
      after(()=>{
        sinon.restore();
      })

      it('O status é 200 e vem o time pelo id', async () => {
        const team = await chai.request(app).get('/teams/1')
        expect(team.status).to.be.equal(200);
        expect(team.body).to.deep.equal(oneTeam);
      })
  })