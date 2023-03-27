import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptorInterceptor } from './my-interceptor.interceptor';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    LoginComponent,
    TodoItemComponent,
    NavbarComponent,
    SingUpComponent,
    AboutusComponent,
    FooterComponent,
    NotfoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptorInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
