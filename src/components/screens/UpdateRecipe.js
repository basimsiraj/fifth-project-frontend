import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


function UpdateRecipie() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");

  const navi = useNavigate();
  const { ID } = useParams();

  const updateSingleFood = async () => {
    let formField = new FormData();
    console.log(ID);

    formField.append("name", foodName);
    formField.append("publisher_name", name);
    formField.append("description", description);
    formField.append("ingredients", ingredients);
    if (image !== null) {
      formField.append("featured_image", image);
    }
    await axios({
      method: "PUT",
      url: `http://127.0.0.1:8000/api/v1/food/update/${ID}/`,
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navi("/home");
    });
  };

  return (
    <MainContainer>
      <Heading>Update the Recipe</Heading>
      <FormConatiner onSubmit={updateSingleFood}>
        <InputContainer>
          <Label for="id_name">Name</Label>
          <TextInput type="text" placeholder="Enter your name" id="id_name" value={name} onChange={(e) => setName(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <Label for="id_food_name">Food Name</Label>
          <TextInput type="text" placeholder="Enter food name" id="id_food_name" name="name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <Label for="id_featured_image">Featured Image</Label>
          <TextInput type="file" accept="image/*" id="id_featured_image" onChange={(e) => setImage(e.target.files[0])} />
        </InputContainer>
        <InputContainer>
          <Label for="id_ingredients">Ingredients</Label>
          <TextArea id="id_ingredients" rows="14" cols="50" name="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)}></TextArea>
        </InputContainer>
        <InputContainer>
          <Label for="id_description">Description</Label>
          <TextArea id="id_description" rows="14" cols="50" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></TextArea>
        </InputContainer>
        <ButtonContainer>
          <Link>
            <SubmitButton onClick={updateSingleFood}>Update</SubmitButton>{" "}
          </Link>
        </ButtonContainer>
      </FormConatiner>
    </MainContainer>
  );
}
export default UpdateRecipie;


const MainContainer = styled.div`
  width: 85%;
  margin: 0 auto;
  padding-bottom: 24px;
`;
const Heading = styled.h1`
  text-align: center;
  font-family: 'Merienda', cursive;
`;
const FormConatiner = styled.form`
  width: 90%;
  margin: 36px auto 0px;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const Label = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  font-size: 17px;
  font-family: 'Merienda', cursive;
`;
const TextInput = styled.input`
  width: 30%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  font-family: 'Zeyada', cursive;
`;
const TextArea = styled.textarea`
  width: 54%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;
const ButtonContainer = styled.div``;
const SubmitButton = styled.button`
  text-decoration: none;
  padding: 8px 25px;
  border-radius: 8px;
  background: #0000FF;
  color: #fff;
  font-family: 'Zeyada',cursive;
  font-size: 17px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  margin-right: 12px;
`;
