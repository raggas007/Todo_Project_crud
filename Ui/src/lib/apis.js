import $axios from "./axios.instance";

export const registerUser = async (values) => {
  return await $axios.post("/user/register", values);
};

export const loginUser = async (values) => {
  return await $axios.post("/user/login", values);
};
export const addTodo = async (values) => {
  return await $axios.post("/add/todo", values);
};
