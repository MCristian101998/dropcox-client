import { Component, OnInit } from '@angular/core';
import { FolderDialogData } from '../../models/AddFolderDialogData';
import { ContentService } from '../../services/content.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
  }

  openDialog(){

    var dialogData = new FolderDialogData();
    dialogData.folderId = this.contentService.currentFolderId;
    dialogData.folderName = this.contentService.currentFolderName;

    this.dialogService.openNewFolderDialog(dialogData);
  }
}