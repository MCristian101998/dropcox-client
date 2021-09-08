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

    public directories: DirectoriesDto[] = [];
    public currentUser: AppUserDto = new AppUserDto();

    public currentFolderContent: FilesDto[] = [];
    public currentFolderId: string = "";
    public currentFolderPath: string = '';
    public currentFolderHasParent: boolean = false;
    public currentFolderParentId:string = '';

    directoriesLoaded = new EventEmitter<DirectoriesDto[]>();
    navigatedToDirectory= new EventEmitter<DirectoriesDto>();

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private snackBarService: SnackBarService
    ){
        var currentUser = this.userService.getCurrentUser();

        if(currentUser === null){
            this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
            return;
        }

        this.currentUser = currentUser;
    }

    populateDirectories(){
        this.http.get<any>(environment.apiBaseUrl + "folders/" + this.currentUser.id)
        .subscribe({

            next: (resp) => {


                this.directories = resp.directories;
                this.directoriesLoaded.emit(resp.directories);
            },
            error: (err) => {

                console.error(err);
                this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
            }
        });
    }

    navigateToFolder(folderId:string){

        this.currentFolderId = folderId;
        //this.currentFolderPath = path;
        
        // if(parentId !== undefined){
        //     this.currentFolderParentId = parentId;
        //     this.currentFolderHasParent = true;
        //}

        this.http.get<any>(environment.apiBaseUrl + "folders/content/" + folderId)
            .subscribe({

                next: (resp) => {

                    this.currentFolderId = resp.parentDirectory.id;
                    this.currentFolderPath = resp.parentDirectory.path;
                    this.currentFolderParentId = resp.parentDirectory.parentId;

                    if(this.currentFolderParentId !== undefined){
                        this.currentFolderHasParent = true;
                    }
                    else
                    {
                        this.currentFolderHasParent = false;
                    }

                    this.currentFolderContent = resp.files;
                    this.navigatedToDirectory.emit(resp);

                    //detalii despre parinte
                },

                error: (err) => {

                    console.error(err);
                    this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
                }
            });
    }
}