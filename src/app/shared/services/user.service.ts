import { Injectable } from "@angular/core";
import { AppUserDto } from "../models/AppUserDto";

@Injectable()
export class UserService{

    constructor(){}

    getCurrentUser(){

        // var dataFromStorage = localStorage.getItem('current_user');

        // if(!dataFromStorage){
        //     return null;
        // }
        // var user: AppUserDto = JSON.parse(dataFromStorage);

        // return user;

        var tempUser = new AppUserDto();
        tempUser.firstName = "Test";
        tempUser.lastName = "Testescu";
        tempUser.email = "test@test.com";
        tempUser.username = "test";
        tempUser.uuId = "2";


        return tempUser;
    }
}