import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login(loginForm : any){
    this.userService.login(loginForm.value).subscribe(
    (response)=>{
      console.log(response);
    },
    (error) =>{
      console.log(error)
    }
    )
    
  }

}
