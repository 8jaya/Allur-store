import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private dataSource = new BehaviorSubject<string>('');
  currentUser = this.dataSource.asObservable();

  constructor(private router:Router) { }

  public setRoles(roles: any[]){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const rolesString = localStorage.getItem("roles");
    return rolesString ? JSON.parse(rolesString) : [];
  }

  public setToken(jwtToken: string){
    localStorage.setItem('jwttoken',jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwttoken');
  }

  public clear(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles().length && !!this.getToken();
  }

  public isAdmin(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === "Admin";
  }

  public isUser(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === "User";
  }

  updateCurrentUser(data: string) {
    this.dataSource.next(data);
  }

}
