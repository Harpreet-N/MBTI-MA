import {Component} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {JoinEventDialogComponent} from './join-event-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {EventModel} from '../../model/event.model';
import {NgForOf, NgIf} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-event',
  imports: [
    MatCheckbox,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatButton,
    MatIconButton,
    MatCardImage,
    NgForOf,
    NgIf,
    MatChipsModule,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption
  ],
  templateUrl: './event.component.html',
  standalone: true,
  styleUrl: './event.component.css'
})
export class EventComponent {
  allEvents: EventModel[] = [
    {
      id: 1,
      title: 'Silent Wave Concert',
      type: ['External', 'Thinking'],
      date: '2024-04-15',
      time: '18:00',
      location: 'Virtual Concert Hall',
      image: 'assets/event/concert.jpg',
      owner: 'John Doe',
      interested: 10,
      joined: 150,
      description: 'Join us for a night of live music and waves of sound at the Silent Wave Concert. Experience the best in electronic and ambient music in a virtual space.',
      avatar: 'assets/avatar/amyelsner.png',
    },
    {
      id: 2,
      title: 'Colorful Music Festival',
      type: ['Internal', 'Sensing'],
      date: '2024-05-05',
      time: '20:00',
      location: 'Berlin Open Air Stage',
      image: 'assets/event/music.jpg',
      owner: 'Jane Smith',
      interested: 8,
      joined: 50,
      description: 'Immerse yourself in a vibrant celebration of music and colors! The Colorful Music Festival brings together artists and audiences for an unforgettable sensory experience.',
      avatar: 'assets/avatar/asiyajavayant.png',
    },
    {
      id: 3,
      title: 'Pottery Workshop',
      type: ['Internal', 'Sensing'],
      date: '2024-06-10',
      time: '14:00',
      location: 'Art Studio, Munich',
      image: 'assets/event/potery.png',
      owner: 'Emily Brown',
      interested: 5,
      joined: 25,
      description: 'Get hands-on experience with clay at our Pottery Workshop. Learn basic techniques and create your own ceramic masterpiece in this creative and relaxing environment.',
      avatar: 'assets/avatar/xuxuefeng.png',
    }
  ];

  mbtiOptions: string[] = ['External', 'Internal', 'Intuition', 'Sensing', 'Thinking', 'Feeling', 'Judging', 'Perceiving'];
  selectedFilters: string[] = [];


  filteredEvents: EventModel[] = [...this.allEvents];
  selectedEvent: EventModel | null = null;

  constructor(private dialog: MatDialog, private router: Router) {
  }


  applyFilters(): void {
    if (this.selectedFilters.length === 0) {
      this.filteredEvents = [...this.allEvents];
    } else {
      this.filteredEvents = this.allEvents.filter(event =>
        event.type.some(type => this.selectedFilters.includes(type))
      );
    }
  }


  selectEvent(event: EventModel): void {
    this.selectedEvent = event;
  }

  joinEvent(): void {
    const dialogRef = this.dialog.open(JoinEventDialogComponent, {
      width: '300px',
      data: {event: this.selectedEvent}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'joined') {
        // 1. Load existing events from session storage (or initialize an empty array)
        const storedEvents = JSON.parse(sessionStorage.getItem('joinedEvents') || '[]');

        // 2. Add the newly joined event (if not already in the list)
        const eventExists = storedEvents.find((e: any) => e.title === this.selectedEvent?.title);
        if (!eventExists && this.selectedEvent) {
          storedEvents.push(this.selectedEvent);
          sessionStorage.setItem('joinedEvents', JSON.stringify(storedEvents));
        }

        // 3. Navigate to profile (or handle as you need)
        this.router.navigate(['/profile']);
      }
    });
  }

  addToWatchlist() {

  }
}
