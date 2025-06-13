import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  imports: [CommonModule, RouterModule]
})
export class Navbar {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
    this.authService.isAdmin$.subscribe(adminStatus => this.isAdmin = adminStatus);
  }

  logout() {
    this.authService.logout();
  }

  scrollToSection(sectionId: string) {
    if (location.pathname !== '/') {
      window.location.href = '/#' + sectionId;
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  goToAdminSection(sectionId: string) {
    if (location.pathname !== '/admin') {
      this.router.navigate(['/admin']).then(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
