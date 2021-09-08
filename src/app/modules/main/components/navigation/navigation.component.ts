import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  path: string = "";

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {

    this.path = this.contentService.navPath;
  }
}