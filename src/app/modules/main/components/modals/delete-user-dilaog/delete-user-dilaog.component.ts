import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { SharedFolderService } from '../../../services/shared-folder.service';

@Component({
  selector: 'app-delete-user-dilaog',
  templateUrl: './delete-user-dilaog.component.html',
  styleUrls: ['./delete-user-dilaog.component.css']
})
export class DeleteUserDilaogComponent implements OnInit {

  sharedFolderId:string = "";
  userName:String = "";
  userId: string = "";
  dialogTitle: string = "Are you sure you want to remove";

  constructor(
    private sharedFolderService: SharedFolderService,
    private dialogRef: MatDialogRef<DeleteUserDilaogComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.sharedFolderId = data.sharedFolderId;
    this.userName = data.userName;
    this.userId = data.userId;

    this.dialogTitle = "Are you sure you want to remove user " + this.userName + " ?";
   }

  ngOnInit(): void {
  }

  delete(){
    this.sharedFolderService.deteleUserFromShared(this.sharedFolderId, this.userId)
      .subscribe({
        next: (resp) =>{},
        error: (err) =>{
          console.error(err);
          this.snackBarService.openSnackBar("Something went wrong ! Please reload.");
        }
      }).add(() => {
        this.dialogRef.close("Deleted");
      })
  }
}
