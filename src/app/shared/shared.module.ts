import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScrollService } from './services/scroll.service';

@NgModule({
  imports: [CommonModule, NavbarComponent],
  exports: [NavbarComponent],
  providers: [ScrollService]
})
export class SharedModule {}
