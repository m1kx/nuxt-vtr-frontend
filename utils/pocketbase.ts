import PocketBase from 'pocketbase';
import { config } from "./config";

interface pb_dynamic {
  subjects_formatted: string;
}

class PB {
  instance: PocketBase;
  currentUser: any;
  data: pb_dynamic;
  constructor() {
    this.instance = new PocketBase(`https://${config.domain}`);
    this.currentUser = this.instance.authStore.model;
    this.data = {
      subjects_formatted: this.currentUser?.subjects,
    }
    this.instance.collection("users").subscribe("*", async (e) => {
      await this.instance.collection('users').authRefresh();
      this.update_data()
    })
    window.onfocus = async () => {
      await this.instance.collection('users').authRefresh();
      this.update_data()
    }
    window.onload = () => {
      this.update_data()
    }
    if (this.currentUser) {
      this.instance.collection('users').authRefresh();
      this.update_data()
    }
    this.instance.authStore.onChange((auth : any) => {
      console.log('auth changed ', this.instance.authStore.model)
      this.currentUser = this.instance.authStore.model;
      if (this.currentUser) {
        this.update_data()
      }
    });
  }

  update_data() {
    this.data.subjects_formatted = this.currentUser.subjects.replaceAll(":", ",");
  }
}

export const pb = new PB();