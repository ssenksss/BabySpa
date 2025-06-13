import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})


export class Contact {
  kontaktPodaci = {
    adresa: 'Toplice Milana 15nj, Kraljevo',
    telefon: '+381 64 4101 239',
    email: 'team.babyspa@gmail.com',
    instagram: 'babyspa.kraljevo',
    radnoVreme: [
      'Ponedeljak - Petak: 10:00 - 13:00 i 14:00 - 19:00',
      'Subota: 10:00 - 14:00',
      'Nedelja: Ne radimo'
    ]
  };
}
