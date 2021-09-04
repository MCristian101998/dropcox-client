import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { SidenavSerive } from '../../services/sidenav.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit, AfterViewInit {

  public isScreenSmall?: boolean;
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private sidenavService: SidenavSerive,
  ) {}

  ngOnInit(): void {

    this.breakpointObserver
      // .observe([Breakpoints.XSmall]) predefined breakpoint
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) =>{

        this.isScreenSmall = state.matches;
      });

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }

  ngAfterViewInit(): void{
    this.sidenavService.setSidenav(this.sidenav);
  }
}
