import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth';
import { Calendar } from '../calendar/calendar';
import { Terms } from '../terms/terms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, Calendar, Terms],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class Admin {
  constructor(private authService: AuthService) {}

  loginAsUser() {
    this.authService.login('user');
  }

  loginAsAdmin() {
    this.authService.login('admin');
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
