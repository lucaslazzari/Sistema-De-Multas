import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm: FormGroup;


  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public authService: AuthService) {
    this.loginForm = this.formBuilder.group
      (
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]]
        }
      )
  }

  ngOnInit(): void {

  }

  get dadosForm() {
    return this, this.loginForm.controls;
  }

  loginUser() {
    this.loginService.login(this.dadosForm["email"].value, this.dadosForm["password"].value).subscribe(
      response => {
        const token = response.token;
        this.authService.setToken(token);
        this.authService.setEmailUser(this.dadosForm["email"].value);
        this.authService.usuarioAutenticado(true);
        this.router.navigate(['/listausuarios']);
      },
      err => {
        alert('Ocorreu um erro');
      }
    )
  }
}