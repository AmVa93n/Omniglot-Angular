import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { flipDayAndYear, stylizeText, getIcon, formatDate, getLanguageName } from '../../utils';

@Component({
  selector: 'app-classes',
  imports: [CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit {
  user: any;
  classes: any
  timeslots: string[] = this.generateTimeslots()
  stylizeText = stylizeText
  getIcon = getIcon
  formatDate = formatDate
  getLanguageName = getLanguageName

  constructor(private accountService: AccountService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.classes = await this.accountService.getClasses(); // Update the user when it's available
    } catch (error) {
      alert(error)
    }
    this.authService.user$.subscribe((user) => {
      this.user = user; // Update the user when it's available
    });
  }

  /*

  $(document).ready(function(){
        // Calculate start date (1 day from today)
        var today = new Date();
        var startDate = new Date(today);
        startDate.setDate(today.getDate() + 1);

        // Calculate end date (3 months from today)
        var endDate = new Date(today);
        endDate.setMonth(today.getMonth() + 3);
        
        $('#datepicker').datepicker({
            format: 'dd-mm-yyyy', // Format of the date
            startDate: flipDayAndYear(startDate), // Start date
            endDate: flipDayAndYear(endDate),   // End date
            autoclose: true, // Close datepicker after selection
            todayHighlight: false, // Highlight today's date
            weekStart: 1, // Start the week on Monday
        });
    });

    */

    generateTimeslots() {
      const timeslots = []
      for (let hr = 7; hr < 21; hr++) {
        for (let min of [0,15,30,45]) {
          const hour = hr.toString().padStart(2, '0')
          const minute = min.toString().padStart(2, '0')
          const slot = `${hour}:${minute}`;
          timeslots.push(slot);
        }
      }
      return timeslots
    }

    pickNewDate(classId: string, currentDate: string, currentTimeslot: string) {
      //document.getElementById("reschedule").action = `/account/classes/${classId}/reschedule`
      //document.getElementById("datepicker").value = flipDayAndYear(new Date(currentDate));
      //[...timeslots.children].forEach(option => {
      //  if (option.value == currentTimeslot) option.setAttribute('selected',true)
      //});
    }

}
