import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilesDto } from '../../../models/FilesDto';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-delete-file',
  templateUrl: './delete-file.component.html',
  styleUrls: ['./delete-file.component.css']
})
export class DeleteFileComponent{

  dialogTitle: string = "";
  files: FilesDto[] = [];
  fileName: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contentService: ContentService,
    private dialogRef: MatDialogRef<DeleteFileComponent>) {

      this.files = data.filesToDelete;

      if(this.files.length == 1){
        this.fileName = this.files[0].fileName;

        if(this.fileName.length > 30)
        {
          this.fileName = this.fileName.slice(0,30) + "...";
        }
      }
      else
      {
        this.fileName = "this selected files";
      }


      this.dialogTitle = "Are you sure you want to delete " + this.fileName + " ?";

  }

  delete(){

    this.contentService.deleteFiles();

    this.dialogRef.close();
  }
}