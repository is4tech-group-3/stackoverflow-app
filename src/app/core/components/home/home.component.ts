import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/services/sesion/session.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.isLoggedIn();
    console.log("🚀 ~ HomeComponent ~ ngOnInit ~ isLoggedIn:", this.isLoggedIn)
  }

  planetAnimationPath = '../../../../assets/lottie/planetAnimation.json';
}
