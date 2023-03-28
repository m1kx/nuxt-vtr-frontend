function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

function subscribe() {
  navigator.serviceWorker.ready
    .then(function(registration) {
      const vapidPublicKey = 'BOYI_ijgk8RgymTmVmEu9_Kmtpun5-R790EByhTQ26Ba33WRo3LOg93BhUAFD3cvnVaCCR9tyH1lMiN8xuDlDbA';

      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    })
    .then(function(subscription) {
      console.log(
        JSON.stringify({
          subscription: subscription,
        })
      );
      document.body.innerHTML = JSON.stringify(subscription)
    }).catch((e: Error) => {
      console.log(e)
      document.body.innerHTML = e.message
    } )
}

var registration: ServiceWorkerRegistration;

export default {
  subscribe: subscribe,
  // @ts-ignore
  registration
}