import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { UserContext } from "../../App";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    axios
      .post(`http://127.0.0.1:8000/api/v1/auth/register/`, {
        email,
        password,
        name: name,
      })
      .then((response) => {
        let data = response.data.data;
        console.log(response.data);
        let status_code = response.data.status_code;
        if (status_code === 6000) {
          console.log(status_code);
          localStorage.setItem("user_login_data", JSON.stringify(data));
          updateUserData({ type: "LOGIN", payload: data });
          navigate("/home");
        } else {
          setMessage(response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error.response);
        if (error.response.status === 500) {
          setMessage("Name , Email and Password:Field is required");
        }
        if (error.response.status === 401) {
          setMessage(error.response.data.detail);
        }
      });
  };
  
  return (
    <>
      <Helmet>
        <title>Signup Page</title>
      </Helmet>
      <Container>
        <RightContainer>
          <LoginContainer>
            <LoginHeading>Register into Account</LoginHeading>
            <LoginInfo>Create an account to acccess all the features</LoginInfo>
            <Form onSubmit={onHandleSubmit}>
              <InputContainer>
                <TextInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </InputContainer>
              <InputContainer>
                <TextInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </InputContainer>
              <InputContainer>
                <TextInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </InputContainer>
              <LoginButton to="/">Login Now</LoginButton>
              {message && <ErrorMessage>{message}</ErrorMessage>}
              <ButtonContainer>
                <SubmitButton>Create an account</SubmitButton>
              </ButtonContainer>
            </Form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}
export default Signup;


const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0px 0px 0px;
`;
const RightContainer = styled.div`
  display: flex;
  background: #ADD8E6;
  border-radius: 20px;
  padding: 26px 72px 30px 72px;
`;
const LoginContainer = styled.div`
  
`;
const LoginHeading = styled.h3`
  font-size: 22px;
  font-weight: 700;
  font-family: 'Merienda',cursive;
`;
const LoginInfo = styled.p`
  font-size: 15px;
  margin-bottom: 22px;
  font-family: 'Zeyada',cursive;
`;
const Form = styled.form`
  width: 100%;
  display: block;
`;
const InputContainer = styled.div`
  position: relative;
`;
const TextInput = styled.input`
  padding: 8px 18px;
  display: block;
  width: 89%;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Zeyada',cursive;
  margin-bottom: 12px;
  outline: none;
`;
const LoginButton = styled(Link)`
  display: flex;
  justify-content: center;
  font-weight: bold;
  color: #000;
  margin-top: 20px;
  font-family: 'Zeyada',cursive;
  margin-bottom: 18px;
`;
const SubmitButton = styled.button`
  background: #008000;
  border: 0;
  outline: 0;
  color: #fff;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 16px;
  font-family: 'Zeyada',cursive;
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ErrorMessage = styled.p`
  font-size: 15px;
  color: red;
  margin-bottom: 25px;
  font-family: 'Zeyada',cursive;
  text-align: center;
`;
