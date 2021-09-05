import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FilesDto } from '../../models/FilesDto';
import { FileTypeDto } from '../../models/FileTypeDto';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor() { }
  fileTypes: FileTypeDto[] = [];
  files: FilesDto[] = [];
  currentFolderUuid:string = "";

  displayedColumns: string[] = ['fileName', 'owner', 'lastModified'];

  menuTopLeftPosition =  {x: '0', y: '0'} 
  isInDrag: boolean = false;

  uploadFile(evt: any){
    console.log('evt: ', evt);
    // evt is an array of the file(s) dropped on our div. Here we're assuming only one file has been uploaded
    let payload = new FormData();
    payload.append('data', evt[0]);
    // File can now be uploaded by doing an http post with the payload

    alert("sdasdasd");
  }

  ngOnInit(): void {

    this.files = [

      {
        image: '',
        uuId: '123',
        fileName: 'new folder',
        addedDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        modifiedDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        size: 10,
        uploadedByUser: 'me',
        fileType: {uuId: '23', type: 'directory', isActive: true}
      },
  
      {
        image: '',
        uuId: '123',
        fileName: 'new folder 1',
        addedDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        modifiedDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        size: 10,
        uploadedByUser: 'me',
        fileType: {uuId: '23', type: 'directory', isActive: true}
      },
      {
        image: '',
        uuId: '123',
        fileName: 'new folder 2',
        addedDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        modifiedDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        size: 10,
        uploadedByUser: 'me',
        fileType: {uuId: '23', type: 'directory', isActive: true}
      },
  
    ];

    this.files.forEach(file => {
      if(file.fileType.type == 'directory'){

        file.image = "/assets/images/folder.png";
      }
    })

  }

  rowClick(file: FilesDto){

    if(file.fileType.type == 'directory')
    {
      alert("Navigation to diretory : " + file.uuId);
    }
    
    if(file.fileType.type == 'video')
    {
      alert("Previewing video : " + file.uuId);
    }

    if(file.fileType.type == "audio"){

      alert("Previewing audio : " + file.uuId);
    }
  }

  onDragEnter(event:any){
    this.isInDrag = event;

    console.log("is in drag " + event);
  }

  onRightClick(event: MouseEvent){
    // event.preventDefault();

    // this.options.toggleMenu();
  }
}