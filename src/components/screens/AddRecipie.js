import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate } from "react-router-dom";


function AddRecipie() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");

  const navigate = useNavigate();

  const addRecipeInfo = async (e) => {
    e.preventDefault();
    let formField = new FormData();
    formField.append("name", foodName);
    formField.append("publisher_name", name);
    formField.append("description", description);
    formField.append("ingredients", ingredients);
    if (image !== null) {
      formField.append("featured_image", image);
    }
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/food/create/",
      data: formField,
    }).then((response) => {
      navigate("/home");
    });
  };
  return (
    <MainContainer>
      <Heading>Add the Recipe</Heading>
      <FormConatiner onSubmit={addRecipeInfo}>
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
            <SubmitButton type="submit">Add Recipie</SubmitButton>
        </ButtonContainer>
      </FormConatiner>
    </MainContainer>
  );
}
export default AddRecipie;


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
