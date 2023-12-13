import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";


export const FoodsContext = createContext();


function Foods() {
  const [foods, setFoods] = useState([]);
  const { userData } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const navi = useNavigate();

  const getFoods = async () => {
    const response = await axios
      .get("http://127.0.0.1:8000/api/v1/food/", {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setFoods(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async function foodSearch(e) {
    e.preventDefault();
    setSearchText(search);
    setSearch("");
    await axios
      .get(`http://127.0.0.1:8000/api/v1/food/?q=${search}`, {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setFoods(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const getFoodRecipes = () => {
    return foods.map((item) => {
      return (
        <FoodItem key={item.id}>
          <Link to={`/description/${item.id}`}>
            <FoodImageContainer>
              <FoodImage src={item.featured_image} />
            </FoodImageContainer>
            <FoodName>{item.name}</FoodName>
            <PublisherName>Publisher : {item.publisher_name}</PublisherName>
          </Link>
        </FoodItem>
      );
    });
  };
  useEffect(() => {
    const handleRefresh = () => {
      const isRefreshed = sessionStorage.getItem("isRefreshed");
      if (!isRefreshed) {
        sessionStorage.setItem("isRefreshed", "true");
        navi("/home");
      }
    };

    handleRefresh();

    return () => {
      sessionStorage.removeItem("isRefreshed");
    };
  }, [navi]);

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <>
      <Helmet>
        <title>Food Recipes</title>
      </Helmet>
      <FoodsContext.Provider value={foods}>
        <BodyContainer>
          <InnerContainer>
            <SubHeading>Explore food recipes</SubHeading>
            <SearchBox>
              <SearchForm onSubmit={foodSearch}>
                <SearchInput className="search" value={search} type="search" onChange={(e) => { setSearch(e.target.value);}} placeholder="Search the food" />
                <SearchSubmit onClick={foodSearch}>Search</SearchSubmit>
              </SearchForm>
              <AddButtonContainer>
               <AddButton to="add/">Add Recipe</AddButton>
              </AddButtonContainer>
            </SearchBox>
            {searchText ? (
              <ResultHeading>Result of :{searchText}</ResultHeading>) : ( ""
            )}
            <FoodsList>{getFoodRecipes()}</FoodsList>
          </InnerContainer>
        </BodyContainer>
      </FoodsContext.Provider>
    </>
  );
}
export default Foods;


const BodyContainer = styled.div`
  padding: 0px 100px;
 
`;
const InnerContainer = styled.div`

`;
const SubHeading = styled.h5`
  font-size: 24px;
  margin-bottom: 72px;
  font-family: 'Merienda', cursive;
`;
const FoodsList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const FoodItem = styled.li`
  width: 23%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  margin-bottom: 44px;
  box-shadow: 0 10px 15px 0px rgba(0, 0, 0, 0.1);

  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px 0px rgba(0, 0, 0, 0.3);
  }
`;
const FoodImageContainer = styled.div``;
const FoodImage = styled.img`
  display: block;
  width: 100%;
`;
const FoodName = styled.h4`
  width: 92%;
  margin: 5px auto 0px;
  font-size: 18px;
  margin-bottom: 13px;
  margin-top: 13px;
  font-family: 'Merienda', cursive;
  text-decoration-line: none;
`;
const PublisherName = styled.span`
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
  margin-bottom: 13px;
  font-family: 'Zeyada',cursive;
`;
const SearchBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 130px;
`;
const SearchForm = styled.form`
  display: flex;
  width: 54%;
`;
const AddButtonContainer = styled.div`
  display: flex;
`;
const AddButton = styled(Link)`
  text-decoration: none;
  padding: 12px 25px;
  border-radius: 8px;
  background: #0000FF;
  color: #fff;
  font-family: 'Zeyada', cursive;
  font-size: 17px;
  font-weight: 500;
`;
const SearchInput = styled.input`
  display: block;
  width: 100%;
  border: 1px solid gray;
  padding: 12px 10px;
  border-radius: 8px;    
  font-family: 'Merienda', cursive;
  font-size: 15px;
`;
const SearchSubmit = styled.button`
  display: inline-block;
  padding: 0px 35px;
  font-size: 17px;
  border-radius: 8px;
  position: relative;
  margin-left: 13px;
  cursor: pointer;
  border: none;
  color: #fff;
  font-family: 'Zeyada', cursive;
  background: orange;
  font-weight: 500;
`;
const ResultHeading = styled.h3`
  margin-bottom: 25px;
  color: red;
`;