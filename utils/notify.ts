function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

async function subscribe() {
  try {
    const registration = await navigator.serviceWorker.ready
    const vapidPublicKey = 'BOYI_ijgk8RgymTmVmEu9_Kmtpun5-R790EByhTQ26Ba33WRo3LOg93BhUAFD3cvnVaCCR9tyH1lMiN8xuDlDbA';
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
    await pb.instance.collection('users').update(pb.currentUser.id, {"notifications": JSON.stringify(subscription)});
    return true
  } catch (error) {
    console.log(error) //
    alert("Error: Version nicht unterstuetzt /\nBenachrichtigungen abgelehnt")
    return false
  }
}

var registration: ServiceWorkerRegistration;

export default {
  subscribe: subscribe,
  // @ts-ignore
  registration
}