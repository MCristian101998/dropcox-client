import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  path: string = "";
  hasParent: boolean = false;
  parentId: string = "";
  isShared: boolean = false;
  currentUserIsOwner: boolean = false;

  constructor(
    private contentService: ContentService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {

    this.contentService.navigatedToDirectory.subscribe((data) => {

      this.path = this.contentService.currentFolderPath;
      

      this.hasParent = this.contentService.currentFolderHasParent;
      this.parentId = this.contentService.currentFolderParentId;
      this.isShared = this.contentService.currentFolderIsShared;
      this.currentUserIsOwner = this.contentService.currentFolderIsOwnedByCurrentUser;
    });
  }

  navigateToParent(){

    this.contentService.navigateToFolder(this.parentId);
  }

  openManageFolderAccess(){
    this.dialogService.openManageSharedFolderAccess();
  }
}