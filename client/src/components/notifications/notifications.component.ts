import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: any;
  unread: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.notifications = this.appService.notifications; // Access the shared data
    this.unread = this.appService.unread
  }

  //const notifList = document.getElementById('notifList')
  //const unreadCount = document.getElementById("unreadCount")
  //if (unreadCount.innerText > 0) unreadCount.style.display = 'block'
  //updateNotifBorder()

  getNotificationMessage(type: string) {
    const messages: { [key: string]: string } = {
      review: 'has left a review about your class',
      booking: 'has booked a class with you',
      message: 'has sent you a message',
      clone: 'has cloned one of your decks',
      'cancel-teacher': 'has cancelled your class',
      'cancel-student': 'has cancelled your class',
      'reschedule-teacher-pending': 'has requested to reschedule your class',
      'reschedule-student-pending': 'has requested to reschedule your class',
      'reschedule-teacher-accept': 'has accepted your reschedule request',
      'reschedule-student-accept': 'has accepted your reschedule request',
      'reschedule-teacher-decline': 'has declined your reschedule request',
      'reschedule-student-decline': 'has declined your reschedule request',
    };

    return messages[type] || '';
  }

  createNotif(notifData: any) {
      this.notifications.unshift(notifData)
      this.unread ++
      this.updateNotifBorder()
  }

  async readNotif(notifId: string, type: string) {
      let redirectUrl
      switch(type) {
          case 'message': redirectUrl = '/account/inbox' ;break
          case 'review': redirectUrl = '/account/reviews' ;break
          case 'clone': redirectUrl = '/account/decks' ;break
          case 'booking':
          case 'cancel-student':
          case "reschedule-student-accept":
          case "reschedule-student-decline":
          case "reschedule-student-pending": redirectUrl = '/account/calendar' ;break
          case 'cancel-teacher': 
          case "reschedule-teacher-accept":
          case "reschedule-teacher-decline":
          case "reschedule-teacher-pending": redirectUrl = '/account/classes' ;break
      }
      const response = await fetch('/notification/read', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notifId }),
      });
      if (response.ok) window.location.href = `${redirectUrl}`;
  }

  async deleteNotif(notifId: string, event: Event) {
      event.stopPropagation();
      await fetch('/notification/delete', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notifId }),
      });
  }

  updateNotifBorder() {
      //[...notifList.children].forEach(el => {
      //    if (el != notifList.lastElementChild) el.style.borderBottom = "solid 0.8px rgb(222, 226, 230)"
      //})
  }
}
