import { Component, OnInit, HostListener } from '@angular/core';
import { SessionService } from 'src/app/shared/services/sesion/session.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  showRightImage: boolean = false;
  hoverSection: string = ''; 
  activeSection: string = ''; 
  sections: { name: string, icon: string }[] = [
    { name: 'home', icon: 'home' },  
    { name: 'estadisticas', icon: 'bar_chart' },
    { name: 'preguntas', icon: 'help_outline' }
  ]; 

  constructor(private sessionService: SessionService, private router: Router) {} 

  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.isLoggedIn();
    console.log("🚀 ~ HomeComponent ~ ngOnInit ~ isLoggedIn:", this.isLoggedIn);
  }

  planetAnimationPath = '../../../../assets/lottie/planetAnimation.json';

  scrollToSection(sectionName: string): void {
    const section = document.getElementById(sectionName);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sectionsPositions = {
      home: document.getElementById('home')?.getBoundingClientRect(),
      estadisticas: document.getElementById('estadisticas')?.getBoundingClientRect(),
      preguntas: document.getElementById('preguntas')?.getBoundingClientRect(),
    };

    const windowHeight = window.innerHeight;

    if (sectionsPositions.home && sectionsPositions.home.top <= windowHeight / 2 && sectionsPositions.home.bottom >= windowHeight / 2) {
      this.activeSection = 'home';
    } else if (sectionsPositions.estadisticas && sectionsPositions.estadisticas.top <= windowHeight / 2 && sectionsPositions.estadisticas.bottom >= windowHeight / 2) {
      this.activeSection = 'estadisticas';
    } else if (sectionsPositions.preguntas && sectionsPositions.preguntas.top <= windowHeight / 2 && sectionsPositions.preguntas.bottom >= windowHeight / 2) {
      this.activeSection = 'preguntas';
    } else {
      this.activeSection = '';
    }

    const faqSection = document.getElementById('preguntas');
    const faqPosition = faqSection?.getBoundingClientRect();

    if (faqPosition && faqPosition.top <= windowHeight && faqPosition.bottom >= 0) {
      this.showRightImage = true;
    } else {
      this.showRightImage = false;
    }
  }

  navigateToQuestions(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/register']);
    } else {
      this.router.navigate(['/questions']);
    }
  }
}
