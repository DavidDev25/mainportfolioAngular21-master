import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeService } from '../../shared/services/theme.service';
import { SvgService } from '../../svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements OnInit {
  protected themeService = inject(ThemeService);
  private formBuilder = inject(FormBuilder);
  private svgService = inject(SvgService);
  private sanitizer = inject(DomSanitizer);
  private http = inject(HttpClient);
  
  title = 'Kontakt';
  emailText = 'Hast du Fragen oder Interesse an einer Zusammenarbeit? Ich freue mich auf deine Nachricht!';
  emailAddress = 'david.werner@david-werner.dev';
  
  showLocation = true;
  locationText = 'Standortbasierte Zusammenarbeit möglich in:';
  location = 'Weißenburg, Bayern';
  
  nameLabelText = 'Name';
  emailLabelText = 'Email';
  subjectLabelText = 'Betreff';
  messageLabelText = 'Nachricht';
  submitButtonText = 'Nachricht senden';
  
  nameErrorText = 'Bitte gib deinen Namen ein';
  emailRequiredErrorText = 'Bitte gib deine Email-Adresse ein';
  emailInvalidErrorText = 'Bitte gib eine gültige Email-Adresse ein';
  subjectErrorText = 'Bitte gib einen Betreff ein';
  messageErrorText = 'Bitte gib eine Nachricht ein';
  successMessageText = 'Deine Nachricht wurde erfolgreich gesendet!';
  
  contactForm!: FormGroup;
  submitted = false;
  loading = false;
  submitSuccess = false;
  
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  get f() { return this.contactForm.controls; }
  
  getSvgIcon(name: string): SafeHtml {
    return this.svgService.getSVG(name, `contact-me__${name.toLowerCase()}-icon`);
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const apiUrl = '/sendMail.php';
    
    this.http.post(apiUrl, this.contactForm.value)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          if (response.success) {
            this.submitSuccess = true;
            this.contactForm.reset();
            this.submitted = false;
          } else {
            console.error('Fehler beim Senden:', response.message);
          }
        },
        error: (error) => {
          this.loading = false;
          console.error('Fehler beim Senden der Anfrage:', error);
        }
      });
  }
}
