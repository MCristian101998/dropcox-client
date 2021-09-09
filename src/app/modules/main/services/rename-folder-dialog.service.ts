import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { RenameFileComponent } from "../components/modals/rename-file/rename-file.component";

export class RenameFileService{


    constructor(
        public dialog: MatDialog
    ){}

    openDialog(renameFolderData: any){

        const dialogRef = this.dialog.open(RenameFileComponent, {
            data: renameFolderData
        })
    }
}