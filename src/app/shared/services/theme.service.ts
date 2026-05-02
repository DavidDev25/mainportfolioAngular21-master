import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export type ThemeType = 'blue-gradient' | 'dark-gradient';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<ThemeType>('dark-gradient');
  
  readonly theme$ = toObservable(this.themeSignal);
  
  get currentTheme() {
    return this.themeSignal()
  }
  
  toggleTheme() {
    this.themeSignal.update(current => 
      current === 'blue-gradient' ? 'dark-gradient' : 'blue-gradient');
  }
  
  setTheme(theme: ThemeType) {
    this.themeSignal.set(theme);
  }
  

  isDarkTheme() {
    return this.currentTheme === 'dark-gradient';
  }
}