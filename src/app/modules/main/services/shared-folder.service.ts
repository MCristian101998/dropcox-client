import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddUserToSharedFolderDto } from "../models/AddUserToSharedFolderDto";
import { SharedFolderUsersDto } from "../models/SharedFolderUsersDto";

@Injectable()
export class SharedFolderService{

    constructor(private htpp: HttpClient) {}

    getSharedFoldersUsersWithAccess(folderId: string)
    {
        return this.htpp.get<any>(environment.apiBaseUrl + "folders/" + folderId + "/users-with-access");
    }

    getSharedFolderUsersWithoutAccess(foldeId: string)
    {
        return this.htpp.get<any>(environment.apiBaseUrl + "folders/" + foldeId + "/users-without-access");
    }

    addUserToFolder(folderId: string, users:AddUserToSharedFolderDto[]){
        return this.htpp.post<any>(environment.apiBaseUrl + "folders/add-users-to-shared-folder/" + folderId, users);
    }

    deteleUserFromShared(folderId: string, userId: string){
        return this.htpp.put<any>(environment.apiBaseUrl + "folders/delete-user-from-rootfolder/" + folderId + "/" + userId,null);
    }

}