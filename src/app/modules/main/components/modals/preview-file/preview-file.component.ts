import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.css']
})
export class PreviewFileComponent implements OnInit {

  fileType:string = "";
  fileId:string = "";
  filePath:string = '';
  videoFile:any;
  username!: string;
  contentPath!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snackBarService: SnackBarService,
    private domSanitizer: DomSanitizer,
    private userService: UserService,
    private dialogRef: MatDialogRef<PreviewFileComponent>
  ) {
    this.fileType = data.fileType;
    this.fileId = data.fileId;
    this.filePath = data.filePath;
  }

  ngOnInit(): void {
    this.contentPath = environment.apiBaseUrl + "media/image" + this.filePath;
  }

  closeModal(){
    this.dialogRef.close();
  }
}