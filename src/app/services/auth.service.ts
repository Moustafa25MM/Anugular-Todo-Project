import { Injectable } from '@angular/core';
//import User from './userInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import User from './userInterface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentId : number = 0 ;

  constructor( private _http : HttpClient) { }
  getUsers() {
    
    return this._http.get('https://dummyjson.com/users?skip=50&limit=50');
   }
   getUserInLocalStorage() {
    return JSON.parse(localStorage.getItem('users') as string) || []; 
   }
   addUser(data : User) {
    let users = localStorage.getItem('users');
    let usersArray :User[] = users ? JSON.parse(users) : []; // convert to array or create an empty array if null or undefined
    this.currentId = usersArray.length === 0 ? 1 : usersArray[usersArray.length -1 ].id +1;
    data.todos = [];
    data.id =  this.currentId;
    usersArray.push(data);
    localStorage.setItem('users', JSON.stringify(usersArray)); 
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this._http.post('https://dummyjson.com/users/add' , data ,{headers} )
   }

   isUser(body : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post('https://dummyjson.com/auth/login' , body , {headers})
   }
  
}
