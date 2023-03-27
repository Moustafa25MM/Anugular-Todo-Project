import { Injectable ,EventEmitter} from '@angular/core';
import User from './userInterface';
import Todo from './todoInterface';
import { Conditional } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private currentId = 0;
  private users: User[] = [];
  public showCondition :string=""; 
  buttonClicked =new EventEmitter();

  constructor() {
    
  }

  addTodoToUser(userId: number, title: string): void {
    if (!title) return;
    this.getUsers();
    const user = this.users.find((u) => u.id === userId);
    if (!user) return;
    this.getTodosForUser(user.id)
    const todo: Todo = {
      id: this.currentId,
      title,
      status: false,
      isFav: false,
      isDeleted: false,
    };
    user.todos.push(todo);
    this.updateUser(user);
  }

  updateTodoInUser(userId: number, todo: Todo): void {
    this.getUsers();
    const user = this.users.find((u) => u.id === userId);
    if (!user) return;
    const todoIndex = user.todos.findIndex((t) => t.id === todo.id);
    if (todoIndex < 0) return;
    user.todos[todoIndex] = todo;
    this.updateUser(user);
  }

  getTodosForUser(userId: number): Todo[] {
    this.getUsers();
    const user = this.users.find(u => u.id === userId);
    this.currentId = user?.todos ? user.todos.length +1 : 1;
    switch(this.showCondition){
      case 'Fav':
      return user ? user.todos.filter(t => t.isFav===true):[];
      case 'Deleted':
        return user? user.todos.filter(t => t.isDeleted===true):[];
      default :
        return user ? user.todos.filter(todo=>!todo.isDeleted===true) : [];

    }
  }
  private getUsers(): void {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }
  private updateUser(user: User): void {
    this.getUsers();
    const userIndex = this.users.findIndex((u) => u.id === user.id);
    if (userIndex < 0) return;
    this.users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
