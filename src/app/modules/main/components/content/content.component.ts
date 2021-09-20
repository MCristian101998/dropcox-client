import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FolderDialogData } from '../../models/AddFolderDialogData';
import { FilesDto } from '../../models/FilesDto';
import { FileTypeDto } from '../../models/FileTypeDto';
import { UploadProgressDto } from '../../models/UploadProgressDto';
import { ContentService } from '../../services/content.service';
import { DialogService } from '../../services/dialog.service';

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
  uploadWindowClosedByUser: boolean = false;
  uploadWindowsIsShown: boolean = false;
  uploadFiles: UploadProgressDto[] = [];

  displayedColumns: string[] = ['fileName', 'owner', 'lastModified'];

  menuTopLeftPosition =  {x: '0', y: '0'} 
  rowRightClickMenuPosition = {x: '0', y: '0'}

  rightClickedRow: FilesDto = new FilesDto();


  isInDrag: boolean = false;

  @ViewChild('optionsTrigger') matMenuTrigger!: MatMenuTrigger;
  @ViewChild('rightClickRowTrigger') rowRightClickTrigger!: MatMenuTrigger;

  constructor(
    private contentService: ContentService,
    private dialogService: DialogService
  ) { }
 

  uploadFile(evt: FileList){

    if(evt && evt[0])
    {

      const filesArray = Array.from(evt);

      filesArray.forEach(file => {

        var payload = new FormData();
        payload.append('files', file);
        this.contentService.uploadFile(this.currentFolderUuid,file , payload);
      })
    }
  }

  ngOnInit(): void {

    this.currentFolderUuid = this.contentService.currentFolderId;
    this.currentFolderName = this.contentService.currentFolderName;

    this.contentService.navigatedToDirectory.subscribe((data) => {

      this.files = this.contentService.currentFolderContent;
      this.currentFolderUuid = this.contentService.currentFolderId;
      this.currentFolderName = this.contentService.currentFolderName;
      this.files.forEach(file => {
  
        if(file.fileType.type == 'directory'){
          file.image = "/assets/images/folder.png";
        }
      })
    })

    this.contentService.onInitialize.subscribe((data) => {

      if(this.contentService.userRootFolderId !== ''){
        this.contentService.navigateToFolder(this.contentService.userRootFolderId);
        this.contentService.onInitialize.unsubscribe();
      }
    })

    this.contentService.onFileUploading.subscribe((data) => {


      if(!this.uploadWindowClosedByUser)
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
    })
  }

  rowDoubleClick(file: FilesDto){

    if(file.fileType.type == 'directory')
    {
      this.contentService.navigateToFolder(file.id);
    }
    
    if(file.fileType.type == 'video')
    {
      alert("Previewing video : " + file.id);
    }

    if(file.fileType.type == "audio"){

      alert("Previewing audio : " + file.id);
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

  onRightClick(event: MouseEvent){

    if(this.currentFolderUuid == '' || this.currentFolderName == '')
    {
      return;
    }

    event.preventDefault();

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
    this.dialogService.openDeleteFileDialog(this.rightClickedRow.id, this.rightClickedRow.fileName);
  }

  downloadFile(){
    this.contentService.downloadFile(this.rightClickedRow.id);
  }

  closeUploadWindow(){
    this.uploadWindowClosedByUser = true;
    this.uploadWindowsIsShown = false;
  }
}