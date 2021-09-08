import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FilesDto } from '../../models/FilesDto';
import { FileTypeDto } from '../../models/FileTypeDto';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  fileTypes: FileTypeDto[] = [];
  files: FilesDto[] = [];
  currentFolderUuid:string = "";
  selectedTableEntityId: string = "";

  displayedColumns: string[] = ['fileName', 'owner', 'lastModified'];

  menuTopLeftPosition =  {x: '0', y: '0'} 
  isInDrag: boolean = false;

  constructor(private contentService: ContentService) { }

  uploadFile(evt: any){
    console.log('evt: ', evt);
    // evt is an array of the file(s) dropped on our div. Here we're assuming only one file has been uploaded
    let payload = new FormData();
    payload.append('data', evt[0]);
    // File can now be uploaded by doing an http post with the payload

  }

  ngOnInit(): void {
    
    this.currentFolderUuid = this.contentService.curretDirectoryId;
    this.files = this.contentService.contentData;

     
    this.files.forEach(file => {
      if(file.fileType.type == 'directory'){

        file.image = "/assets/images/folder.png";
      }
    })

  }

  rowClick(rowId: string){
    this.selectedTableEntityId = rowId;
  }

  rowDoubleClick(file: FilesDto){

    if(file.fileType.type == 'directory')
    {
      alert("Navigation to diretory : " + file.id);
    }
    
    if(file.fileType.type == 'video')
    {
      alert("Previewing video : " + file.id);
    }

    if(file.fileType.type == "audio"){

      alert("Previewing audio : " + file.id);
    }
  }

  onDragEnter(event:any){
    this.isInDrag = event;

    console.log("is in drag " + event);
  }

  onRightClick(event: MouseEvent){
    
  }
}