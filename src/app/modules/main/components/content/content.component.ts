import { SelectionModel } from '@angular/cdk/collections';
import { StyleCompiler } from '@angular/compiler';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Client, Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { UserService } from 'src/app/shared/services/user.service';
import { FolderDialogData } from '../../models/AddFolderDialogData';
import { DownloadProgressDto } from '../../models/DownloadProgressDto';
import { FilesDto } from '../../models/FilesDto';
import { FileTypeDto } from '../../models/FileTypeDto';
import { UploadProgressDto } from '../../models/UploadProgressDto';
import { ContentService } from '../../services/content.service';
import { DialogService } from '../../services/dialog.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  fileTypes: FileTypeDto[] = [];
  files: FilesDto[] = [];
  currentFolderUuid:string = "";
  currentFolderName: string = "";
  showSearchResult:boolean = false;

  searchResult: FilesDto[] = [];

  uploadWindowClosedByUser: boolean = false;
  uploadWindowsIsShown: boolean = false;
  uploadFiles: UploadProgressDto[] = [];

  downloadWindowClosedByUser: boolean = false;
  downloadWindowIsShown: boolean = false;
  downloadFiles: DownloadProgressDto[] = [];

  displayedColumns: string[] = ['select','fileName', 'owner', 'lastModified'];

  menuTopLeftPosition =  {x: '0', y: '0'} 
  rowRightClickMenuPosition = {x: '0', y: '0'}

  rightClickedRow: FilesDto = new FilesDto();

  isPasteEnabled: boolean = false;

  

  isInDrag: boolean = false;
  selection = new SelectionModel<FilesDto>(true, []);
  @ViewChild('optionsTrigger') matMenuTrigger!: MatMenuTrigger;
  @ViewChild('rightClickRowTrigger') rowRightClickTrigger!: MatMenuTrigger;


  constructor(
    private contentService: ContentService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private userService: UserService,
    private searchService: SearchService
  ) { 
    
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.files.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.files);
  }

  checkboxLabel(row?: FilesDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  uploadFile(evt: FileList){

    if(this.contentService.uploadInProgress)
    {
      this.snackBarService.openSnackBar("Upload in progress. Please wait.");
      return;
    }


    if(evt && evt[0])
    {

      const filesArray = Array.from(evt);

      var payload = new FormData();


      filesArray.forEach(file => {

        payload.append('files', file);
      })

      this.contentService.uploadFile(this.currentFolderUuid,filesArray , payload);
    }
  }

  ngOnInit(): void {

    this.currentFolderUuid = this.contentService.currentFolderId;
    this.currentFolderName = this.contentService.currentFolderName;

    var currentUser = this.userService.getCurrentUser();

    if(currentUser != null)
    {
      this.contentService.navigateToFolder(currentUser.privateFolderId);
    }

    this.contentService.navigatedToDirectory.subscribe((data) => {

      this.selection.clear();
      let socket = new SockJS('http://localhost:6300/stomp');
      let client = Stomp.over(socket);
      let socketSubscription!: StompSubscription;

      if(this.contentService.currentFolderIsShared){
        console.log("in a shared folder. connecting to web socket.")
        client.connect({}, (frame: any) =>{
          socketSubscription = client.subscribe("/topic/" + this.contentService.currentFolderId, payload =>{
            console.log("websocket update");
            this.contentService.populateDirectories();
            this.contentService.navigateToFolder(this.contentService.currentFolderId);
          });
        });
      }
      else
      {
        if(client !== undefined && (socketSubscription != null || socketSubscription != undefined))
        {
          socketSubscription.unsubscribe;
        }
      }

      this.files = this.contentService.currentFolderContent;
      this.currentFolderUuid = this.contentService.currentFolderId;
      this.currentFolderName = this.contentService.currentFolderName;

      console.log(this.contentService.currentFolderId);
      console.log(this.files);

      this.files.forEach(file => {
  
        if(file.fileType.type == 'directory'){
          file.image = "/assets/images/folder.png";
        }
        else if(file.fileType.type == "text"){
          file.image = "/assets/images/text.png";
        }
        else if(file.fileType.type == "image"){
          file.image = "/assets/images/image.png";
        }
        else if(file.fileType.type == "video"){
          file.image = "/assets/images/video.png";
        }
        else if(file.fileType.type == "excel"){
          file.image = "/assets/images/excel.png";
        }
        else if(file.fileType.type == "pdf"){
          file.image = "/assets/images/pdf.png";
        }
        else if(file.fileType.type == "word"){
          file.image = "/assets/images/word.png";
        }
        else if(file.fileType.type == "powerpoint"){
          file.image = "/assets/images/powerPoint.png";
        }
        else if(file.fileType.type == "audio"){
          file.image = "/assets/images/audio.png";
        }
        else if(file.fileType.type == "archive"){
          file.image = "/assets/images/archive.png";
        }
        else if(file.fileType.type == "unknown"){
          file.image = "/assets/images/file.png";
        }
      })
    })

    this.contentService.onFileUploading.subscribe((data) => {
      if(!this.uploadWindowClosedByUser && !this.downloadWindowIsShown)
      {
        this.uploadWindowsIsShown = true;
      }

      var obj = this.uploadFiles.find(f => f.file == data.file);

      if(obj === undefined){

        this.uploadFiles.push(data);
        this.uploadWindowClosedByUser = false;
        this.uploadWindowsIsShown = true
      }
      else
      {
        this.uploadFiles.forEach(item =>{
          

          if(item.file == data.file)
          {
            item.progress = data.progress;
            item.status = data.status;
          }
        })
      }

      this.uploadFiles.forEach(item =>{
        if(item.uploadFileName.length > 20){
          item.uploadFileName = item.uploadFileName.slice(0, 20) + "...";
        }

        if(item.uploadFileName.length < 20)
        {
          var spacesToAdd = 20 - item.uploadFileName.length;

          item.uploadFileName = item.uploadFileName + Array(spacesToAdd).fill(' ').join('');
        }
      })
    })

    this.contentService.onFileDownloading.subscribe((data) => {

      if(!this.downloadWindowClosedByUser && !this.uploadWindowsIsShown)
      {
        this.downloadWindowIsShown = true;
      }

      var obj = this.downloadFiles.find(f => f.fileName == data.fileName);

      if(obj === undefined){

        this.downloadFiles.push(data);
        this.downloadWindowClosedByUser = false;
        this.downloadWindowIsShown = true
      }
      else
      {
        this.downloadFiles.forEach(item =>{

          if(item.fileName == data.fileName)
          {
            item.status = data.status;
          }
        })
      }

      this.downloadFiles.forEach(item =>{

        if(item.fileName.length > 20)
        {
          item.fileName = item.fileName.slice(0, 20) + "...";
        }
      })

    })

    this.searchService.filesSearched.subscribe((data) => {
      this.searchResult = data;
      this.showSearchResult = true;
    })

    this.contentService.filesdeleted.subscribe((data) =>{

      console.log("selection before clear", this.selection.selected);

      this.selection.clear();

      console.log("selection after clear", this.selection.selected);

    })
  }

  rowDoubleClick(file: FilesDto){

    if(file.fileType.type == 'directory')
    {
      this.contentService.navigateToFolder(file.id);
    }

    if(file.fileType.type == 'video' ||
    file.fileType.type == 'audio' ||
    file.fileType.type == 'image'){
      this.dialogService.openPreviewFileDialog(file.fileType.type, file.id, file.fullPath);
    }
  }

  rowRightClick(event: MouseEvent, row: FilesDto){
    event.preventDefault();

    this.rowRightClickMenuPosition.x = event.clientX + 'px'; 
    this.rowRightClickMenuPosition.y = event.clientY + 'px'; 

    this.rightClickedRow = row;

    this.rowRightClickTrigger.toggleMenu();
  }

  onDragEnter(event:any){
    this.isInDrag = event;
  }

  onRightClick(event: any){
    event.preventDefault();

    if(this.rowRightClickTrigger.menuOpen)
    {
      return;
    }

    this.menuTopLeftPosition.x = event.clientX + 'px'; 
    this.menuTopLeftPosition.y = event.clientY + 'px'; 

    this.matMenuTrigger.toggleMenu();
  }

  openCreateFolderDirectory(){

    var newFolderData = new FolderDialogData();
    newFolderData.folderId = this.currentFolderUuid;
    newFolderData.folderName = this.currentFolderName;

    this.dialogService.openNewFolderDialog(newFolderData);
  }

  renameFile(){

    var dialogData = new FolderDialogData();
    dialogData.folderId = this.rightClickedRow.id;
    dialogData.folderName = this.rightClickedRow.fileName;

    this.dialogService.openRenameFileDialog(dialogData);
  }

  deleteFile(){
    this.selection.select(this.rightClickedRow);

    this.contentService.filesToDeletedIds = [];

    console.log("selected items ", this.selection.selected);

    let itemsToDelete: FilesDto[] = [];
    this.selection.selected.forEach(item =>{
      this.contentService.filesToDeletedIds.push(item.id);
      itemsToDelete.push(item);
    })

    this.dialogService.openDeleteFileDialog(itemsToDelete);
  }

  downloadFile(){
    this.contentService.downloadFile(this.rightClickedRow);
  }

  closeUploadWindow(){
    this.uploadWindowClosedByUser = true;
    this.uploadWindowsIsShown = false;
  }

  closeDownloadWindow(){
    this.downloadWindowClosedByUser = true;
    this.downloadWindowIsShown = false;
  }

  copyFile(){

    this.selection.select(this.rightClickedRow);

    this.contentService.filesToCopyId = [];
    this.contentService.filesToCutId = [];

    this.selection.selected.forEach(item => {
      this.contentService.filesToCopyId.push(item.id);
    })
    this.contentService.folderToCopyOrCutFrom = this.contentService.currentFolderId;
    this.isPasteEnabled = true;
  }

  cutFile(){

    this.selection.select(this.rightClickedRow);

    this.contentService.filesToCutId = [];
    this.contentService.filesToCopyId = [];

    this.selection.selected.forEach(item => {

      this.contentService.filesToCutId.push(item.id);
    })

    this.contentService.folderToCopyOrCutFrom = this.contentService.currentFolderId;
    this.isPasteEnabled = true;
  }

  pasteFile(){
    this.contentService.pasteFile();
  }

  closeSearchResult(){
    this.showSearchResult = false;
    this.searchResult = [];

    this.contentService.navigateToFolder(this.contentService.currentFolderId);
  }
}