import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { AddUserToSharedFolderDto } from '../../../models/AddUserToSharedFolderDto';
import { SharedFolderUsersDto } from '../../../models/SharedFolderUsersDto';
import { ContentService } from '../../../services/content.service';
import { SharedFolderService } from '../../../services/shared-folder.service';
import { DeleteUserDilaogComponent } from '../delete-user-dilaog/delete-user-dilaog.component';

@Component({
  selector: 'app-manage-access-in-shared-drive',
  templateUrl: './manage-access-in-shared-drive.component.html',
  styleUrls: ['./manage-access-in-shared-drive.component.css']
})
export class ManageAccessInSharedDriveComponent implements OnInit {

  usersWithAccess: SharedFolderUsersDto[] = [];
  usersWithoutAccess: SharedFolderUsersDto[] = [];
  usersToAdd: AddUserToSharedFolderDto[] = [];

  currentSharedFolderId!: string;
  isInAddMode:boolean = false;
  
  usersToAddControl = new FormControl("", [Validators.required]);

  getUsersToAddControlErrors()
  {
    if(this.usersToAddControl.hasError('required')){
      return "You must select at least a user !";
    }
    return "";
  }

  constructor(
    private sharedFolderService: SharedFolderService,
    private contentService: ContentService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<ManageAccessInSharedDriveComponent>,
    private matDialog: MatDialog
  ) { 

    this.currentSharedFolderId = this.contentService.currentFolderId;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.sharedFolderService.getSharedFoldersUsersWithAccess(this.currentSharedFolderId)
    .subscribe({
      next: (resp) => {
        this.usersWithAccess = resp;
      },
      error: (err) => {
        console.error(err);
        this.snackBarService.openSnackBar("Something went wrong ! Please reload.");
      }
    })

  this.sharedFolderService.getSharedFolderUsersWithoutAccess(this.currentSharedFolderId)
    .subscribe({
      next: (resp) => {
        this.usersWithoutAccess = resp;
      },
      error: (err) => {
        console.error(err);
        this.snackBarService.openSnackBar("Something went wrong ! Please reload.");
      }
    })
  }

  change(event: any){
    if(event.isUserInput){
      if(event.source.selected){
        var objToAdd = new AddUserToSharedFolderDto();
        objToAdd.userId = event.source.value.id;
        this.usersToAdd.push(objToAdd);
      }
      else{
        this.usersToAdd = this.usersToAdd.filter(s => {
          return s.userId != event.source.value.id
        })
      }
    }
  }

  saveUsers(){
    if(this.usersToAddControl.invalid){
      return;
    }

    this.sharedFolderService.addUserToFolder(this.currentSharedFolderId, this.usersToAdd)
      .subscribe()
      .add(() => {
        this.loadData();
        this.isInAddMode = false;
      });
  }

  goToAddUser(){
    this.isInAddMode = true;
    this.usersToAdd = [];
  }

  goToUsersList(){
    this.isInAddMode = false;
  }

  removeUserAccess(user: SharedFolderUsersDto){

    const dialogRef = this.matDialog.open(DeleteUserDilaogComponent,{
      data: {
        sharedFolderId: this.currentSharedFolderId,
        userName: user.username,
        userId: user.id
      }
    });

    dialogRef.afterClosed()
      .subscribe(resp => {
        if(resp){
          this.loadData();
        }
    })
  }

  close(){
    this.dialogRef.close();
  }
}