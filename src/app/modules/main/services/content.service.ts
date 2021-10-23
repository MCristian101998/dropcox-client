import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Injectable,EventEmitter } from "@angular/core";
import { AppUserDto } from "src/app/shared/models/AppUserDto";
import { SnackBarService } from "src/app/shared/services/snackBarService";
import { UserService } from "src/app/shared/services/user.service";
import { environment } from "src/environments/environment";
import { CreateFolderDto } from "../models/CreateFolderDto";
import { DirectoriesDto } from "../models/DirectoriesDto";
import { FilesDto } from "../models/FilesDto";
import { RenameFileDto } from "../models/RenameFileDto";
import { UploadProgressDto } from "../models/UploadProgressDto";
import { UploadDownloadStatusDto } from "../models/UploadDownloadStatusDto";
import * as fileSaver from 'file-saver';
import { DownloadProgressDto } from "../models/DownloadProgressDto";
import { escapeRegExp } from "@angular/compiler/src/util";
import { PasteFileDto } from "../models/PasteFilesDto";

@Injectable()
export class ContentService{

    public directories: DirectoriesDto[] = [];
    public currentUser: AppUserDto = new AppUserDto();

    public currentFolderContent: FilesDto[] = [];
    public currentFolderId: string = "";
    public currentFolderPath: string = '';
    public currentFolderHasParent: boolean = false;
    public currentFolderParentId:string = '';
    public currentFolderName:string = '';
    public currentFolderIsShared: boolean = false;
    public currentFolderIsOwnedByCurrentUser: boolean = false;

    public filesToCopyId: string[] = [];
    public filesToCutId: string[] = [];
    public folderToCopyOrCutFrom: string = '';

    public userRootFolderId: string = '';
    public uploadInProgress: boolean = false;
    public downloadInProgress: boolean = false;

    directoriesLoaded = new EventEmitter<DirectoriesDto[]>();
    navigatedToDirectory= new EventEmitter<DirectoriesDto>();
    onFileUploading = new EventEmitter<UploadProgressDto>();
    onFileDownloading = new EventEmitter<DownloadProgressDto>();

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private snackBarService: SnackBarService
    ){
    }

    populateDirectories(){

        var currentUser = this.userService.getCurrentUser();

        if(currentUser === null){
            this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
            return;
        }

        this.currentUser = currentUser;

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
        
        this.http.get<any>(environment.apiBaseUrl + "folders/content/" + folderId)
            .subscribe({

                next: (resp) => {

                    this.currentFolderId = resp.parentDirectory.id;
                    this.currentFolderPath = resp.parentDirectory.path;
                    this.currentFolderParentId = resp.parentDirectory.parentId;
                    this.currentFolderName = resp.parentDirectory.fileName;
                    this.currentFolderIsShared = resp.parentDirectory.isShared;

                    if(this.currentFolderParentId !== undefined){
                        this.currentFolderHasParent = true;
                    }
                    else
                    {
                        this.currentFolderHasParent = false;
                    }

                    if(this.currentUser.username.toLowerCase() === resp.parentDirectory.uploadedByUser.toLowerCase())
                    {
                        this.currentFolderIsOwnedByCurrentUser = true;
                    }
                    else{
                        this.currentFolderIsOwnedByCurrentUser = false;
                    }

                    this.currentFolderContent = resp.files;
                    this.navigatedToDirectory.emit(resp);
                },
                error: (err) => {

                    console.error(err);
                    this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
                }
            });
    }

    createFolder(folderToCreate: CreateFolderDto){
        this.http.post(environment.apiBaseUrl + "folders", folderToCreate)
            .subscribe({
                next: (resp) => {},
                error: (err) => {
                    console.error(err);
                    this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
                }
            }).add(() => {

                this.populateDirectories();
                this.navigateToFolder(folderToCreate.folderId);
            });
    }

    renameFile(fileToRename: RenameFileDto){

        this.http.put<any>(environment.apiBaseUrl + "folders", fileToRename)
            .subscribe({
                next: (resp) => {

                    this.populateDirectories();
                    this.navigateToFolder(this.currentFolderId);
                },
                error: (err) => {
                    console.error(err);
                    this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
                }
            })
    }

    deleteFile(fileId: string){
        this.http.delete<any>(environment.apiBaseUrl + "folders/" + fileId)
            .subscribe({

                next: (resp) => {
                    this.populateDirectories();
                    this.navigateToFolder(this.currentFolderId);
                },
                error: (err) => {
                    console.error(err);
                    this.snackBarService.openSnackBar('Something went wrong ! Please reload.')
                }
            })
    }

    uploadFile(fileId: string, files:File[], formData: FormData){

        var progress = 0;

        this.uploadInProgress = true;

        return this.http.post<any>(environment.apiBaseUrl + "folders/file-upload/" + fileId, formData,{
            reportProgress: true,
            observe: 'events'
        })
        .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                // console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                //console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                if(event.total !== undefined){
                    progress = Math.round(event.loaded / event.total * 100);

                    files.forEach(item =>{
                        this.onFileUploading.emit({file: item, progress: progress, status: UploadDownloadStatusDto.InProgress});
                    })
                }
                break;
              case HttpEventType.Response:

                files.forEach(item =>{
                    this.onFileUploading.emit({file: item, progress: progress, status: UploadDownloadStatusDto.Done});
                });

                this.uploadInProgress = false;

                this.populateDirectories();
                this.navigateToFolder(this.currentFolderId);

                setTimeout(() => {
                  progress = 0;
                }, 1500);
            }});
    }

    downloadFile(file: FilesDto){

        this.downloadInProgress = true;

        var fileDownloadProgress = new DownloadProgressDto();
        fileDownloadProgress.fileName = file.fileName;
        fileDownloadProgress.status = UploadDownloadStatusDto.InProgress;

        this.onFileDownloading.emit(fileDownloadProgress);

        var headers = new HttpHeaders();
        headers.append("Accept-Ranges", "bytes");

        this.http.get(environment.apiBaseUrl + "folders/" + file.id + "/download",
        {
            headers: headers,
            observe: 'response',
            responseType: 'blob',
        }
        )
            .subscribe({
                next: (resp) =>{

                    fileDownloadProgress.status = UploadDownloadStatusDto.Done;
                    this.onFileDownloading.emit(fileDownloadProgress);

                    var contentDisposition = resp.headers.get('Content-Disposition');
                    if(contentDisposition == null){
                        return;
                    }
                    if(resp.body == null){
                        return;
                    }
                    var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();

                    fileSaver.saveAs(resp.body, filename,);

                    this.downloadInProgress = false;
                },
                error: (err) => {
                    console.error(err);
                    this.downloadInProgress = false;
                    this.snackBarService.openSnackBar('Something went wrong ! Please reload.');
                }
            })
    }

    createSharedDrive(folderName: string){
        this.http.post<any>(environment.apiBaseUrl + "folders/create-shared-folder/" + folderName, null)
            .subscribe({
                next: (resp) =>{
                    this.populateDirectories();
                },
                error: (err) => {
                    console.error(err);
                    this.snackBarService.openSnackBar("Something went wrong ! Please reload.");
                }
            })
    }


    pasteFIle(){

        var copyOptions = '0';
        var body: PasteFileDto[] = [];

        if(!this.filesToCopyId.length){
            copyOptions = "0";
            this.filesToCutId.forEach(item => {
                var file = new PasteFileDto();
                file.id = item;
                body.push(file);
            })
        }
        else{
            copyOptions = "1";

            this.filesToCopyId.forEach(item => {
                var file = new PasteFileDto();
                file.id = item;
                body.push(file);
            })
        }

        

        console.log(body);

        this.http.put<any>(environment.apiBaseUrl + "folders/move/" + this.currentFolderId + "/?copy=" + copyOptions, body)
            .subscribe({
                next: (resp) =>{
                    this.populateDirectories();
                    this.navigateToFolder(this.currentFolderId);

                    this.filesToCopyId = [];
                    this.filesToCutId = [];
                },
                error: (err) => {
                    console.error(err);
                    this.snackBarService.openSnackBar("Something went wrong ! Please reload.");
                }
            });
    }
}