import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.css']
})
export class NewFolderDialogComponent implements OnInit {

  folderName: FormControl = new FormControl('', [Validators.required]);

  getFolderNameErrors(){

    if(this.folderName.hasError('required')){
      return "You must enter a value !";
    }

    return "";
  }

  constructor() {
    this.folderName.setValue('New Folder');
  }

  ngOnInit(): void {
  } 

  createFolder(){

    if(this.folderName.invalid){
      return;
    }

    //request api to create folder 

  }

}
