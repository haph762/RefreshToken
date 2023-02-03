import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-logged-in',
  templateUrl: './not-logged-in.component.html',
  styleUrls: ['./not-logged-in.component.scss']
})
export class NotLoggedInComponent implements OnInit, OnDestroy {

  timeDown: number = 10;
  clear: NodeJS.Timer = {} as NodeJS.Timer;
  constructor(private router: Router) { }
  ngOnDestroy(): void {
    clearInterval(this.clear);
  }

  ngOnInit() {
    this.clear = setInterval(() => {
      this.timeDown--;
      if (this.timeDown === 0)
        this.router.navigate(["/login"]);
    }, 1000);

  }

}
