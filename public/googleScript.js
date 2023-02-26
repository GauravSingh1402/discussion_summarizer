// public/googleScript.js

function loadGoogleScript() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = function () {
      gapi.load("auth2", function () {
        gapi.auth2.init({
          client_id: "817227737090-2ek8j1iknjhmbmhkbd9o9r8i4n30lqi4.apps.googleusercontent.com",
        });
      });
    };
    document.body.appendChild(script);
  }
  
  export default loadGoogleScript;
  