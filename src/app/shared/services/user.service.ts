import { Injectable } from "@angular/core";

@Injectable()
export class UserService{

    constructor(){}

    getCurrentUser(){
        return localStorage.getItem('current_user');
    }
}