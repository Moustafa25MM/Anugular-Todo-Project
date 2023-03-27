import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path: '', redirectTo: 'login' ,pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SingUpComponent},
  {path: 'todos/:id' , component : TodoInputComponent},
  {path: 'aboutus' , component : AboutusComponent },
  {path: '**', component: NotfoundComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
