import PocketBase, { Admin } from 'pocketbase';
import { config } from "./config"

class PB {
  instance: PocketBase;
  currentUser: any;
  constructor() {
    this.instance = new PocketBase(`https://${config.domain}`);
    this.currentUser = this.instance.authStore.model;
    if (this.currentUser) {
      this.instance.collection('users').authRefresh();
    }
    this.instance.authStore.onChange((auth : any) => {
      console.log('auth changed ', this.instance.authStore.model)
      this.currentUser = this.instance.authStore.model;
    });
  }
}

export const pb = new PB();