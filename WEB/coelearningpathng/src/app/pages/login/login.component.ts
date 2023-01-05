import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService) {

  }

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  onSubmit() {
    if(this.authenticationService.login(this.loginForm.value))
    {
      this.toastr.success('Authentication Successful');

      this.router.navigateByUrl('/home');
    } else {
      this.toastr.error('Authentication failed, please review your credentials');
    }
  }

}

