import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  path: string = "";
  hasParent: boolean = false;
  parentId: string = "";

  constructor(private contentService: ContentService) { }

  

  ngOnInit(): void {

    this.contentService.navigatedToDirectory.subscribe((data) => {

      this.path = this.contentService.currentFolderPath;
      

      this.hasParent = this.contentService.currentFolderHasParent;
      this.parentId = this.contentService.currentFolderParentId;
    });
  }

  navigateToParent(){

    this.contentService.navigateToFolder(this.parentId);
  }
}