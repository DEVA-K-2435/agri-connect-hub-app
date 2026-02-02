import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  registerForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder,private authService: AuthService,
    private router: Router,private cdr: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['',[Validators.required, Validators.pattern('^(FARMER|BUYER|OWNER|LABORER)$')]]
    });
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.registerForm.invalid) return;

    this.loading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: res => {
        this.loading = false;
        this.errorMessage = '';
        this.successMessage = res?.message || 'Registration successful';
        this.cdr.detectChanges();
        setTimeout(() => {this.successMessage = '';this.cdr.detectChanges();}, 1500);
        this.registerForm.reset();
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
  },
      error: err => {
        console.error(err);
        this.loading = false;
        this.successMessage = '';
        this.errorMessage = err?.error?.message || err?.error || 'Registration failed';
        this.cdr.detectChanges();
        setTimeout(() => {this.errorMessage = '';this.cdr.detectChanges();}, 1500);
      }
    });
  }
}
