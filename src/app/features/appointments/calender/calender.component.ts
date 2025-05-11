import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('calendar') calendarComponent: any;

  events = [];
  calendarOptions: CalendarOptions;

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
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.handleEventDrop.bind(this)
    };
  }

  handleDateClick(arg: DateClickArg) {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      width: '800px',
      data: { date: arg.dateStr }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const calendarApi = (document.querySelector('full-calendar') as any)?.getApi?.();
        if (calendarApi) {
          calendarApi.addEvent({
            title: `${result.title} (${result.service})`,
            start: result.start,
            end: result.end,
            extendedProps: {
              description: result.description,
              service: result.service,
              members: result.members,
              trainer: result.trainer
            }
          });
        }
      }
    });
  }

  handleEventClick(arg: EventClickArg) {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      data: { event: arg.event }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        arg.event.setProp('title', `${result.title} (${result.service})`);
        arg.event.setStart(result.start);
        arg.event.setEnd(result.end);
        arg.event.setExtendedProp('description', result.description);
        arg.event.setExtendedProp('service', result.service);
        arg.event.setExtendedProp('members', result.members);
        arg.event.setExtendedProp('trainer', result.trainer);
      }
    });
  }

  handleEventDrop(arg: EventDropArg) {
    console.log('Dropped to:', arg.event.start, arg.event.end);
  }
}
