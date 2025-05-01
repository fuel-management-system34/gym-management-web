import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AddEditEventComponent } from '../add-edit-event/add-edit-event.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
  standalone: true,
  imports: [CommonModule, FullCalendarModule, MatCardModule, AddEditEventComponent]
})
export class CalenderComponent {
  calendarOptions: CalendarOptions;

  events = [];

  constructor(private dialog: MatDialog) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      initialView: 'timeGridWeek',
      editable: true,
      selectable: true,
      events: this.events,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      buttonText: {
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day',
        list: 'list'
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.handleEventDrop.bind(this)
    };
  }

  handleDateClick(arg: DateClickArg) {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      data: { date: arg.dateStr }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.events = [
          ...this.events,
          {
            title: result.title,
            start: result.start,
            end: result.end,
            allDay: false
          }
        ];
        this.calendarOptions.events = [...this.events]; // Refresh
      }
    });
  }

  handleEventClick(arg: EventClickArg) {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      data: { event: arg.event }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        arg.event.setProp('title', result.title);
        arg.event.setStart(result.start);
        arg.event.setEnd(result.end);
      }
    });
  }

  handleEventDrop(arg: EventDropArg) {
    const { event } = arg;
    console.log('Event dropped to:', event.start, event.end);
  }
}
