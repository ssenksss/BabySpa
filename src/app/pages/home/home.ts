import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Contact} from '../contact/contact';
import {Services} from '../services/services';
import { PriceList } from '../price-list/price-list';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Contact, Services,PriceList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
