import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";

function SingleFood() {
  const [des, setDes] = useState({});
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const navi = useNavigate();

  const getSingleFood = async () => {
    const result = await axios
      .get(`http://127.0.0.1:8000/api/v1/food/view/${id}`, {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setDes(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/v1/food/delete/${id}`);
    navi("/home");
  };
  const renderFoods = () => {
    return (
      <>
        <Helmet>
          <title>Single Recipe</title>
        </Helmet>
        <MainContainer>
          <DesHead>{des.name}</DesHead>
          <DeleteContainer>
            <Link to={`/description/${des.id}/update/${des.id}`}>
              {" "}
              <Delete>Update Recipe</Delete>
            </Link>
            <Link onClick={() => deleteUser(des.id)}>
              <Delete>Delete Recipe</Delete>
            </Link>
            <PublisherName> Publisher: {des.publisher_name}</PublisherName>
          </DeleteContainer>
          <FoodCard>
            <LeftContainer>
              <ImageContainer>
                <Image src={des.featured_image} />
              </ImageContainer>
            </LeftContainer>
            <RightContainer></RightContainer>
          </FoodCard>
          <Content>
            <Top>Food Ingredients</Top>
            <Cont>{des.ingredients}</Cont>
            <Top>Preparation Method</Top>
            <Cont>{des.description}</Cont>
          </Content>
        </MainContainer>
      </>
    );
  };
  useEffect(() => {
    getSingleFood();
  }, []);

  return <>{renderFoods()}</>;
}
export default SingleFood;


const MainContainer = styled.div`
  width: 77%;
  margin: 0 auto;
  padding-top: 65px;
`;
const DesHead = styled.h1`
  font-size: 50px;
  font-family: 'Merienda', cursive;
  margin-bottom: 10px;
`;
const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const Delete = styled.span`
  text-decoration: none;
  padding: 12px 25px;
  border-radius: 8px;
  background: #0000FF;
  color: #fff;
  font-family: 'Zeyada', cursive;
  font-size: 17px;
  font-weight: 500;
  margin-right: 12px;
`;

const PublisherName = styled.h6`
  margin-left: 16px;
  font-size: 16px;
  font-family: 'Zeyada', cursive;
  color: #000;
`;
const FoodCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const LeftContainer = styled.div`
  width: 50%;
`;
const ImageContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const RightContainer = styled.div``;
const Content = styled.div``;
const Top = styled.h3`
  font-size: 26px;
  font-family: 'Merienda', cursive;
  margin-bottom: 20px;
`;
const Cont = styled.p`
  font-family: 'Zeyada', cursive;
  font-size: 18px;
`;
