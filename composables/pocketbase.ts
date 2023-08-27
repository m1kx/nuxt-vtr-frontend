import PocketBase from 'pocketbase';

const pb = new PocketBase('https://api.mikaco.de:443');
pb.collection("users").subscribe("*", async (e) => {
  if (!pb.authStore.model) return;
  await pb.collection('users').authRefresh();
})


export const usePocketbase = () => {
  return pb;
}