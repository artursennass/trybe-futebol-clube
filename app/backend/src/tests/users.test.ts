import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UserModel';

import { Response } from 'superagent';
import usersMock from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando /users', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findAll")
      .resolves(usersMock as Users[]);
    
    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users);
  });

  after(()=>{
    (Users.findAll as sinon.SinonStub).restore();
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Testando /teams', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/users')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(usersMock);
  });

  it('Testando /teams/:id', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/users/1')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(usersMock[0]);
  });
});
