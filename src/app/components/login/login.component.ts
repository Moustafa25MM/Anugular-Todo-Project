import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/services/userInterface';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users : User[] = [];
  user : User = {} as User
  currentId : number = 0;
  notUser : boolean = false;
  constructor(private _AuthService : AuthService ,private _router : Router){
    
    this.users  = this._AuthService.getUserInLocalStorage();
  }
  loginUser(form:NgForm) : void{
    this.getUsers();
    // this.user.id = this.currentId;
    if(!form.valid){
      form.reset();
      return;
    }
    if(this.users.findIndex(u => u.username == form.value.username)!==-1){
      this.user = this.users[this.users.findIndex(user => user.username == form.value.username)];
      this._router.navigate(['/todos',this.user.id]);
      return;  
    }else{
      this.notUser =true
    }
    
    //http auth request
   //this._AuthService.addUser(form.value).subscribe((user : any) => {console.log(JSON.stringify(user));
     //})
    //this._router.navigate(['/todos',this.user.id]);
  }
  getUsers() : void{
    this.users  = this._AuthService.getUserInLocalStorage();
    this.currentId = this.users.length === 0 ? 1 :this.users[this.users.length -1 ].id +1;
  }

  signUp() {
    this._router.navigate(['/signup']);
  }
  aboutus(){
    this._router.navigate(['../aboutus'])
  }

  ngOnInit() : void {
    if(!localStorage.getItem('users')){
      localStorage.setItem('users' , '[]');
    }
  }

}
