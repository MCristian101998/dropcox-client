import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FilesDto } from "../models/FilesDto";
import { RenameFileDto } from "../models/RenameFileDto";

export class FilesSerice{

    constructor(private http: HttpClient){}

    getFiles(){

        return this.http.get<any>(environment.apiBaseUrl + "files");
    }

    uploadFile(file: FilesDto){

        return this.http.post<any>(environment.apiBaseUrl + "files", file);
    }

    renameFile(file: RenameFileDto){

        return this.http.patch<any>(environment.apiBaseUrl + "files", file);
    }

    deleteFile(fileUuid: string){

        return this.http.delete<any>(environment.apiBaseUrl + "files/" + fileUuid);
    }
    
}