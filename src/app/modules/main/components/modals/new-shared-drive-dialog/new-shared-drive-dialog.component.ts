import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-new-shared-drive-dialog',
  templateUrl: './new-shared-drive-dialog.component.html',
  styleUrls: ['./new-shared-drive-dialog.component.css']
})
export class NewSharedDriveDialogComponent{

  sharedFolderName = new FormControl('',[Validators.required]);

  constructor(
    private contentService: ContentService,
    private dialogRef: MatDialogRef<NewSharedDriveDialogComponent>,
  ) { }

  sharedFolderNameChanged(event: any){

  }

  getSharedFolderNameErrors(){
    if(this.sharedFolderName.hasError('required')){
      return "You must enter a value";
    }

    return "";
  }

  saveDialog(){
    if(this.sharedFolderName.invalid){
      return;
    }

    this.contentService.createSharedDrive(this.sharedFolderName.value);
    
    this.dialogRef.close();
  }
}
