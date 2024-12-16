import { Injectable } from '@angular/core';
import { popUpData } from '../types/popUpData';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  public isOpen: boolean = false;
  public popUpData: any = [1, 2, 3, 4, 5, 5, 5];

  constructor() {}

  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  getIsOpen(): boolean {
    return this.isOpen;
  }

  setPopUpData(popUpData: popUpData) {
    this.popUpData = popUpData;
  }

  public getPopUpData() {
    return this.popUpData;
  }
}
