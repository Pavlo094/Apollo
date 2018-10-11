var handleReCaptchaLoaded;

var reCaptchaInterface = (function() {
  var isRecaptchaLoaded = false;
  var onLoadedCallback;

  function handleLoaded() {
    if (onLoadedCallback !== undefined) {
      isRecaptchaLoaded = true;
      onLoadedCallback();
    }
  }

  handleReCaptchaLoaded = handleLoaded;

  return {
    checkIfLoaded: function() {
      return isRecaptchaLoaded;
    },
    setCallbackFunction: function(cb) {
      onLoadedCallback = cb;
    }
  }
})();
