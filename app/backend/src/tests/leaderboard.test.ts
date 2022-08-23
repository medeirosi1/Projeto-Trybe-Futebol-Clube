import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// import { Response } from 'superagent';
import Team from '../database/models/Team';
import { mockHome } from './mock/leaderboardMockHome';
import Match from '../database/models/Match';
import mockAway from './mock/awayMock';
import allMock from './mock/allmock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota leaderboard home', () => {
  it('Espera que o status seja 200 e o retorno seja a mock', async () => {
    const lead = await chai.request(app).get('/leaderboard/home')
    expect(lead.status).to.be.eq(200);
    expect(lead.body).to.be.deep.eq(mockHome);
  });
});

describe('Testando a rota leaderboard away', () => {
    it('Espera que o status seja 200 e o retorno seja a mock', async () => {
        const lead = await chai.request(app).get('/leaderboard/away')
        expect(lead.status).to.be.eq(200);
        expect(lead.body).to.be.deep.eq(mockAway);
    }
    );
});

describe('Testando a rota leaderboard all', () => {
    it('Espera que o status seja 200 e o retorno seja a mock', async () => {
        const lead = await chai.request(app).get('/leaderboard')
        expect(lead.status).to.be.eq(200);
        expect(lead.body).to.be.deep.eq(allMock);
    }
    );
});
