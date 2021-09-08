import { HttpClient } from "@angular/common/http";
import { Injectable,EventEmitter } from "@angular/core";
import { AppUserDto } from "src/app/shared/models/AppUserDto";
import { SnackBarService } from "src/app/shared/services/snackBarService";
import { UserService } from "src/app/shared/services/user.service";
import { environment } from "src/environments/environment";
import { DirectoriesDto } from "../models/DirectoriesDto";
import { FilesDto } from "../models/FilesDto";

@Injectable()
export class ContentService{

    private quickNavDirectories: DirectoriesDto[] = [];
    private folderContent: FilesDto[] = [];
    private currentDisplayedFolderId: string = "";
    private navigationPath: string = '';
    private currentUser: AppUserDto = new AppUserDto();

    navigatedToDirectory= new EventEmitter<DirectoriesDto>();

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private snackBarService: SnackBarService
    ){}

    initData(){

        var currentUser = this.userService.getCurrentUser();

        if(currentUser == null){
            this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
            return;
        }

        this.currentUser = currentUser;
    }

    populateDirectories(){
        this.http.get<any>(environment.apiBaseUrl + "directories")
        .subscribe({

            next: (resp) => {

                this.quickNavDirectories = resp.directories;
            },
            error: (err) => {

                console.error(err);
                this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
            }
        });
    }

    navigateToFolder(folder: DirectoriesDto){

        this.currentDisplayedFolderId = folder.id;
        this.navigationPath = folder.path;

        this.http.get<any>(environment.apiBaseUrl + "content/" + folder.id)
            .subscribe({

                next: (resp) => {
                    this.folderContent = resp;
                },

                error: (err) => {

                    console.error(err);
                    this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
                }
            });
    }

    get contentData(){ return this.folderContent.slice() }
    get directories(){ return this.quickNavDirectories.slice() }
    get curretDirectoryId() { return this.currentDisplayedFolderId }
    get navPath() { return this.navigationPath }



}