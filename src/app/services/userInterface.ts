import Todo from "./todoInterface";
export default interface User {
  id : number;
  username : string;
  password: string;
  qoute : string;
  todos : Todo[];
}