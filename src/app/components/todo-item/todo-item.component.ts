import { Component ,Input , EventEmitter, Output} from '@angular/core';
import User from 'src/app/services/userInterface';
import Todo from '../../services/todoInterface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo : Todo  = {
    id:0,
    title : '',
    status : false,
    isFav : false,
    isDeleted : false
  };
  @Output() returnTodo = new EventEmitter<Todo>();



  changeStatus(id : number): void {
    this.todo.status = !this.todo.status;
   }
  
   deleteTodo(id : number){
    this.todo.status = false;
    this.todo.isDeleted = true;
    this.todo.isFav= false;
   }
   getTodo() {
    this.returnTodo.emit(this.todo)
   }
   favTodo(id : number){

    this.todo.isFav =!this.todo.isFav;
   }
}
