import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService, private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }


  onLogin() {
    this.errorMessage = '';
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('loginuser', res.loginuser);
        console.log('Login successful' + res.token);
        console.log('local storage token' + localStorage.getItem('token'));
        console.log('Login successful' + res.loginuser);
        console.log('local storage user' + localStorage.getItem('loginuser'));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed';
        this.cdr.detectChanges();
        setTimeout(() => { this.errorMessage = ''; this.cdr.detectChanges(); }, 1500);
      }
    });


  }
  /**
   * 
   * @returns 
  
    login() {
      if (this.loginForm.invalid) return;
  
      this.loading = true;
      this.errorMessage = '';
  
      this.http.post<any>('http://localhost:8080/api/auth/login', this.loginForm.value)
        .subscribe({
          next: (res) => {
            // Save token
            localStorage.setItem('token', res.token);
  
            // Redirect after login
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Invalid email or password';
            this.loading = false;
          }
        });
    } */
}
