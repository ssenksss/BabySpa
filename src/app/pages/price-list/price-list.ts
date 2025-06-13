import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, ServiceItem } from '../cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-list.html',
  styleUrls: ['./price-list.scss']
})
export class PriceList {
  usluge: { kategorija: string; stavke: ServiceItem[] }[] = [
    {
      kategorija: 'Individualni tretmani',
      stavke: [
        { id: 1, naziv: 'Baby Spa tretman u jednom terminu', opis: '', cena: 2500 },
        { id: 2, naziv: 'Baby Spa Full tretman u jednom terminu', opis: '', cena: 3000 },
        { id: 3, naziv: 'Baby Spa Full tretman u jednoj kadici (do 6 meseci)', opis: '', cena: 5000 },
        { id: 4, naziv: 'Baby Spa tretman u jednoj kadici (do 6 meseci)', opis: '', cena: 4000 },
      ]
    },
    {
      kategorija: 'Dve bebe',
      stavke: [
        { id: 5, naziv: 'Baby Spa tretman', opis: '', cena: 5500 }
      ]
    },
    {
      kategorija: 'Paketi',
      stavke: [
        { id: 6, naziv: '5 tretmana', opis: '', cena: 13500 },
        { id: 7, naziv: '10 tretmana', opis: '', cena: 24000 }
      ]
    }
  ];

  constructor(private cartService: CartService, private router: Router) {}

  dodajUKorpu(stavka: ServiceItem) {
    this.cartService.addItem(stavka);
    this.router.navigate(['/cart']);
  }
}
