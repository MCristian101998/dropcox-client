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
import { DialogService } from './services/dialog.service';
import { HttpModule } from 'src/app/shared/modules/http.module';
import { QuickNavigationService } from './services/quick-navigation.service';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { ContentService } from './services/content.service';
import { RenameFileComponent } from './components/modals/rename-file/rename-file.component';


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
    RenameFileComponent,
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
    DialogService,
    QuickNavigationService,
    SnackBarService,
    ContentService
  ]
})
export class MainModule { }
