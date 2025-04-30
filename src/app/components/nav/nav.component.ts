import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [MatSidenavModule,MatNavList,RouterModule,MatDividerModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
