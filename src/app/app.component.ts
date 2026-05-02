import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent
  ],
  template: `
    <div [class]="themeService.currentTheme">
      <app-navbar />
      <router-outlet />
    </div>
    
    <button (click)="themeService.toggleTheme()" class="theme-toggle">
    @if (themeService.isDarkTheme()) {
    <span class="theme-icon">☀️</span> Light Mode
  } @else {
    <span class="theme-icon">🌙</span> Dark Mode
  }
    </button>
  `
})
export class AppComponent {
  title = 'Portfolio';
  
  // Moderne Dependency Injection mit inject()
  protected themeService = inject(ThemeService);
  
  // Kein toggleTheme mehr in der Komponente, alles im Service!
}
