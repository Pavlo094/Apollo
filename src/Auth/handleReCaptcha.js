let cbFromComponent;

export function onLoadReCaptcha() {
  if (cbFromComponent) {
    cbFromComponent();
  }
}

export function setOnLoadReCaptchaCallback(cb) {
  cbFromComponent = cb;
}
