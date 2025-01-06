import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  user="";

  constructor(private userAuth:UserAuthService, public userService:UserService){}

  public isLogedin():boolean{
    return this.userAuth.isLoggedIn();
  }

  public logout(){
    this.userAuth.clear();
  }

  public isAdmin(){
    return this.userAuth.isAdmin();
  }

  public isUser(){
    let isUser = this.userAuth.isUser();
    if(isUser===true){
      this.userAuth.currentUser.subscribe((data)=>this.user=data)
    }
    return isUser;
  }
}
