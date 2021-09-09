import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-delete-file',
  templateUrl: './delete-file.component.html',
  styleUrls: ['./delete-file.component.css']
})
export class DeleteFileComponent{

  dialogTitle: string = "";
  fileId: string = "";


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contentService: ContentService,
    private dialogRef: MatDialogRef<DeleteFileComponent>) {

      this.fileId = data.fileId;
      this.dialogTitle = "Are you sure you want to delete " + this.data.fileName + " ?";

  }

  delete(){

    this.contentService.deleteFile(this.fileId);

    this.dialogRef.close();
  }
}