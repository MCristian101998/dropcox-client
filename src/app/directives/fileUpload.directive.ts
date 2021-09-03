  
import { Directive,Output, EventEmitter, HostBinding, HostListener, HostBindingDecorator } from '@angular/core';

@Directive({
  selector: '[appUpload]'
})

export class UploadDirective {

  @Output() onFileDropped = new EventEmitter<any>();
  @Output() onDragEnter = new EventEmitter<any>();


  @HostBinding('class.dragOver') public isActive: boolean = false;
  @HostBinding('style.opacity') public opacity = '1';

  //Dragover listener, when something is dragged over our host element
  @HostListener('dragover', ['$event']) onDragOver(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();

    this.isActive = true;
    this.opacity = '0.8'

    this.onDragEnter.emit(true);

  };

  //Dragleave listener, when something is dragged away from our host element
  @HostListener('dragleave', ['$event']) public onDragLeave(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '1'
    this.isActive = false;

    this.onDragEnter.emit(false);
  }

  @HostListener('drop', ['$event']) public ondrop(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '1';
    this.isActive = false;

    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }

    this.onDragEnter.emit(false);
  }

  constructor() { }

}