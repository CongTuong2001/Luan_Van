/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import NotiForm from "./NotiForm";
import Noti from "./Noti";
import styled from "styled-components";
import axios from "axios";
import * as Config from "../../../API/Config";

const Noti_Form = styled.div`
  width: 50%;
  margin: auto;
  background-color: rgb(190, 185, 185);
  min-height: 50vh;
  padding: 30px 0 30px 0;
  margin-top: 5vh;
  border-radius: 20px;
  margin-bottom: 10vh;
  // overflow: hidden;
`;

const Noti_title = styled.h1`
  width: 80%;
  margin: auto;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
  font-size: 5rem;
  text-align: center;
  font-weight: bold;
  color: #0b5592;
`;

function TodoList(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchNotiList() {
      const item =
        sessionStorage.getItem("item") === null
          ? sessionStorage.getItem("ten_lop")
          : sessionStorage.getItem("item");
      console.log(item);
      await axios
        .get(`${Config.API_URL}/post/${item}`)
        .then((response) => {
          console.log(response.data);
          setTodos(response.data.getpost);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchNotiList();
  }, []);

  const addTodo = (todo) => {
    if (!todo.content || /^\s*$/.test(todo.content)) {
      return;
    }
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const removeTodo = async (id) => {
    await axios.delete(`http://localhost:5001/post/delete/${id}`);
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };
  const role = props.role;
  if (role !== "student") {
    return (
      <>
        <Noti_Form>
          <Noti_title>THÔNG BÁO</Noti_title>
          <NotiForm todos={todos} onSubmit={addTodo} />
          <Noti role={role} todos={todos} removeTodo={removeTodo} />
        </Noti_Form>
      </>
    );
  } else {
    return (
      <Noti_Form>
        <Noti_title>THÔNG BÁO</Noti_title>
        <Noti role={role} todos={todos} removeTodo={removeTodo} />
      </Noti_Form>
    );
  }
}

export default TodoList;
