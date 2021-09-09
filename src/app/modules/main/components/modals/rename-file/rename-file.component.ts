import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderDialogData } from '../../../models/AddFolderDialogData';


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
    @Inject(MAT_DIALOG_DATA) public data: FolderDialogData
  ) {
    this.folderName.setValue('New Folder');
    this.dialogTitle = "Rename " + data.folderName;
    this.fileName = data.folderName;
  }

  ngOnInit(): void {
  } 

  renameFile(){

    if(this.folderName.invalid){
      return;
    }

    //request api to create folder 

  }

}
