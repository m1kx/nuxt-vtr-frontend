/*import PocketBase from 'pocketbase';
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
      this.refresh();
    })
    this.instance.authStore.onChange(async (auth : any) => {
      console.log('auth changed ', this.instance.authStore.model)
      this.currentUser = this.instance.authStore.model;
    });
  }

  async refresh() {
    await this.instance.collection('users').authRefresh();
    await this.update_data();
    return true
  }

  async update_data() {
    this.data.subjects_formatted = pb.currentUser.subjects.replaceAll(":", ",");
    return true
  }
}

export const pb = new PB();*/