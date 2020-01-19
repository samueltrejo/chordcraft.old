import React from 'react';
import { Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap';

import Navigation from './nav';

import loginImg from '../assets/austin-distel-VCFxt2yT1eQ-unsplash.jpg'

const LoginOptions = () => {
  return (
    <div className="login-options">
      <Navigation />
      <div className="container mt-6">
        <Jumbotron className="row w-100 p-0 mx-0 bg-light">
            <div className="col-6 p-5">
              <h1 className="text-center">Welcome!</h1>
              <div className="lead">In order to start creating, please login to your account.</div>
              <div className="row mt-3">
                <div className="col-6 px-3"><button className="btn btn-dark w-100">Google</button></div>
                <div className="col-6 px-3"><button className="btn btn-dark w-100">Facebook</button></div>
              </div>
              <div className="lead text-center mt-3">-Or-</div>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>
                <div className="text-center"><Button color="dark">Login/Register</Button></div>
              </Form>
            </div>
          <div className="col-6 rounded-right" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginImg})`,
          backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
        </Jumbotron>
      </div>
    </div>
  )
};

export default LoginOptions;
