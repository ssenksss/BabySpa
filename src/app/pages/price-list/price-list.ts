import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-list.html',
  styleUrls: ['./price-list.scss']
})
export class PriceList {
  public usluge = [
    {
      kategorija: 'Individualni tretmani',
      stavke: [
        { naziv: 'Baby Spa tretman u jednom terminu', cena: '2 500 din' },
        { naziv: 'Baby Spa Full tretman u jednom terminu', cena: '3 000 din' },
        { naziv: 'Baby Spa Full tretman u jednoj kadici (do 6 meseci)', cena: '5 000 din' },
        { naziv: 'Baby Spa tretman u jednoj kadici (do 6 meseci)', cena: '4 000 din' },
      ]
    },
    {
      kategorija: 'Dve bebe',
      stavke: [
        { naziv: 'Baby Spa tretman', cena: '5 500 din' }
      ]
    },
    {
      kategorija: 'Paketi',
      stavke: [
        { naziv: '5 tretmana', cena: '13 500 din' },
        { naziv: '10 tretmana', cena: '24 000 din' }
      ]
    }
  ];
}
