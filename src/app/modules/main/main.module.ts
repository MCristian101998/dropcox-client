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
import { UploadDirective } from 'src/app/directives/fileUpload.directive';
import { QuickNavigationComponent } from './components/quick-navigation/quick-navigation.component';
import { NewFolderDialogComponent } from './components/modals/new-folder-dialog/new-folder-dialog.component';
import { NewFolderDialogService } from './services/new-folder-dialog.service';
import { HttpModule } from 'src/app/shared/modules/http.module';
import { QuickNavigationService } from './services/quick-navigation.service';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { ContentService } from './services/content.service';


@NgModule({
  declarations: [
    SidenavComponent,
    MainComponent,
    ToolbarComponent,
    ContentComponent,
    FooterComponent,
    NavigationComponent,
    UploadDirective,
    QuickNavigationComponent,
    NewFolderDialogComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpModule,
  ],
  providers:[
    SidenavSerive,
    UserService,
    NewFolderDialogService,
    QuickNavigationService,
    SnackBarService,
    ContentService
  ]
})
export class MainModule { }
