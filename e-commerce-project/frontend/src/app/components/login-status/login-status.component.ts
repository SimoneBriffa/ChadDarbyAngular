import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {

    //Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );

  }


  getUserDetails() {
    if(this.isAuthenticated){
      this.oktaAuthService.getUser().then(
        res => {
          this.userFullName = res.name;
        }
      );
    }
  }

  logout() {
    //Termina la sessione e rimuovi i token
    this.oktaAuthService.signOut();
  }

}
