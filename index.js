function userBrowser() {
  if (['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
    return "ios";
  }
  else if (/(android)/i.test(navigator.userAgent)) {
    if (navigator.userAgent.indexOf("Firefox") > 0) {
      return "firefox";
    }
    else {
      return "android";
    }
  }
  else if (navigator.userAgent.match(/Opera|OPR\//)) {
    return "opera";
  }
  else if (navigator.userAgent.indexOf("Edge") > -1) {
    return "edge_old";
  }
  else if (navigator.userAgent.indexOf("Edg") > -1) {
    return "edge";
  }
  if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
    return "chrome";
  }
  else if (navigator.userAgent.indexOf("Firefox") > 0) {
    return "firefox";
  }
  else if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    return "safari";
  }
}

function setDownloadButton() {
  const downloadDiv = document.getElementById('browser-download');
  if (userBrowser() == "chrome") {
    downloadDiv.innerHTML = `<a href="https://chrome.google.com/webstore/detail/pronote-tools/hpafamfiapepcmikhahoolhoielfblpp"><img src="https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png" alt="Voir dans le Chrome Web Store" /></a>`;
  }
  else if (userBrowser() == "firefox") {
    downloadDiv.innerHTML = `<a href="https://addons.mozilla.org/fr/firefox/addon/pronote-tools/"><img src="https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/addons/files/2015/11/get-the-addon.png" alt="Voir dans Firefox Add-Ons" /></a>`;
  }
  /*else if (userBrowser() == "opera") {
    downloadDiv.innerHTML = `<a href="https://addons.opera.com/fr/extensions/details/pronote-tools/"><img src="https://dev.opera.com/extensions/branding-guidelines/addons_206x58_en@2x.png" height="58px" alt="Voir dans Opera Add-Ons" /></a>`;
  }*/
  else if (userBrowser() == "edge") {
    downloadDiv.innerHTML = `<a href="https://chrome.google.com/webstore/detail/pronote-tools/hpafamfiapepcmikhahoolhoielfblpp"><img src="https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png" alt="Voir dans le Chrome Web Store" /></a>`;
    //downloadDiv.innerHTML = `<a href='//www.microsoft.com/store/productId/0RDCKDSHJ1HB?cid=storebadge&ocid=badge'><img src='https://developer.microsoft.com/store/badges/images/English_get-it-from-MS.png' alt='English badge' style='height: 58px;'/></a>`;
  }
  else if (userBrowser() == "safari") {
    downloadDiv.innerHTML = `<a href="safari/pronote-tools-macOS.zip" class="download-button">Télécharger pour Safari (macOS)</a>`;
  }
  else if (userBrowser() == "ios") {
    downloadDiv.innerHTML = `<a href="https://routinehub.co/shortcut/8359/" class="download-button">Obtenir le raccourci</a>`;
  }
  else if (userBrowser() == "android") {
    downloadDiv.innerHTML = `<p class="browser-notworking-text">Cet appareil n'est pas compatible</p>`;
  }
  else {
    downloadDiv.innerHTML = `<p class="browser-notworking-text">Ce navigateur n'est pas compatible. Vous pouvez tout de même essayer l'<a href="injection-manuelle">injection manuelle</a></p>`;
  }
}

function showBrowsers() {
  document.querySelector(".other_browsers").classList.toggle("hidden");
}

setDownloadButton();
