import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';



@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})

export class AboutMeComponent {

  protected themeService = inject(ThemeService);
  
      title = 'Über mich';
      primaryText = 'Ich bin David Werner, ein leidenschaftlicher Webentwickler mit einem starken Fokus auf Frontend-Technologien.';
      secondaryText = 'Ich bin Wohnhaft in Nürnberg, bin Lernbereit, 27 Jahre Jung und liebe es neue Technologien zu erlernen und mich einzuarbeiten.';
      description = 'Zu meinen Skillset gehören unter anderem Angular,React, TypeScript, JavaScript, HTML, CSS und SCSS. Ich habe Erfahrung in der Entwicklung von responsiven Webanwendungen und der Implementierung von Benutzeroberflächen.';
      knowledge = 'Dieser Skillset wurde mir in einer Weiterbildung zum Frontend Developer beigebracht. Die Weiterbildung wurde bei der Developer Akademie durchgeführt, diese bestande ich auch nach 6 Monaten mit Erfolg.';
    }
