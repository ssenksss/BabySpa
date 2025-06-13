import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ServiceItem {
  id: number;
  naziv: string;
  opis: string;
  cena?: number;
  ocena?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: ServiceItem[] = [];
  private itemsSubject = new BehaviorSubject<ServiceItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
      this.itemsSubject.next(this.items);
    }
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.itemsSubject.next(this.items);
  }

  addItem(item: ServiceItem) {
    if (!this.items.find(i => i.id === item.id)) {
      this.items.push(item);
      this.updateCart();
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.updateCart();
  }

  clearCart() {
    this.items = [];
    this.updateCart();
  }
}
