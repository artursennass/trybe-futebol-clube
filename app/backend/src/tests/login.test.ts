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

describe('Testando /login', () => {
  let chaiHttpResponse: Response;

  before(async () => { 
    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

//   it('Testando /login', async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        .get('/users')

//     expect(chaiHttpResponse.status).to.be.equals(200);
//     expect(chaiHttpResponse.body).to.deep.equal(usersMock);
//   });
});