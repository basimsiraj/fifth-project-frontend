import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { UserContext } from "../../App";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    axios
      .post(`http://127.0.0.1:8000/api/v1/auth/token/`, {
        username: email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        localStorage.setItem("user_data", JSON.stringify(data));
        updateUserData({ type: "LOGIN", payload: data });
        navigate("/home");
      })
      .catch((error) => {                                              
        console.log(error.response.data);
        if (error.response.status === 401) {
          setMessage(error.response.data.detail);
        } else {
          if (error.response.data.username === "username") {
            setMessage("email:field is required");
          } else {
            setMessage("Email & Password field is required");
          }
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <Container>
        <RightContainer>
          <LoginContainer>
            <LoginHeading>Login Or Signup</LoginHeading>
            <LoginInfo>Enter email and password to login</LoginInfo>
            <Form onSubmit={onHandleSubmit}>
              <InputContainer>
                <TextInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </InputContainer>
              <InputContainer>
                <TextInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </InputContainer>
              {message && <ErrorMessage>{message}</ErrorMessage>}
              <ButtonContainer>
                <SubmitButton>Login</SubmitButton>
              </ButtonContainer>
              <LoginButton to="/auth/register/">Signup Now</LoginButton>
            </Form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}
export default Login;


const Container = styled.div`
  display: flex;
  justify-content: center; 
  padding: 14px 45px 0px 45px;
`;
const RightContainer = styled.div`
  background: #ADD8E6;
  display: flex;
  justify-content: center;
  border-radius: 20px;
`;
const LoginContainer = styled.div`
  padding: 30px 60px 0px 60px;
`;
const LoginHeading = styled.h3`
  font-size: 20px;
  font-family: 'Merienda', cursive;
  font-weight: 700;
`;
const LoginInfo = styled.p`
  font-size: 15px;
  margin-bottom: 20px;
  font-family: 'Zeyada', cursive;
`;
const Form = styled.form`
  width: 100%;
  display: block;
`;
const InputContainer = styled.div`
  position: relative;
  &:before {
  }
`;
const TextInput = styled.input`
  padding: 8px 18px;
  width: 88%;
  display: block;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  outline: none;
  font-family: 'Zeyada',cursive;
  margin-bottom: 18px;
`;
const LoginButton = styled(Link)`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  color: #000;
  font-size: 15px;
  font-family: 'Zeyada',cursive;
  font-weight: bold;
`;
const SubmitButton = styled.button`
  background: #008000;
  border: 0;
  outline: 0;
  color: #fff;
  padding: 10px 30px;
  border-radius: 8px;
  font-size: 17px;
  cursor: pointer;
  font-family: 'Zeyada',cursive;
  margin-bottom: 16px;
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
