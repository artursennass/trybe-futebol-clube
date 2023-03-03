import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UserModel';

import { Response } from 'superagent';
import usersMock from './mocks/users.mock';

import * as bcrypt from 'bcryptjs';
import { INVALID_LOGIN, LOGIN, TOKEN } from './mocks/others.mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando /login', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('1- Testando /login', async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users);
    
      sinon
        .stub(bcrypt, 'compareSync')
        .resolves('true')
    
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(LOGIN);

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.contains(TOKEN);
  });

  it('2- Testando /login inválido', async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(null);
    
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(INVALID_LOGIN);

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body).to.contains({
      "message": "Invalid email or password"
    });
  });

  it('3- Testando /login/role', async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/role')
       .set( 'Authorization', TOKEN );

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal({ "role": "adimin" });
  });

  it('4- Testando /login/role com um token inválido', async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/role')
       .set( 'Authorization', 'qualquercoisa' );

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body).to.deep.equal({
      'message': 'Token must be a valid token'
    });
  });

  it('5- Testando /login/role sem um token', async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(usersMock[0] as Users);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/role')

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body).to.deep.equal({
      'message': 'Token not found'
    });
  });
});