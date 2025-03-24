import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm!: FormGroup;
  previewAvatar: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    const savedProfile = JSON.parse(sessionStorage.getItem('userProfile') || '{}');

    this.profileForm = this.fb.group({
      name: [savedProfile.name || '', Validators.required],
      description: [savedProfile.description || '', Validators.required],
      avatar: [savedProfile.avatar || 'assets/images/default-avatar.png', Validators.required]
    });

    this.previewAvatar = this.profileForm.value.avatar;
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewAvatar = reader.result as string;
        this.profileForm.patchValue({avatar: this.previewAvatar});
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
      sessionStorage.setItem('userProfile', JSON.stringify(profileData));
      this.router.navigate(['/profile']);
    }
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}
