let sdkPromise = null;

export function loadFacebookSdk(appId) {
  if (!appId) {
    return Promise.reject(new Error("Facebook App ID is not configured"));
  }

  if (sdkPromise) {
    return sdkPromise;
  }

  sdkPromise = new Promise((resolve, reject) => {
    if (window.FB) {
      resolve(window.FB);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: false,
        version: "v21.0",
      });
      resolve(window.FB);
    };

    const existingScript = document.getElementById("facebook-jssdk");
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.FB) {
          resolve(window.FB);
        }
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Failed to load Facebook SDK"));
    document.body.appendChild(script);
  });

  return sdkPromise;
}
