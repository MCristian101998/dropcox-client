import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { UserService } from 'src/app/shared/services/user.service';
import { FolderDialogData } from '../../models/AddFolderDialogData';
import { DirectoriesDto } from '../../models/DirectoriesDto';
import { ContentService } from '../../services/content.service';
import { DialogService } from '../../services/dialog.service';
import { QuickNavigationService } from '../../services/quick-navigation.service';

@Component({
  selector: 'app-quick-navigation',
  templateUrl: './quick-navigation.component.html',
  styleUrls: ['./quick-navigation.component.css']
})
export class QuickNavigationComponent implements OnInit {

  treeControl = new NestedTreeControl<DirectoriesDto>(node => node.subfolders);
  dataSource = new MatTreeNestedDataSource<DirectoriesDto>();
  expandedNodes!: DirectoriesDto[];

  hasChild = (_: number, node: DirectoriesDto) => !!node.subfolders && node.subfolders.length > 0;

  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {

    const currentUser = this.userService.getCurrentUser();

    if(currentUser == null){
      this.snackBarService.openSnackBar('Something went wrong ! Please Reload');
      return;
    }

    this.contentService.populateDirectories();

    this.contentService.directoriesLoaded.subscribe((msg) => {
      var folders = this.contentService.directories;

      var rootFolderId = "";

      folders.forEach(folder => {

        if(folder.fileName.toLowerCase() === 'private')
        {
          folder.fileName = "My drive";
          rootFolderId = folder.id;

          this.contentService.userRootFolderId = rootFolderId;
        }

        if(folder.fileName.toLowerCase() === 'shared'){
          folder.fileName = "Shared Folders";
        }

        if(folder.fileName.length > 10){
          folder.fileName = folder.fileName.slice(0,10) + "...";
        }
        this.abbreviateFolderNames(folder);

      })

      folders.forEach(function(item, i){
        if(item.fileName == "My drive"){
          folders.splice(i, 1);
          folders.unshift(item);
        }

      })

      if(this.dataSource.data.length)
      {
        this.expandedNodes = [];

        console.log("this.treeControl.dataNodes", this.treeControl.dataNodes);

        this.dataSource.data.forEach((node) =>{

          if(this.treeControl.isExpanded(node)){
            this.expandedNodes.push(node);
          }
        })

        this.dataSource.data = folders;

        this.expandedNodes.forEach((node) =>{
          this.treeControl.expand(this.dataSource.data.find(n => n.id === node.id)!);
        })

        // console.log("list before object assigned ", this.dataSource.data);
        // console.log("list to update from ", folders);
        // Object.assign(this.dataSource.data, folders);

        // console.log("list after object assigned ", this.dataSource.data);
      }
      else
      {
        this.dataSource.data = folders;
      }

    });
  }

    updateFolders(dataForUpdate: DirectoriesDto[], dataToUpdateFrom: DirectoriesDto[])
    {
      //check for new items
      dataToUpdateFrom.forEach((item, index) =>{

        var itemExists = dataForUpdate.find(x => x.id == item.id);

        if(itemExists == undefined)
        {
          dataForUpdate.splice(index, 0, item);
        }
      })

      dataForUpdate.forEach((item, index) =>{

        var itemToUpdateFrom = dataToUpdateFrom.find(x => x.id == item.id);

        if(itemToUpdateFrom == undefined){
          dataForUpdate.splice(index, 1);
        }else
        {
          item.fileName = itemToUpdateFrom.fileName;
        }
      })
    }




  abbreviateFolderNames(folder: DirectoriesDto){

    if(folder.fileName.length > 15)
    {
      var fileName = folder.fileName;
      folder.fileName = folder.fileName.slice(0, 15) + "...";
    }

    if(folder.subfolders !== undefined){
      folder.subfolders.forEach((sub) =>{
        this.abbreviateFolderNames(sub);
      })
    }

  }

  nodeClicked(node: DirectoriesDto){
    this.contentService.navigateToFolder(node.id);
  }

  openNewFolderDialog(){
    var dialogData = new FolderDialogData();
    dialogData.folderId = this.contentService.currentFolderId;
    dialogData.folderName = this.contentService.currentFolderName;

    this.dialogService.openNewFolderDialog(dialogData);
  }

  openNewSharedDriveDialog(){
    this.dialogService.openNewSharedDriveDialog();
  }

  uploadAFile(){
    var fileUpload = document.getElementById("fileUploader");
    fileUpload?.click();
  }

  fileUploaded(evt: Event){

    if(this.contentService.uploadInProgress)
    {
      this.snackBarService.openSnackBar("Upload in progress. Please wait.");
      return;
    }

    const element = evt.currentTarget as HTMLInputElement;

    if(element.files && element.files[0])
    {

      const filesArray = Array.from(element.files);

      var payload = new FormData();
      filesArray.forEach(file => {

        payload.append('files', file);
      })
      this.contentService.uploadFile(this.contentService.currentFolderId,filesArray, payload);
    }
  }
}