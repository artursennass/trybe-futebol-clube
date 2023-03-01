import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

import { Response } from 'superagent';
import matchesMock from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando /matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matchesMock as Matches[]);
    
    // sinon
    //   .stub(Users, "findOne")
    //   .resolves(matchesMock[0] as Matches);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    // (Matches.findOne as sinon.SinonStub).restore();
  })

  it('Testando /matches', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
  });

//   it('Testando /matches/:id', async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        .get('/matches/1')

//     expect(chaiHttpResponse.status).to.be.equals(200);
//     expect(chaiHttpResponse.body).to.deep.equal(matchesMock[0]);
//   });
});