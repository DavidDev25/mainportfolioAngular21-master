import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../svg.service';
import { SafeHtml } from '@angular/platform-browser'; 
import { ThemeService } from '../../shared/services/theme.service';
import { DownloadService } from '../../shared/services/download.service';
import { ScrollService } from '../../shared/services/scroll.service';

interface SocialLink {
  name: string;
  url: string;
  iconName?: string;
}

interface DownloadLabel {
  name: string;
  url: string;
  fileName: string;
}

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private svgService = inject(SvgService);
  protected themeService = inject(ThemeService);
  private downloadService = inject(DownloadService); 
  private scrollService = inject(ScrollService);
  
  isDownloadDropdownOpen = false;
  notice = 'Diese Seite ist aktuell im Aufbau. Einige Links sind noch nicht funktionsfähig. Die Responsiveansicht ist bis zum 30.04.2025 Verfügbar';
  title = 'David Werner';
  subtitle = 'Junior Web Developer';
  description = 'Mit Leidenschaft für Frontend-Entwicklung bringe ich digitale Ideen zum Leben';
  profileImage = 'assets/Profilfoto.jpg';

  socialLinks: SocialLink[] = [
    { name: 'Github', url: 'https://github.com/DavidDev25', iconName: 'Github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/david-werner-01a88032a/', iconName: 'LinkedIn' }
  ];
  
  downloadLabels: DownloadLabel[] = [
    { 
      name: 'Lebenslauf PDF', 
      url: 'assets/downloads/Lebenslauf_David_Werner.pdf',
      fileName: 'Lebenslauf_David_Werner.pdf' 
    },
    { 
      name: 'Lebenslauf Word', 
      url: 'assets/downloads/Lebenslauf_David_Werner.docx',
      fileName: 'Lebenslauf_David_Werner.docx' 
    }
  ];
  
  toggleDownloadDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isDownloadDropdownOpen = !this.isDownloadDropdownOpen;
  }
  
  getSvgIcon(iconName: string): SafeHtml {
    return this.svgService.getSVG(iconName);
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownElement = target.closest('.dropdown-container');
    
    if (!dropdownElement && this.isDownloadDropdownOpen) {
      this.isDownloadDropdownOpen = false;
    }
  }

  downloadFile(event: Event, item: DownloadLabel): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.downloadService.downloadFile(item.fileName, item.url);

    this.isDownloadDropdownOpen = false;
  }

  scrollToContact(event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection('contact-me');
  }
}
