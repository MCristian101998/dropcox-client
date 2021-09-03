import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainComponent } from './main.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SidenavSerive } from './services/sidenav.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserService } from 'src/app/shared/services/user.service';


@NgModule({
  declarations: [
    SidenavComponent,
    MainComponent,
    ToolbarComponent,
    ContentComponent,
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers:[
    SidenavSerive,
    UserService
  ]
})
export class MainModule { }
