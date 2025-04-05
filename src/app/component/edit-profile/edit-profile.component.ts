import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DeleteAccountDialogComponent} from './delete-account-dialog.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private dialog: MatDialog
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    // Load user data from session storage or local storage
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    if (userData) {
      this.profileForm.patchValue({
        username: userData.username || '',
        email: userData.email || '',
        bio: userData.bio || ''
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        // Save user data to session storage
        const userData = {
          ...JSON.parse(sessionStorage.getItem('userData') || '{}'),
          ...this.profileForm.value
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));

        this.isLoading = false;
        this.router.navigate(['/profile']);
      }, 1000);
    }
  }

  openDeleteAccountDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      width: '500px',
      panelClass: 'delete-account-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteAccount();
      }
    });
  }

  deleteAccount(): void {
    // 1. Disconnect wallet if used
    // This would depend on your wallet implementation
    // For example: this.walletService.disconnect();

    // 2. Clear session storage and local storage
    sessionStorage.clear();
    localStorage.clear();

    // 3. Navigate to onboarding/welcome screen
    this.router.navigate(['/']);
  }
}
