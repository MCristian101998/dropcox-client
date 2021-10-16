import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class CheckFolderNameService{

    constructor(private http: HttpClient){}

    checkName(folderId:string, folderName: string){

        return this.http.get(environment.apiBaseUrl + "folders/exists/" + folderId + "/" + folderName);
    }

}