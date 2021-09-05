import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DirectoriesDto } from '../../models/DirectoriesDto';

const TREE_DATA: DirectoriesDto[] = [
  {
    uuId: '1',
    name: 'Fruit',
    children: [
      {
        uuId: '10',
        name: 'Apple'
      },
      {
        uuId: '11',
        name: 'Banana'
      },

      {
        uuId: '12',
        name: 'Fruit loops'
      },
    ]
  }, {
    uuId: '2',
    name: 'Vegetables',
    children: [
      {
        uuId: '20',
        name: 'Green',
        children: [
          {uuId: '30', name: 'Broccoli'},
          {uuId: '34', name: 'Brussels sprouts', children: [{
            uuId: '2',
            name: 'Vegetables',
            children: [
              {
                uuId: '20',
                name: 'Green',
                children: [
                  {uuId: '30', name: 'Broccoli'},
                  {uuId: '34', name: 'Brussels sprouts', children: [{
                    uuId: '2',
                    name: 'Vegetables',
                    children: [
                      {
                        uuId: '20',
                        name: 'Green',
                        children: [
                          {uuId: '30', name: 'Broccoli'},
                          {uuId: '34', name: 'Brussels sprouts'},
                        ]
                      }, 
                    ]
                  },]},
                ]
              }, 
            ]
          },]},
        ]
      }, 
    ]
  },
];

@Component({
  selector: 'app-quick-navigation',
  templateUrl: './quick-navigation.component.html',
  styleUrls: ['./quick-navigation.component.css']
})
export class QuickNavigationComponent implements OnInit {

  treeControl = new NestedTreeControl<DirectoriesDto>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DirectoriesDto>();

  hasChild = (_: number, node: DirectoriesDto) => !!node.children && node.children.length > 0;

  constructor() {

    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
  }

  nodeClicked(node: DirectoriesDto){



    alert(node.name);
  }

}
