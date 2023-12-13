import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../App";

function Nav() {
  const { userData, updateUserData } = useContext(UserContext);
  const handleLogout = () => {
    updateUserData({ type: "LOGOUT" });
  };
  return (
    <>
      <Container>
        <FlexContainer>
          {userData ? (
            <>
              {" "}
              <Logo>
                <Link to="/home">
                  <Image src={require("../assets/images/logo.png")} />
                </Link>
              </Logo>
              <Button onClick={() => handleLogout()}>
                <Link to="/">Logout</Link>
              </Button>
            </>
          ) : (
            <>
              <Logo>
                <Link to="/">
                  <Image src={require("../assets/images/logo.png")} />
                </Link>
              </Logo>
              <Button>
                {" "}
                <Link to="/">Login</Link>
              </Button>
            </>
          )} 
        </FlexContainer>
      </Container>
    </>
  );
}
const Container = styled.header`
  padding: 42px 54px;

`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  width: 100px;
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const Button = styled.button`
  padding: 15px 48px;
  font-size: 19px;
  font-weight: 600;
  display: inline-block;
  background: #008000;
  font-family: 'Zeyada', cursive;
  transition: background-color ease 0.5s;
  color: #fff;
  border: none;
  border-radius: 5px;
  a {
    color: #fff;
    text-decoration: none;
  }
`;
export default Nav;
