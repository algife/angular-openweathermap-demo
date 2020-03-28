import { Injectable } from '@angular/core';
import { IState } from '@models/store-state/state';

@Injectable({ providedIn: 'root' })
export class StoreService {
  // ! The state cannot be modified directly from outside of the store
  private storeState: IState;

  // Getters
  public get state() {
    return this.storeState;
  }

  constructor() {
    this.initState();
  }

  private initState() {
    this.storeState = {
      cityWeathers: null
    };
  }
}
