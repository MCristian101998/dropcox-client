import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor() { }

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