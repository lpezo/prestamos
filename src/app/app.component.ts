import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';
import { User } from './shared/user.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'banco-abc';
  currentUser: User;

  constructor(
    private authenticate: AuthenticationService,
    private router: Router
  ) { 
      this.authenticate.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit(): void {
    
  }

  logout() {
    //localStorage.removeItem('currentuser');
    //this.changeLogged(false);
    this.authenticate.logout();
    this.router.navigate(['/']);
  }

}
