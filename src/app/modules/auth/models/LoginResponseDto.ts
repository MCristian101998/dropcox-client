import { AppUserDto } from "src/app/shared/models/AppUserDto"

export class LoginResponseDto{
    token!:string;
    loggedUser!: AppUserDto;
}