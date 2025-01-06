import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  message="";
  constructor(private userService: UserService,private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        this.message = response;
        this.userAuthService.updateCurrentUser(this.message);
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }
}
