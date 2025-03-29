import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventModel} from '../../model/event.model';
import {JoinEventDialogComponent} from './join-event-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckbox,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    NgForOf,
    NgIf,
    MatIconButton
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
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
  isJoined: boolean = false;

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check for event ID in route params
    this.route.params.subscribe(params => {
      if (params['id']) {
        const eventId = Number(params['id']);
        const event = this.allEvents.find(e => e.id === eventId);
        if (event) {
          this.selectedEvent = event;
          this.checkIfJoined();
        }
      }
    });

    // Check for event title in query params (for navigation from profile)
    this.route.queryParams.subscribe(params => {
      if (params['title']) {
        const event = this.allEvents.find(e => e.title === params['title']);
        if (event) {
          this.selectedEvent = event;
          this.checkIfJoined();
        }
      }
    });
  }

  private checkIfJoined(): void {
    if (!this.selectedEvent) return;
    
    const joinedEvents = JSON.parse(sessionStorage.getItem('joinedEvents') || '[]');
    this.isJoined = joinedEvents.some((event: EventModel) => event.id === this.selectedEvent?.id);
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
    this.router.navigate(['/event', event.id]);
  }

  goBack(): void {
    if (this.route.snapshot.queryParams['title']) {
      // If we came from profile, go back to profile
      this.router.navigate(['/profile']);
    } else {
      // Otherwise, go back to event list
      this.router.navigate(['/event']);
    }
  }

  joinEvent(): void {
    if (this.isJoined) return;

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
          this.isJoined = true;
        }

        // 3. Navigate to profile (or handle as you need)
        this.router.navigate(['/profile']);
      }
    });
  }

  addToWatchlist() {

  }
}
