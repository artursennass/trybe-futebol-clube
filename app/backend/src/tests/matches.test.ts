import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

import { Response } from 'superagent';
import matchesMock, { matchesFinished } from './mocks/matches.mock';
import TeamsService from '../services/MatchesService';
import { IMatches } from '../interfaces/MatchesInterface';
import { TOKEN } from './mocks/others.mocks';
import Users from '../database/models/UserModel';
import usersMock from './mocks/users.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  const NEW_MATCH = {
    homeTeamId: 16,
    homeTeamGoals: 3,
    awayTeamId: 6,
    awayTeamGoals: 1,
    inProgress: true
  }

  const NEW_MATCH_RESOLVED = {
    id: 6,
    homeTeamId: 16,
    homeTeamGoals: 3,
    awayTeamId: 6,
    awayTeamGoals: 1,
    inProgress: true
  }

  const INVALID_MATCH_1 = {
    homeTeamId: 2,
    homeTeamGoals: 3,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true
  }

  const INVALID_MATCH_2 = {
    homeTeamId: 99,
    homeTeamGoals: 3,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true
  }

  it('1- Testando /matches', async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matchesMock as Matches[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
  });

  it('2- Testando /matches?inProgress=true', async () => {
    const goingMatchesMock = [matchesMock.pop()];

    sinon
      .stub(Matches, "findAll")
      .resolves(goingMatchesMock as Matches[]);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=true')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(goingMatchesMock);
  });

  it('3- Testando /matches?inProgress=false', async () => {
    const finishedMatchesMock = matchesMock.slice(-1);

    sinon
      .stub(Matches, "findAll")
      .resolves(finishedMatchesMock as Matches[]);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=true')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(finishedMatchesMock);
  });

  it('4- Testando /matches/:id/finish', async () => {
    sinon
      .stub(Matches, "update")
      .resolves([1]);

    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users)
    
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/5/finish')
       .set( 'Authorization', TOKEN );

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
  });

  it('5- Testando /matches/:id', async () => {
    sinon
      .stub(Matches, "update")
      .resolves([1]);

    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users)
    
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/5')
       .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
       })
       .set( 'Authorization', TOKEN );

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Score updated' });
  });

  it('6- Testando /matches para criar partidas', async () => {
    sinon
      .stub(Matches, "create")
      .resolves({dataValues: NEW_MATCH_RESOLVED} as Matches);

    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users)
    
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .set( 'Authorization', TOKEN )
       .send(NEW_MATCH)

    expect(chaiHttpResponse.status).to.be.equals(201);
    expect(chaiHttpResponse.body).to.deep.equal(NEW_MATCH_RESOLVED);
  });

  it('7- Testando /matches não cria partidas inválidas se forem times iguais', async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users)
    
    sinon
      .stub(Matches, "create")
      .resolves({dataValues: NEW_MATCH_RESOLVED} as Matches);

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set( 'Authorization', TOKEN )
      .send(INVALID_MATCH_1);
    
    expect(chaiHttpResponse.status).to.be.equals(422);
    expect(chaiHttpResponse.body).to.deep.equal({
      "message": "It is not possible to create a match with two equal teams"
    });
  });

  it('8- Testando /matches não cria partidas inválidas se forem times iguais', async () => {    
      sinon
        .stub(Matches, "create")
        .resolves({dataValues: NEW_MATCH_RESOLVED} as Matches);
    
    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users)

    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .set( 'Authorization', TOKEN )
       .send(INVALID_MATCH_2);
    
    expect(chaiHttpResponse.status).to.be.equals(404);
    expect(chaiHttpResponse.body).to.deep.equal({
      "message": "There is no team with such id!"
    });
  });
});