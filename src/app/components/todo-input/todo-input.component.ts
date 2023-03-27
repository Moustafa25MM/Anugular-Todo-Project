import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';
import User from 'src/app/services/userInterface';
import  Todo  from '../../services/todoInterface';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent {
  title = '';
  // todo: Todo = {} as Todo;
  todos: Todo[] = [];
  currentId = 0;
  users: User[] = [];
  user: User = { } as User;
  userId = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private authService : AuthService
  ) {
    this.userId = Number(this.activatedRoute.snapshot.params['id']);
    this.user = authService.getUserInLocalStorage().find((user : User) => user.id === this.userId)
    this.todoService.buttonClicked.subscribe(()=>{
      this.getTodos();
    })
  }

  addTodo(): void {
    this.todoService.addTodoToUser(this.userId, this.title);
    this.todoService.showCondition='';
    this.getTodos();
    this.title = '';
  }

  updateTodos(todo: Todo): void {
    this.todoService.updateTodoInUser(this.userId, todo);
  }

  getNewTodo(event : Todo) : void {
    this.updateTodos(event)
    this.todoService.showCondition='';
    this.todoService.buttonClicked.emit();
  }
  
  private getTodos(): void {
    this.todos = this.todoService.getTodosForUser(this.userId);
  }
 ngOnInit() {
  this.getTodos();
 }
}
