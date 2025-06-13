import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CartService, ServiceItem } from './cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatButtonModule, MatCard],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  items: ServiceItem[] = [];
  displayedColumns = ['naziv', 'cena', 'actions'];
  showTimeSelection = false;

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.items$.subscribe(data => this.items = data);
  }

  placeOrder() {
    if (confirm('Da li želite da zakažete?')) {
      this.showTimeSelection = true;
    }
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  clear() {
    this.cartService.clearCart();
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + (item.cena || 0), 0);
  }

  confirmTime() {
    const timeInput = (document.getElementById('time') as HTMLInputElement);
    const time = timeInput?.value;

    if (!this.items.length) {
      alert('Korpa je prazna.');
      return;
    }

    if (!time) {
      alert('Molimo vas da izaberete vreme.');
      return;
    }

    const now = new Date();
    const selectedTime = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    selectedTime.setHours(hours, minutes, 0, 0);

    if (selectedTime < now) {
      alert('Vreme mora biti u budućnosti.');
      return;
    }

    alert(`Vreme je potvrđeno: ${time}`);
    this.showTimeSelection = false;
    if (confirm('Zahtev je uspešno poslat. Želite li da nastavite kupovinu?')) {
      this.router.navigate(['/home']);
    }
  }

  goHome() {
    window.location.href = '/';
  }
}
