import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class FileTypeService{

    constructor(private http: HttpClient){}

    getTypes(){

        return this.http.get<any>(environment.apiBaseUrl + "types");
    }
}