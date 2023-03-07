import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamModel';

import { Response } from 'superagent';
import teamsMock from './mocks/teams.mock';
import { matchesLeaderboardMock, teamsLeaderboardMock } from './mocks/leaderboard.mock';
import Matches from '../database/models/MatchesModel';
import { awayResponseMock, homeResponseMock, leadeboardResponseMock } from './mocks/leaderboardResponse.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsLeaderboardMock as Teams[]);
    
    sinon
      .stub(Matches, "findAll")
      .resolves(matchesLeaderboardMock as Matches[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Testando /leaderboard/home', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(homeResponseMock);
  });

  it('Testando /leaderboard/away', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(awayResponseMock);
  });

  it('Testando /leaderboard', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(leadeboardResponseMock);
  });
});

