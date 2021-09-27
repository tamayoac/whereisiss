import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() latitude!: any;
  @Input() longitude!: any;
  @Input() velocity!: any;
  @Input() altitude!: any;
  @Input() time!: any;

  constructor() {}
  
  ngOnInit(): void {
  
  }


}
