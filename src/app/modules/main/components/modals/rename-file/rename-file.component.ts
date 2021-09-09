import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderDialogData } from '../../../models/AddFolderDialogData';
import { RenameFileDto } from '../../../models/RenameFileDto';
import { ContentService } from '../../../services/content.service';


@Component({
  selector: 'app-rename-file',
  templateUrl: './rename-file.component.html',
  styleUrls: ['./rename-file.component.css']
})
export class RenameFileComponent implements OnInit {

  folderName: FormControl = new FormControl('', [Validators.required]);
  dialogTitle: string = "";
  fileName: string = "";

  getFolderNameErrors(){

    if(this.folderName.hasError('required')){
      return "You must enter a value !";
    }

    return "";
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FolderDialogData,
    private dialogRef: MatDialogRef<RenameFileComponent>,
    private contentService: ContentService
  ) {
    this.folderName.setValue(data.folderName);
    this.dialogTitle = "Rename " + data.folderName;
    this.fileName = data.folderName;
  }

  ngOnInit(): void {
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
      fileToRename.id = this.data.folderId;
      fileToRename.newName = this.folderName.value;

      this.contentService.renameFile(fileToRename);

      this.dialogRef.close();
    }
  }
}