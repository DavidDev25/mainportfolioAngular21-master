import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
// import { AboutMeComponent } from './pages/about-me/about-me.component';
// import { SkillsComponent } from './pages/skills/skills.component';
// import { ProjectsComponent } from './pages/projects/projects.component';
// import { ContactMeComponent } from './pages/contact-me/contact-me.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

export const routes: Routes = [
  {path: '', component: LandingpageComponent},
  // { path: 'home', component: HomeComponent },
  // { path: 'about-me', component: AboutMeComponent },
  // { path: 'skills', component: SkillsComponent },
  // { path: 'projects', component: ProjectsComponent },
  // { path: 'contact-me', component: ContactMeComponent },
  { path: '**', redirectTo: '' },
];
export class AppRoutingModule {}
