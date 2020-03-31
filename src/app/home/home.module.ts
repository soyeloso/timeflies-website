import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from 'src/services/api.service';
import { ProjectService } from 'src/services/project.service';
import { TimerService } from 'src/services/timer.service';
import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SettingsComponent } from './settings/settings.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ProjectBlocComponent } from './projects/project-bloc.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    LayoutComponent,
    SettingsComponent,
    NavbarComponent,
    ProjectBlocComponent,
    AccountComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    ProjectService,
    TimerService
  ],

})
export class HomeModule { }
