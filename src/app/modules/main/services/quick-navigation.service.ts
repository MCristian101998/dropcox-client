import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class QuickNavigationService{

    constructor(private http: HttpClient){}

    getDirectories(userId: string){

        return this.http.get<any>(environment.apiBaseUrl + "directories/" + userId);
    }
}