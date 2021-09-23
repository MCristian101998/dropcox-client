import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { FolderDialogData } from '../../../models/AddFolderDialogData';
import { CreateFolderDto } from '../../../models/CreateFolderDto';
import { CheckFolderNameService } from '../../../services/check-foldername.service';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.css']
})
export class NewFolderDialogComponent{

  folderName: FormControl = new FormControl('', [Validators.required]);

  dialogTitle: string = "";

  getFolderNameErrors(){

    if(this.folderName.hasError('required')){
      return "You must enter a value !";
    }

    if(this.folderName.hasError('nameExists')){

      return "Folder name already exists !";
    }

    return "";
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FolderDialogData,
    private contentService: ContentService,
    private dialogRef: MatDialogRef<NewFolderDialogComponent>,
    private snackBarService: SnackBarService,
    private checkFolderNameService: CheckFolderNameService
  ) {
    this.folderName.setValue('New Folder');
    this.dialogTitle = "Create folder";
  }

  folerNameChanged(event: any){
    var folderName:string = event.target.value;

    if(folderName === "") { return }

    this.checkFolderNameService.checkName(this.contentService.currentFolderId,folderName)
      .subscribe({
        next : (resp) => {

          if(resp == true){
            this.folderName.setErrors({'nameExists' : resp});
          }
          else
          {
            this.folderName.setErrors({'nameExists' : null})
            this.folderName.updateValueAndValidity();
          }
        },
        error: (err) =>{
          console.error(err);
          this.snackBarService.openSnackBar("Something went wrong. Please reload !");
        }
      })
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
