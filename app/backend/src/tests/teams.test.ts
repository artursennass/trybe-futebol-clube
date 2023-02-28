import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamModel';

import { Response } from 'superagent';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock as Teams[]);
    
    sinon
      .stub(Teams, "findOne")
      .resolves(teamsMock[0] as Teams);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findOne as sinon.SinonStub).restore();
  })

  it('Testando /teams', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
  });

  it('Testando /teams/:id', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock[0]);
  });
});
