import { Component, inject, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../shared/services/theme.service';
import { SvgService } from '../../svg.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('sliderTrack') sliderTrack!: ElementRef;
  
  private svgService = inject(SvgService);
  protected themeService = inject(ThemeService);

  icons = ['html', 'cssIcon', 'javascript', 'typeScript', 'angularIcon', 'fireBase', 'nodeJS', 'php', 'restapi', 'git', 'scss','scrum']; 
  displayIcons: string[] = [];

  motivationText = `Meine technologische Reise begann mit der Faszination, wie moderne Webanwendungen funktionieren und was hinter den Kulissen geschieht. Bei der Developer Akademie hatte ich die Gelegenheit, einen umfassenden Skillset zu erwerben, der mich befähigt, komplexe und ansprechende digitale Erlebnisse zu schaffen.

  Angular bildet das Rückgrat meines Frontend-Entwicklungs-Stacks, ergänzt durch fundierte Kenntnisse in HTML, CSS und JavaScript. Diese Grundlagentechnologien ermöglichen es mir, responsive und benutzerfreundliche Interfaces zu gestalten. TypeScript fügt eine zusätzliche Schicht der Typsicherheit hinzu, die die Codequalität und Wartbarkeit erheblich verbessert.

  Die Beherrschung von Git für Versionskontrolle und SCRUM für agile Projektmanagementmethoden rundet mein Profil ab.

  Was mich besonders an diesem Technologie-Stack begeistert, ist die Vielseitigkeit und die Möglichkeit, innovative Ideen schnell in funktionsfähige Produkte umzusetzen. Jedes neue Projekt ist eine Gelegenheit, diese Fähigkeiten zu vertiefen und neue Techniken zu erlernen, was meine Leidenschaft für kontinuierliches Lernen und Problemlösen nährt.`;

  ngOnInit(): void {

    this.displayIcons = [...this.icons, ...this.icons, ...this.icons];
  }

  ngAfterViewInit(): void {
  
    document.documentElement.style.setProperty('--icon-count', String(this.icons.length));
  }

  getSvgIcon(iconName: string): SafeHtml {
    return this.svgService.getSVG(iconName);
  }
}
