import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderDialogData } from '../../../models/AddFolderDialogData';
import { CreateFolderDto } from '../../../models/CreateFolderDto';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.css']
})
export class NewFolderDialogComponent implements OnInit {

  folderName: FormControl = new FormControl('', [Validators.required]);

  dialogTitle: string = "";

  getFolderNameErrors(){

    if(this.folderName.hasError('required')){
      return "You must enter a value !";
    }

    return "";
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FolderDialogData,
    private contentService: ContentService,
    private dialogRef: MatDialogRef<NewFolderDialogComponent>
  ) {
    this.folderName.setValue('New Folder');
    this.dialogTitle = "Create folder in " + data.folderName;
  }

  ngOnInit(): void {
  } 

  createFolder(){

    if(this.folderName.invalid){
      return;
    }

    var folderToCreate = new CreateFolderDto();
    folderToCreate.folderName = this.folderName.value;
    folderToCreate.folderId = this.data.folderId;

    this.contentService.createFolder(folderToCreate);
    
    this.dialogRef.close();
  }

}
