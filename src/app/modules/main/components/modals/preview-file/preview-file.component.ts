import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {
    this.fileType = data.fileType;
    this.fileId = data.fileId;
  }

  ngOnInit(): void {
    if(this.fileType == 'image'){
      this.http.get<any>(environment.apiBaseUrl + "media/image/" + this.fileId)
        .subscribe({
          next:(resp) =>{
            this.imageFile = resp;
          },
          error:(err) =>{
            console.error(err);
            this.snackBarService.openSnackBar("Something went wrong! Please reload.")
          }
        })
    }


  }

}
