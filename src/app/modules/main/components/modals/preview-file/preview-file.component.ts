import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.css']
})
export class PreviewFileComponent implements OnInit {

  fileType:string = "";
  fileId:string = "";
  imageFile:any = null;
  videoUrl:any = null;
  filePath:string = '';
  videoFile:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snackBarService: SnackBarService,
    private domSanitizer: DomSanitizer
  ) {
    this.fileType = data.fileType;
    this.fileId = data.fileId;
    this.filePath = data.filePath;
  }

  ngOnInit(): void {

    const reader = new FileReader();
    reader.onload = (e) => this.imageFile = e.target?.result;

    if(this.fileType == 'image'){
      this.http.get<any>(environment.apiBaseUrl + "media/image/" + this.fileId)
        .subscribe({
          next:(resp) =>{

            let obj = 'data:image/png;base64,' + resp;

            this.imageFile = this.domSanitizer.bypassSecurityTrustUrl(obj);
          },
          error:(err) =>{
            console.error(err);
            this.snackBarService.openSnackBar("Something went wrong! Please reload.")
          }
        })
    }
    else if(this.fileType == 'video'){
      this.videoUrl = environment.apiBaseUrl + 'media/video/' + this.filePath;
    }
  }
}