import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';
import Todo from 'src/app/services/todoInterface';
import User from 'src/app/services/userInterface';

declare let navigator: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  users : User[]=[];
  userId: number =0;
  todos : Todo[]=[];
  name : string = 'random';
  user : User ={} as User;
  constructor(private _activatedRoute:ActivatedRoute,private _authService: AuthService,private _router:Router,private _todoService:TodoService) {
    this.userId = Number(_activatedRoute.snapshot.params['id']);

  }

  ngOnInit(): void {

  }
  getUsers() {
    this.users = this._authService.getUserInLocalStorage();
    this.user = this.users.find((user) => user.id === this.userId)!
    this.todos= this.user.todos;


  }

  getfav(){
    this._todoService.showCondition = "Fav";
    this._todoService.buttonClicked.emit();
  }

  getDeleted(){
    this._todoService.showCondition = "Deleted";
    this._todoService.buttonClicked.emit();
  }

  favNum(){
    this.getUsers()
    return this.todos.filter(todo=>todo.isFav===true).length;

  }

  deletedNum(){
    this.getUsers()
    return this.todos.filter(todo=>todo.isDeleted===true).length;
  }
  doneNum(){
    this.getUsers()
    if(this.deletedNum()>=this.todos.length || this.todos.length==0)
      return 0;
    return Math.floor((this.todos.filter(todo=>todo.status===true).length/(this.todos.length-this.deletedNum()))*100);
  }

  logOut(){
    this._router.navigate(['/login']);
    }
  }

