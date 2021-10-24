import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUserDto } from 'src/app/shared/models/AppUserDto';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { UserService } from 'src/app/shared/services/user.service';
import { FileSearchRange } from '../../models/FileSearchRangeEnum';
import { FileTypeDto } from '../../models/FileTypeDto';
import { ContentService } from '../../services/content.service';
import { FileTypeService } from '../../services/file-type.service';
import { SearchService } from '../../services/search.service';
import { SidenavSerive } from '../../services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{

  currentUser!: AppUserDto;
  advancedSerachIsOpened:boolean = false;
  searchFormControlHasText:boolean = false;

  dataTypes: FileTypeDto[] = [];
  fileOwner = FileSearchRange;
  fileOwnerKeys = Object.keys(this.fileOwner).filter(k => !isNaN(Number(k))).map(Number);

  searchFormControl = new FormControl();
  dataTypeControl = new FormControl();
  ownerControl = new FormControl();
  locationControl = new FormControl();

  constructor(
    private sidenavService: SidenavSerive,
    private userService: UserService,
    private router: Router,
    private fileTypesService: FileTypeService,
    private snackBarService: SnackBarService,
    private searchService: SearchService,
    private contentService: ContentService
  ) {
    this.ownerControl.setValue(FileSearchRange.All);
    this.locationControl.setValue(false);
  }

  toggleSidenav(){
    this.sidenavService.toggle();
  }

  ngOnInit(){

    const user = this.userService.getCurrentUser();

    if(user)
    {
      this.currentUser = user;
    }

    this.fileTypesService.getTypes()
      .subscribe({
        next: (resp) =>{
          this.dataTypes = resp;

          this.dataTypes.forEach(file =>{
            if(file.type == 'directory'){
              file.image = "/assets/images/folder.png";
            }
            else if(file.type == "text"){
              file.image = "/assets/images/text.png";
            }
            else if(file.type == "image"){
              file.image = "/assets/images/image.png";
            }
            else if(file.type == "video"){
              file.image = "/assets/images/video.png";
            }
            else if(file.type == "excel"){
              file.image = "/assets/images/excel.png";
            }
            else if(file.type == "pdf"){
              file.image = "/assets/images/pdf.png";
            }
            else if(file.type == "word"){
              file.image = "/assets/images/word.png";
            }
            else if(file.type == "powerpoint"){
              file.image = "/assets/images/powerPoint.png";
            }
            else if(file.type == "audio"){
              file.image = "/assets/images/audio.png";
            }
            else if(file.type == "archive"){
              file.image = "/assets/images/archive.png";
            }
            else if(file.type == "unknown"){
              file.image = "/assets/images/file.png";
            }
          })

          var allDataType = new FileTypeDto(); 
          allDataType.uuid = "0";
          allDataType.type = 'All';

          this.dataTypes.unshift(allDataType);

        },
        error: (err) =>{
          console.error(err);
          this.snackBarService.openSnackBar("Something went wrong! Please reload.");
        }
      })

  }

  toggleAdvancedSearch(){
    this.advancedSerachIsOpened = !this.advancedSerachIsOpened;
  }

  clearSearch(){
    this.searchFormControl.setValue("");
    this.searchFormControlHasText = false;
  }

  search(){
    if(this.searchFormControl.value == "" || this.searchFormControl.value == null)
    {
      return;
    }

    this.searchService.search(this.searchFormControl.value)
      .subscribe({
        next: (resp) =>{
          console.log(resp);
          this.searchService.filesSearched.emit(resp);
      },
      error: (err) => {
        console.error(err);
        this.snackBarService.openSnackBar("Something went wrong! Please reload.");
      }
    })
  }

  advancedSearch(){
    if(this.searchFormControl.value == "" || this.searchFormControl.value == null)
    {
      return;
    }

    var fileType = undefined;
    
    if(this.dataTypeControl.value != 'All'){
      fileType = this.dataTypeControl.value
    }

    var folderId = undefined;

    if(this.locationControl.value == false){
      folderId = this.contentService.currentFolderId;
    }

    this.searchService.search(this.searchFormControl.value, this.ownerControl.value,fileType,folderId)
      .subscribe({
        next:(resp) => {
          console.log(resp);
          this.searchService.filesSearched.emit(resp);
        },
        error:(err) => {
          console.error(err);
          this.snackBarService.openSnackBar("Something went wrong! Please reload.");
        }
      });
  }

  inputChanged(event:any){
    if(this.searchFormControl.value == "" || this.searchFormControl.value == null){
      this.searchFormControlHasText = false;
    }
    else
    {
      this.searchFormControlHasText = true;
    }
  }

  logOut(){

    localStorage.removeItem("current_user");
    localStorage.removeItem('access_token');

    this.router.navigate(["auth/login"]);
  }
}
