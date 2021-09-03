import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class SnackBarService{
    constructor(private snakeBar: MatSnackBar){}

    openSnackBar(message: string): MatSnackBarRef<SimpleSnackBar>{

        return this.snakeBar.open(message, "Close", {
            duration: 5000,
            panelClass: ['snackbar']
        });
    }
}