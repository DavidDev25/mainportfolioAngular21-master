import { Component } from '@angular/core';
import { HomeComponent } from "../pages/home/home.component";
import { ProjectsComponent } from "../pages/projects/projects.component";
import { AboutMeComponent } from "../pages/about-me/about-me.component";
import {TestimonialsComponent} from "../pages/testimonials/testimonials.component";
import { SkillsComponent } from "../pages/skills/skills.component";
import { ContactMeComponent } from "../pages/contact-me/contact-me.component";

@Component({
  selector: 'app-landingpage',
  imports: [HomeComponent, AboutMeComponent, SkillsComponent, ProjectsComponent, TestimonialsComponent, ContactMeComponent, ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

}
