import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { FolderDialogData } from '../../../models/AddFolderDialogData';
import { RenameFileDto } from '../../../models/RenameFileDto';
import { CheckFolderNameService } from '../../../services/check-foldername.service';
import { ContentService } from '../../../services/content.service';
import { RenameFileComponent } from '../rename-file/rename-file.component';

@Component({
  selector: 'app-rename-shared-directories',
  templateUrl: './rename-shared-directories.component.html',
  styleUrls: ['./rename-shared-directories.component.css']
})
export class RenameSharedDirectoriesComponent implements OnInit {

  folderName: FormControl = new FormControl('', [Validators.required]);
  dialogTitle: string = "";
  fileName: string = "";

  getFolderNameErrors(){

    if(this.folderName.hasError('required')){
      return "You must enter a value !";
    }

    if(this.folderName.hasError('nameExists')){

      return "Folder name already exists !";
    }

    return "";
  }

  constructor( @Inject(MAT_DIALOG_DATA) public data: FolderDialogData,
  private dialogRef: MatDialogRef<RenameFileComponent>,
  private contentService: ContentService,
  private checkFolderNameService: CheckFolderNameService,
  private snackBarService: SnackBarService,) { 

    this.folderName.setValue(data.folderName);
    this.dialogTitle = "Rename ";
    this.fileName = data.folderName;
  }

  ngOnInit(): void {
  }

  folerNameChanged(event: any){

    var folderName:string = event.target.value;

    if(this.folderName.value === this.fileName) { return; }
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

  renameFile(){

    if(this.folderName.invalid){

      return;
    }

    if(this.folderName.value == this.fileName)
    {
      this.dialogRef.close();
    }
    else{

      var fileToRename = new RenameFileDto();
      fileToRename.folderId = this.data.folderId;
      fileToRename.newName = this.folderName.value;

      this.contentService.renameSharedDirectory(fileToRename);

      this.dialogRef.close();
    }
  }
}
