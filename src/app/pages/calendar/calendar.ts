import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarEvent,
  CalendarView,
  CalendarModule,
} from 'angular-calendar';
import { addDays, startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendar {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Prvi termin',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
    },
    {
      start: addDays(new Date(), 2),
      title: 'Drugi termin',
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
    },
  ];

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked(date: Date) {
    this.viewDate = date;
  }
}
