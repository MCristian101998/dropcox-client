import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { FileSearchRange } from "../models/FileSearchRangeEnum";

@Injectable()
export class SearchService{

    filesSearched = new EventEmitter<any>();

    constructor(private http: HttpClient) { }

    search(searchString: string, owner?: number, fileType?:string, folderId?:string){

        var params = '?';
        if(folderId !== undefined){
            params += 'folderUuid=' + folderId + '&';
        }

        params += 'fileName=' + searchString;
        
        if(fileType !== undefined)
        {
            params += '&fileType=' + fileType;
        }

        if(owner !== undefined)
        {
            if(owner == FileSearchRange.All){
                params += "&range=" + "ALL";
            }else if(owner == FileSearchRange.Me){
                params += "&range=" + "ME";
            }else if(owner == FileSearchRange.Others){
                params += "&range=" + "OTHERS";
            }
        }

        return this.http.get<any>(environment.apiBaseUrl + "folders/search" + params);
    }
}