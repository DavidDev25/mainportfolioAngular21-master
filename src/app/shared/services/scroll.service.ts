import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private currentSection = new BehaviorSubject<string>('home');
  activeSection$ = this.currentSection.asObservable();

  private observer: IntersectionObserver | null = null;
  private isManuallySet = false;
  private manualTimeout: any = null;

  constructor(private ngZone: NgZone) {}

  setActiveSection(sectionId: string): void {
    this.ngZone.run(() => {
      this.isManuallySet = true;
      this.currentSection.next(sectionId);
      
      if (this.manualTimeout) {
        clearTimeout(this.manualTimeout);
      }
      
      this.manualTimeout = setTimeout(() => {
        this.isManuallySet = false;
      }, 1500);
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.setActiveSection(sectionId);
    }
  }

  initScrollObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -65% 0px',
      threshold: [0, 0.1, 0.2, 0.5]
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.isManuallySet) return;
      
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        const sortedEntries = visibleEntries.sort((a, b) => 
          b.intersectionRatio - a.intersectionRatio
        );
        
        const bestVisibleSection = sortedEntries[0].target.id;
        this.ngZone.run(() => {
          this.currentSection.next(bestVisibleSection);
        });
      }
    }, observerOptions);


    if (this.observer) {
      sections.forEach(section => {
        this.observer!.observe(section);
      });
    }
  }
}