import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeleteFileComponent } from "../components/modals/delete-file/delete-file.component";
import { ManageAccessInSharedDriveComponent } from "../components/modals/manage-access-in-shared-drive/manage-access-in-shared-drive.component";
import { NewFolderDialogComponent } from "../components/modals/new-folder-dialog/new-folder-dialog.component";
import { NewSharedDriveDialogComponent } from "../components/modals/new-shared-drive-dialog/new-shared-drive-dialog.component";
import { RenameFileComponent } from "../components/modals/rename-file/rename-file.component";
import { PreviewFileComponent } from "../components/modals/preview-file/preview-file.component";
import { FolderDialogData } from "../models/AddFolderDialogData";

@Injectable()
export class DialogService{

    constructor(
        public dialog: MatDialog,
    ){}

    openNewSharedDriveDialog(){
        const dialogRef = this.dialog.open(NewSharedDriveDialogComponent);
    }

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

    openDeleteFileDialog(fileId: string, fileName: string){
        const dialogRef = this.dialog.open(DeleteFileComponent,{
            data: {
                fileId : fileId,
                fileName: fileName
            }
        })
    }

    openManageSharedFolderAccess(){
        const dialogRef = this.dialog.open(ManageAccessInSharedDriveComponent,{
            width: '450px'
        })
    }

    openPreviewFileDialog(fileType:string, fileId: string){
        const dialogRef = this.dialog.open(PreviewFileComponent,{
            width: '650px',
            data: {
                fileType: fileType,
                fileId: fileId
            }
        })
    }
}