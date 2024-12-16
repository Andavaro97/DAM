import { Component, OnInit } from '@angular/core';
import { popUpData } from '../types/popUpData';
import { CommonModule } from '@angular/common';
import { PopUpService } from '../services/popup-service';

@Component({
  selector: 'app-popUp-component',
  templateUrl: 'popUp.component.html',
  styleUrls: ['popUp.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class PopUpComponent implements OnInit {
  constructor(public popUpService: PopUpService) {}

  onClose() {
    this.popUpService.setIsOpen(false);
  }

  ngOnInit() {}
}
