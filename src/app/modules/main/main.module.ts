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
import { DeleteFileComponent } from './components/modals/delete-file/delete-file.component';
import { CheckFolderNameService } from './services/check-foldername.service';
import { NewSharedDriveDialogComponent } from './components/modals/new-shared-drive-dialog/new-shared-drive-dialog.component';
import { ManageAccessInSharedDriveComponent } from './components/modals/manage-access-in-shared-drive/manage-access-in-shared-drive.component';
import { SharedFolderService } from './services/shared-folder.service';
import { DeleteUserDilaogComponent } from './components/modals/delete-user-dilaog/delete-user-dilaog.component';
import { FileTypeService } from './services/file-type.service';
import { SearchService } from './services/search.service';
import { PreviewFileComponent } from './components/modals/preview-file/preview-file.component';
import { RenameSharedDirectoriesComponent } from './components/modals/rename-shared-directories/rename-shared-directories.component';


@NgModule({
  declarations: [
    SidenavComponent,
    MainComponent,
    ToolbarComponent,
    ContentComponent,
    NavigationComponent,
    UploadDirective,
    QuickNavigationComponent,
    NewFolderDialogComponent,
    RenameFileComponent,
    DeleteFileComponent,
    NewSharedDriveDialogComponent,
    ManageAccessInSharedDriveComponent,
    DeleteUserDilaogComponent,
    PreviewFileComponent,
    RenameSharedDirectoriesComponent,
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
    ContentService,
    CheckFolderNameService,
    UserService,
    SharedFolderService,
    FileTypeService,
    SearchService
  ]
})
export class MainModule { }
