import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { UserService } from 'src/app/shared/services/user.service';
import { DirectoriesDto } from '../../models/DirectoriesDto';
import { ContentService } from '../../services/content.service';
import { QuickNavigationService } from '../../services/quick-navigation.service';

@Component({
  selector: 'app-quick-navigation',
  templateUrl: './quick-navigation.component.html',
  styleUrls: ['./quick-navigation.component.css']
})
export class QuickNavigationComponent implements OnInit {

  treeControl = new NestedTreeControl<DirectoriesDto>(node => node.subfolders);
  dataSource = new MatTreeNestedDataSource<DirectoriesDto>();

  hasChild = (_: number, node: DirectoriesDto) => !!node.subfolders && node.subfolders.length > 0;

  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private snackBarService: SnackBarService) {

  }

  ngOnInit(): void {

    const currentUser = this.userService.getCurrentUser();

    if(currentUser == null){
      this.snackBarService.openSnackBar('Something went wrong ! Please Reload');
      return;
    }

    this.contentService.populateDirectories();
    this.dataSource.data = this.contentService.directories;
  }

  nodeClicked(node: DirectoriesDto){
    this.contentService.navigateToFolder(node);
  }
}