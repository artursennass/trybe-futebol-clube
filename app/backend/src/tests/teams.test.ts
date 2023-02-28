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
    // sinon
    //   .stub(Example, "findOne")
    //   .resolves({
    //     ...<Seu mock>
    //   } as Example);
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('...', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body.chocolates).to.deep.equal(teamsMock);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
