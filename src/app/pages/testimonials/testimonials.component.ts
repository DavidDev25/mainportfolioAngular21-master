import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../shared/services/theme.service';
import { SvgService } from '../../svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  protected themeService = inject(ThemeService);
  private svgService = inject(SvgService);
  private sanitizer = inject(DomSanitizer);
  
  title = 'Testimonials';
  subtitle = 'Was andere über mich sagen';
  
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Max Mustermann',
      position: 'Projektmanager',
      company: 'TechFirma GmbH',
      content: 'David hat hervorragende Arbeit bei unserem Webprojekt geleistet. Seine technischen Fähigkeiten und sein Engagement waren beeindruckend.'
    },
    {
      id: 2,
      name: 'Anna Schmidt',
      position: 'CTO',
      company: 'Startup Solutions',
      content: 'Die Zusammenarbeit mit David war außergewöhnlich produktiv. Er bringt nicht nur technisches Know-how mit, sondern auch kreative Lösungsansätze.'
    },
    {
      id: 3,
      name: 'Johannes Weber',
      position: 'Geschäftsführer',
      company: 'Digital Marketing',
      content: 'Davids Fähigkeit, komplexe Anforderungen zu verstehen und in eleganten Code umzusetzen, hat unsere Erwartungen übertroffen.'
    }
    // Füge hier deine weiteren Testimonials hinzu
  ];
  
  currentIndex = 0;
  
  getSvgIcon(name: string): SafeHtml {
    return this.svgService.getSVG(name, `testimonials__${name.toLowerCase()}-icon`);
  }
  
  prevTestimonial(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
  
  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }
  
  goToTestimonial(index: number): void {
    this.currentIndex = index;
  }
}
