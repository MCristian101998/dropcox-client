import { Component, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FolderDialogData } from '../../models/AddFolderDialogData';
import { FilesDto } from '../../models/FilesDto';
import { FileTypeDto } from '../../models/FileTypeDto';
import { ContentService } from '../../services/content.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  fileTypes: FileTypeDto[] = [];
  files: FilesDto[] = [];
  currentFolderUuid:string = "";
  currentFolderName: string = "";
  selectedTableEntityId: string = "";

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
 

  uploadFile(evt: any){
    console.log('evt: ', evt);
    // evt is an array of the file(s) dropped on our div. Here we're assuming only one file has been uploaded
    let payload = new FormData();
    payload.append('data', evt[0]);
    // File can now be uploaded by doing an http post with the payload

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
  }

  ngOnDestroy(): void {
    this.contentService.navigatedToDirectory.unsubscribe();
  }

  rowClick(rowId: string){
    this.selectedTableEntityId = rowId;
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

    console.log("is in drag " + event);
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

  }
}