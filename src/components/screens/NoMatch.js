import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";


function NoMatch() {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <Container>
      <Images src={require("../assets/images/error.png")} />
      </Container>
    </>
  );
}
export default NoMatch;


const Container = styled.div`
  text-align: center;
  background-color: blue;
  padding: 26px 0;
  width: 100%;
`;
const Images = styled.img`
  width: 20%;
  margin: 0 auto;
`;
