import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { ThemeService } from '../../shared/services/theme.service';

export interface Project {
  title: string;
  description: DescriptionSegment[];
  imageUrl?: string;
  link?: string;
  githubLink?: string; 
}

export type DescriptionSegment = {
  type: 'text';
  content: string;
} | {
  type: 'icon';
  icon: string;
  className: string;
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private svgService = inject(SvgService);
  protected themeService = inject(ThemeService);
  
  projects: Project[] = [
    {
      title: 'Pokedex Angular',
      description: this.getPokedexDescription(),
      imageUrl: 'assets/Pokedex.png',
      link: 'https://pokedex.david-werner.dev/',
      githubLink: 'https://github.com/DavidDev25/Pokedex-Angular'

    },
    {
      title: 'Join',
      description: this.getJoinDescription(),
      imageUrl: 'assets/join.png',
      link: 'LINK_TO_JOIN',
      githubLink: 'https://github.com/DavidDev25/DA-Join'
    },
    {
      title: 'Developer Akademie Portfolio',
      description: this.getDeveloperAkademiePortfolioDescription(),
      imageUrl: 'assets/DAPortfolio.png',
      link: 'LINK_TO_DA_PORTFOLIO',
      githubLink: 'https://github.com/DavidDev25/DA-Join'
    },
    {
      title: 'Aktuelles Portfolio',
      description: this.getActualPortfolioDescription(),
      imageUrl: 'assets/AktuellesPortfolo.png',
      githubLink: 'https://github.com/DavidDev25/DA-Join'
    },
    {
      title: 'News Aggregator',
      description: this.getNewsAggregatorDescription(),
      imageUrl: 'assets/News Aggregator.jpg',
      link: 'LINK_TO_NEWS_AGGREGATOR',
      githubLink: 'https://github.com/DavidDev25/DA-Join'    
    },
  ];

  selectedProject: Project | null = null;
  showModal = false;
  selectedIndex: number = 0;

  openModal(project: Project) {
    this.selectedIndex = this.projects.indexOf(project);
    this.selectedProject = project;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProject = null;
  }

  nextProject() {
    this.selectedIndex = (this.selectedIndex + 1) % this.projects.length;
    this.selectedProject = this.projects[this.selectedIndex];
  }

  previousProject() {
    this.selectedIndex = (this.selectedIndex - 1 + this.projects.length) % this.projects.length;
    this.selectedProject = this.projects[this.selectedIndex];
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (this.showModal && !event.target.closest('.modal-content')) {
      this.closeModal();
    }
  }

  getPokedexDescription(): DescriptionSegment[] {
    return [
      { type: 'text', content: 'Ein interaktiver Pokedex, erstellt mit ' },
      { type: 'icon', icon: 'html', className: 'html-icon' },
      { type: 'text', content: ' HTML, ' },
      { type: 'icon', icon: 'cssIcon', className: 'css-icon' },
      { type: 'text', content: ' CSS, ' },
      { type: 'icon', icon: 'javascript', className: 'javascript-icon' },
      { type: 'text', content: ' JavaScript und einer REST-API. Entdecke Pokemon, ihre Details und mehr!' },
      { type: 'icon', icon: 'restapi', className: 'restapi-icon'} ,
    ];
  }
  
  getJoinDescription(): DescriptionSegment[] {
    return [
      { type: 'text', content: 'Ein kollaboratives Kanban-Board erstellt mit ' },
      { type: 'icon', icon: 'html', className: 'html-icon' },
      { type: 'text', content: ' HTML, ' },
      { type: 'icon', icon: 'scss', className: 'scss-icon' },
      { type: 'text', content: ' CSS, ' },
      { type: 'icon', icon: 'javascript', className: 'javascript-icon' },
      { type: 'text', content: ' JavaScript und ' },
      { type: 'icon', icon: 'fireBase', className: 'fireBase-icon' },
      { type: 'text', content: ' Firebase. Features: Drag & Drop, Benutzerauthentifizierung und Echtzeit-Zusammenarbeit.' }
    ];
  }
  
  getDeveloperAkademiePortfolioDescription(): DescriptionSegment[] {
    return [
      { type: 'text', content: 'Mein Portfolio-Projekt der Developer Akademie, erstellt mit ' },
      { type: 'icon', icon: 'angularIcon', className: 'angular-icon' },
      { type: 'text', content: ' Angular, ' },
      { type: 'icon', icon: 'typeScript', className: 'typescript-icon' },
      { type: 'text', content: ' TypeScript und ' },
      { type: 'icon', icon: 'scss', className: 'scss-icon' },
      { type: 'text', content: ' SCSS. Responsive Design und interaktive Elemente zur Präsentation meiner Fähigkeiten.' }
    ];
  }
  
  getNewsAggregatorDescription(): DescriptionSegment[] {
    return [
      { type: 'text', content: 'Eine News-Aggregator-Anwendung entwickelt mit ' },
      { type: 'icon', icon: 'angularIcon', className: 'angular-icon' },
      { type: 'text', content: ' Angular, ' },
      { type: 'icon', icon: 'typeScript', className: 'typescript-icon' },
      { type: 'text', content: ' TypeScript und ' },
      { type: 'icon', icon: 'scss', className: 'scss-icon' },
      { type: 'text', content: ' SCSS. Sammelt und präsentiert aktuelle Nachrichten von verschiedenen Quellen mit Filterfunktionen.' }
    ];
  }

  getActualPortfolioDescription(): DescriptionSegment[] {
    return [
      { type: 'text', content: 'Mein aktuelles Portfolio, erstellt mit ' },
      { type: 'icon', icon: 'angularIcon', className: 'angular-icon' },
      { type: 'text', content: ' Angular 19, ' },
      { type: 'icon', icon: 'typeScript', className: 'typescript-icon' },
      { type: 'text', content: ' TypeScript und ' },
      { type: 'icon', icon: 'scss', className: 'scss-icon' },
      { type: 'text', content: ' SCSS. Modern, schnell und mit vielen interaktiven Elementen.' }
    ];
  }
  
  getIconSvg(segment: DescriptionSegment): SafeHtml | null {
    if (segment.type === 'icon') {
      return this.svgService.getSVG(segment.icon, segment.className);
    }
    return null;
  }

  getSvgIcon(name: string): SafeHtml {
    return this.svgService.getSVG(name);
  }
}
