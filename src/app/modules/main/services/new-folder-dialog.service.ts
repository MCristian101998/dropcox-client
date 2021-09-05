import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewFolderDialogComponent } from "../components/modals/new-folder-dialog/new-folder-dialog.component";

@Injectable()
export class NewFolderDialogService{

    constructor(public dialog: MatDialog){}

    openDialog(){

        const dialogRef = this.dialog.open(NewFolderDialogComponent);

        dialogRef.afterClosed()
            .subscribe(result => {

                if(result){
                    
                }
            })

    }

}