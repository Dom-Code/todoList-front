import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import { LoginProps } from './Account';
import { Button, Col, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';
import { ValidationContext } from '../../App';

const Login = () => {
  // const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const navigate = useNavigate();
  const { setAccessToken } = useContext(ValidationContext);

  const submitLogin = (e: any) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    axios({
      method: 'post',
      url: 'https://haunted-wizard-63978-48bf82cc3a5b.herokuapp.com/login',
      data: loginData,
    })
      .then((response) => {
        // console.log(response);
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        setAccessToken(accessToken);

        sessionStorage.setItem('todolistRefreshToken', refreshToken);
        handleShowModal();

        setTimeout(() => {
          handleCloseModal();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setIsInvalid(true);
      });
  };

  return (
    <>
      <Form id='login-form' onSubmit={submitLogin}>
        <Form.Group
          as={Col}
          className='input-group mb-3'
          controlId='formHorizontalEmail'
        >
          <Form.Label className='label'>Email Address:</Form.Label>
          <Form.Control
            type='email'
            // defaultValue={userEmail}
            className='mb-3 rounded-3'
            onChange={(e) => {
              setEmail(e.target.value);
              if (isInvalid) {
                setIsInvalid(false);
              }
            }}
            isInvalid={isInvalid}
            isValid={isValid}
          />
        </Form.Group>

        <Form.Group
          className='input-group'
          as={Col}
          controlId='formHorizontalPassword'
        >
          <Form.Label className='label'>Password:</Form.Label>
          <Form.Control
            type='password'
            className='mb-3 rounded-3'
            onChange={(e) => {
              setPassword(e.target.value);
              if (isInvalid) {
                setIsInvalid(false);
              }
            }}
            isInvalid={isInvalid}
            isValid={isValid}
          />
        </Form.Group>

        {/* <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup> */}

        <Form.Group>
          <Col smoffset={2} sm={10}>
            <Button type='submit'>Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
      <Modal
        show={showModal}
        // onHide={handleCloseModal}
        onExited={() => {
          navigate('/');
        }}
        backdrop='static'
        keyboard={false}
        id='modal'
      >
        <Modal.Body id='modal-body'>
          Logging you in. You will be redirected soon.
        </Modal.Body>
      </Modal>
      <Button
        onClick={() => {
          setAccessToken('');
        }}
      >
        Delete access token
      </Button>
    </>
  );
};

export default Login;
