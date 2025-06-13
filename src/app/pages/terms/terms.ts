import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Lista zakazanih termina (admin)</h2>`,
})
export class Terms {}
