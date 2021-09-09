import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewFolderDialogComponent } from "../components/modals/new-folder-dialog/new-folder-dialog.component";
import { RenameFileComponent } from "../components/modals/rename-file/rename-file.component";
import { FolderDialogData } from "../models/AddFolderDialogData";

@Injectable()
export class DialogService{

    constructor(
        public dialog: MatDialog,
    ){}

    openNewFolderDialog(newFolderData: FolderDialogData){

        if(newFolderData.folderName == '' || newFolderData.folderId == '')
        {
            return;
        }

        const dialogRef = this.dialog.open(NewFolderDialogComponent, {
            data : newFolderData
        });
    }

    openRenameFileDialog(renameFolderData: any){

        const dialogRef = this.dialog.open(RenameFileComponent, {
            data: renameFolderData
        })
    }

}