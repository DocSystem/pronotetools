var config = window.localStorage;
var isMobileAgent = (document.location.href.split("/").pop().split(".")[0] == "mobile");
var urlParams = new URLSearchParams(document.location.search);

if (config.getItem("pdp") == null) {
  config.setItem("pdp", "true");
}
if (config.getItem("autologin") == null) {
  config.setItem("autologin", "false");
}
if (config.getItem("autologininfos") == null) {
  config.setItem("autologininfos", JSON.stringify({}));
}
if (config.getItem("removeuseless") == null) {
  config.setItem("removeuseless", "false");
}
window.autologininfos = JSON.parse(config.getItem("autologininfos"));

function patchCSS() {
  var link = document.createElement("link");
  link.href = "https://docsystem.xyz/pronotetools/tools.css";
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

function patchSettings() {
  if (getCurrentPage() == "parametres") {
    if (document.getElementsByClassName("InlineBlock ipu_personnalisation")[0] != null) {
      var settings = document.getElementsByClassName("InlineBlock ipu_personnalisation")[0].parentNode.parentNode;
      if (document.getElementById('changepdpline') == null) {
        var pronotetoolssettings = `<div class="NoWrap EspaceGauche GrandEspaceHaut GrandEspaceBas CarteCompteZoneGenerique"><div class="WhiteSpaceNormal InlineBlock Gras AlignementHaut" style="width:160px; color:black;"><span class="GrandEspaceDroit CarteCompteZoneGenerique_Title">Pronote Tools</span></div><div class="InlineBlock ipu_personnalisation"><div id="changepdpline" class="ipu_personnalisation_ligne"><div onchange="changePdpStatus()">Photo de profil : <input type="radio" id="pdpEnabled" value="pdpEnabled" name="pdpStatus" checked=""><label for="pdpEnabled">Activé</label><input type="radio" id="pdpCustom" value="pdpCustom" name="pdpStatus"><label for="pdpCustom"><input type="url" value="" id="pdpCustomUrl" onclick="document.getElementById('pdpCustom').checked=true" onchange="changePdpStatus()" placeholder="Custom URL" style="width: 350px;"></label><input type="radio" id="pdpDisabled" value="pdpDisabled" name="pdpStatus"><label for="pdpDisabled">Désactivé</label></div></div><div id="changeapparenceline" class="ipu_personnalisation_ligne"><div class="oled_div"><input type="checkbox" name="uselessmode" id="uselessmode" onchange="changeUselessMode(this.checked)"><label for="uselessmode"> Cacher les objets inutiles</label></div></div><div id="changeacline" class="autoconnect_div ipu_personnalisation_ligne"><div><input type="checkbox" name="acenabled" id="acenabled" onchange="changeAutoconnect(this.checked)"><label for="acenabled"> Connexion automatique</label></div><div class="autoconnect_infos_div" disabled><div><label for="acuser">Nom d'utilisateur : </label><input type="text" name="acuser" id="acuser" onchange="changeAutoconnectData('user', this.value)"></div><div><label for="acpass">Mot de passe : </label><input type="password" name="acpass" id="acpass" onchange="changeAutoconnectData('pass', this.value)"></div></div></div><div id="resetline" class="ipu_personnalisation_ligne"><div><button onclick="resetConfig()">Réinitialiser Pronote Tools</button></div></div></div></div>`;
        pronotetoolssettings = new DOMParser().parseFromString(pronotetoolssettings, 'text/html');
        pronotetoolssettings = pronotetoolssettings.body.firstChild;
        settings.appendChild(pronotetoolssettings);
        if (config.getItem("pdp") == "false") {
          document.getElementById('pdpDisabled').setAttribute("checked", "");
        }
        else if ((config.getItem("pdp") != "true") && (config.getItem("pdp") != null)) {
          document.getElementById('pdpCustom').setAttribute("checked", "");
          document.getElementById('pdpCustomUrl').value = config.getItem("pdp")
        }
        if (config.getItem("removeuseless") == "true") {
          document.getElementById('uselessmode').checked = true;
        }
        if (urlParams.get("identifiant") != null) {
          document.getElementById('changeacline').setAttribute("disabled", "");
        }
        else if (config.getItem("autologin") == "true") {
          document.getElementById('acenabled').checked = true;
          document.querySelector(".autoconnect_infos_div").removeAttribute("disabled");
          if (window.autologininfos[document.location.href] !== undefined) {
            document.getElementById('acuser').value = window.autologininfos[document.location.href]["login"];
            document.getElementById('acpass').value = window.autologininfos[document.location.href]["pass"];
          }
        }
      }
    }
    if ((document.querySelector('#GInterface\\.Instances\\[0\\]\\.Instances\\[0\\]') != null) && (document.querySelector('#GInterface\\.Instances\\[0\\]\\.Instances\\[0\\]').childNodes.length == 1) && (document.querySelector('#GInterface\\.Instances\\[0\\]\\.Instances\\[0\\]').childNodes[0].classList == "FondBlanc Espace")) {
      var settings = document.querySelector('#GInterface\\.Instances\\[0\\]\\.Instances\\[0\\]')
      if (document.getElementById('changepdpline') == null) {
        var pronotetoolssettings = `<div class="FondBlanc Espace" style="border-bottom: 1px solid #c4c4c4;"><div class="left Gras">Photo de profil : </div><div onchange="changePdpStatus()" class="customSettingLine"><input type="radio" id="pdpEnabled" value="pdpEnabled" name="pdpStatus" checked=""><label for="pdpEnabled">Activé</label><input type="radio" id="pdpDisabled" value="pdpDisabled" name="pdpStatus"><label for="pdpDisabled">Désactivé</label><input type="radio" id="pdpCustom" value="pdpCustom" name="pdpStatus"><label for="pdpCustom"><input type="url" value="" id="pdpCustomUrl" onclick="document.getElementById('pdpCustom').checked=true" onchange="changePdpStatus()" placeholder="Custom URL" style="width: 350px;"></label></div><div class="clear"></div></div><div class="FondBlanc Espace" id="changeapparencelinemobile" style="border-bottom: 1px solid #c4c4c4;"><br><div class="customSettingLine right"><input type="checkbox" name="uselessmode" id="uselessmode" onchange="changeUselessMode(this.checked)"><label for="uselessmode"> Cacher les objets inutiles</label></div><div class="clear"></div></div><div class="FondBlanc Espace" style="border-bottom: 1px solid #c4c4c4;"><div class="left Gras">Connexion automatique : </div><div class="customSettingLine"><input type="checkbox" name="acenabled" id="acenabled" onchange="changeAutoconnect(this.checked)"><label for="acenabled">Activer la connexion automatique</label></div><div class="autoconnect_infos_div" disabled><div><label for="acuser">Nom d'utilisateur : </label><input type="text" name="acuser" id="acuser" onchange="changeAutoconnectData('user', this.value)"></div><div><label for="acpass">Mot de passe : </label><input type="password" name="acpass" id="acpass" onchange="changeAutoconnectData('pass', this.value)"></div></div><div class="clear"></div></div>`;
        pronotetoolssettings = new DOMParser().parseFromString(pronotetoolssettings, 'text/html');
        pronotetoolssettings.querySelectorAll(".FondBlanc.Espace").forEach((i) => {
          settings.appendChild(i);
        });
        if (config.getItem("pdp") == "false") {
          document.getElementById('pdpDisabled').setAttribute("checked", "");
        }
        else if ((config.getItem("pdp") != "true") && (config.getItem("pdp") != null)) {
          document.getElementById('pdpCustom').setAttribute("checked", "");
          document.getElementById('pdpCustomUrl').value = config.getItem("pdp")
        }
        if (config.getItem("removeuseless") == "true") {
          document.getElementById('uselessmode').checked = true;
        }
        if (urlParams.get("identifiant") != null) {
          document.getElementById('changeacline').setAttribute("disabled", "");
        }
        else if (config.getItem("autologin") == "true") {
          if (window.autologininfos[document.location.href] !== undefined) {
            document.getElementById('acenabled').checked = true;
            document.querySelector(".autoconnect_infos_div").removeAttribute("disabled");
            document.getElementById('acuser').value = window.autologininfos[document.location.href]["login"];
            document.getElementById('acpass').value = window.autologininfos[document.location.href]["pass"];
          }
        }
      }
    }
  }
}

window.pdpLoaded = false;
var originalPdp = "";

function patchPDP() {
  if (typeof GInterface == "object") {
    if (GInterface != null && GInterface.moteurConnexion == undefined) {
      if (config.getItem("pdp") != null) {
        try {
          if (isMobileAgent) {
            window.pdpElem = document.getElementById('GInterface.Instances[1]_photo').firstChild; // Mobile
          }
          else {
            window.pdpElem = document.querySelector("#GInterface\\.Instances\\[0\\]\\.Instances\\[0\\] > div > div.ibe_centre > div.ibe_util_photo.ibe_actif > img"); // Desktop
          }
        } catch { return }
        if (window.pdpLoaded == false) {
          try {
            window.originalPdpUrl = pdpElem.src;
            window.pdpLoaded = true;
          } catch { return }
        }
        $(".ibe_util_photo_i").attr("style", "display: block");
        if (window.pdpElem != null) {
          if (config.getItem("pdp") == "true") {
            window.pdpElem.src = window.originalPdpUrl;
            window.pdpElem.removeAttribute("hidden");
          }
          else if (config.getItem("pdp") == "false") {
            window.pdpElem.setAttribute("hidden", "");
          }
          else if (config.getItem("pdp") != null) {
            window.pdpElem.src = config.getItem("pdp");
            window.pdpElem.removeAttribute("hidden");
          }
        }
      }
    }
  }
}

/*function patchNotes() {
  if (getCurrentPage() == "notes") {
    if (document.querySelector("#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]") != null) {
      const notes = document.querySelectorAll("#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_Contenu_1 > tbody > tr > td:nth-child(2) > div > div > div > div > div > div:nth-child(1)");
      if (notes.length > 0) {
        for (var i in window.notes.customNotes) {
          if (notes[i].innerText != window.notes.customNotes[i] && notes[i].innerText != "") {
            notes[i].innerText = window.notes.customNotes[i];
          }
        }
        if (window.notes.customNotes[window.notes.currentlySelected] != undefined) {
          if (window.notes.lastPatched != window.notes.currentlySelected) {
            try {
              const noteElem = document.querySelector("#GInterface\\.Instances\\[2\\]_detail > div > div.BlocDevoirEvaluation_Contenu > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(1) > td.Gras");
              if (noteElem.innerText != window.notes.customNotes[window.notes.currentlySelected] && noteElem.innerText != "") {
                noteElem.innerText = window.notes.customNotes[window.notes.currentlySelected];
              }
            }
            catch {
              try {
                const noteElem = document.querySelector("#GInterface\\.Instances\\[2\\]_detail > div > div.BlocDevoirEvaluation_Contenu > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td.Gras");
                if (noteElem.innerText != window.notes.customNotes[window.notes.currentlySelected] && noteElem.innerText != "") {
                  noteElem.innerText = window.notes.customNotes[window.notes.currentlySelected];
                }
              } catch {}
            }
          }
        }
        window.notes.lastPatched = window.notes.currentlySelected;
      }
    }
  }
}*/

function patchUseless() {
  if (config.getItem("removeuseless") == "true") {
    if (typeof GInterface == "object") {
      if (GInterface != null && GInterface.moteurConnexion == undefined) {
        if (isMobileAgent) {
          try {
            document.querySelector(".footer-mobile").parentNode.removeChild(document.querySelector(".footer-mobile"));
          } catch {}
          try {
            document.querySelector(".smartbanner-container").parentNode.removeChild(document.querySelector(".smartbanner-container"))
          } catch {}
        }
        else {
          try {
            document.querySelector(".footer-wrapper").parentNode.removeChild(document.querySelector(".footer-wrapper"));
          } catch {}
          try {
            document.querySelector(".with-footer").classList.remove("with-footer");
          } catch {
            try {
              document.querySelector(".no-footer").classList.remove("no-footer");
            } catch {}
          }
        }
      }
    }
  }
}

function resetConfig() {
  config.removeItem("pdp");
  config.removeItem("customNotes");
  config.removeItem("autologin");
  config.removeItem("autologininfos");
  config.removeItem("removeuseless");
}

function changeOledMode(val) {
  patchCSS(config.getItem("mode"), val.toString());
  config.setItem("oled", val.toString());
}

function changeUselessMode(val) {
  config.setItem("removeuseless", val.toString());
  patchUseless();
}

function changePdpStatus() {
  if (document.getElementById('pdpEnabled').checked) {
    config.setItem("pdp", "true");
    patchPDP();
  }
  else if (document.getElementById('pdpCustom').checked) {
    config.setItem("pdp", document.getElementById('pdpCustomUrl').value);
    patchPDP();
  }
  else if (document.getElementById('pdpDisabled').checked) {
    config.setItem("pdp", "false");
    patchPDP();
  }
}

function makeAutoconnect() {
  if (getCurrentPage() == "connexion") {
    if (window.autologininfos[document.location.href] !== undefined) {
      window.makeAutoconnected = true;
      GInterface.moteurConnexion.setLogin(window.autologininfos[document.location.href]["login"]);
      GInterface.moteurConnexion.setMotDePasse(window.autologininfos[document.location.href]["pass"]);
      GInterface.moteurConnexion.identification();
    }
  }
}

function changeAutoconnect(newVal) {
  if (newVal == true) {
    document.querySelector(".autoconnect_infos_div").removeAttribute("disabled");
  }
  else {
    document.querySelector(".autoconnect_infos_div").setAttribute("disabled", "");
  }
  config.setItem("autologin", "true");
  window.autologininfos[document.location.href] = {}
  config.setItem("autologininfos", JSON.stringify(window.autologininfos))
}

function changeAutoconnectData(entry, newVal) {
  if (entry == "user") {
    window.autologininfos[document.location.href]["login"] = newVal;
    config.setItem("autologininfos", JSON.stringify(window.autologininfos))
  }
  else if (entry == "pass") {
    window.autologininfos[document.location.href]["pass"] = newVal;
    config.setItem("autologininfos", JSON.stringify(window.autologininfos))
  }
}

var pageLoaded = false;

$('body').on('DOMSubtreeModified', 'div[data-role="page"]', function(){
  if (getCurrentPage() == "parametres") {
    patchSettings();
  }
  else if (getCurrentPage() == "connexion") {
    if (window.makeAutoconnected != true) {
      makeAutoconnect();
    }
  }
  else if (getCurrentPage() == "notes") {
    if (document.querySelector("#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]") != null) {
      patchNotes();
    }
  }
  patchUseless();
  patchPDP();
});

window.onstorage = (e) => {
  if (e.key == "pdp") {
    patchPDP();
  }
};

/*window.notes = {};
window.notes.currentlySelected = 0;
if (config.getItem("customNotes") == null) {
  config.setItem("customNotes", JSON.stringify({}));
}
window.notes.customNotes = JSON.parse(config.getItem("customNotes"));*/

function getCurrentPage() {
  try {
    if ((typeof GEtatUtilisateur != "undefined") && (typeof GInterface != "undefined")) {
      if (GInterface == null) {
        return "deconnexion";
      }
      else if (GInterface.moteurConnexion != undefined) {
        return "connexion";
      }
      else if (GEtatUtilisateur.genreOnglet == 198) {
        return "notes";
      }
      else if (GEtatUtilisateur.genreOnglet == 7) {
        return "accueil";
      }
      else if (GEtatUtilisateur.genreOnglet == 144) {
        return "parametres"
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  }
  catch {
    if ((typeof GEtatUtilisateur != "undefined") && (typeof GInterface != "undefined")) {
      if (GInterface == null) {
        return "deconnexion";
      }
      else if (GEtatUtilisateur.genreOnglet == 198) {
        return "notes";
      }
      else if (GEtatUtilisateur.genreOnglet == 7) {
        return "accueil";
      }
      else if (GEtatUtilisateur.genreOnglet == 144) {
        return "parametres"
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  }
}

const callback = function(mutationsList, observer) {
  if (getCurrentPage() == "notes") {
    for(const mutation of mutationsList) {
      if (mutation.target.id.includes("_cadreSel_0") && mutation.removedNodes.length == 0) {
        window.notes.currentlySelected = parseInt(mutation.target.childNodes[0].id.split("__sel_")[1]);
        patchNotes();
      }
    }
  }
};
const observer = new MutationObserver(callback);
observer.observe(document.querySelector("body"), { attributes: false, childList: true, subtree: true });

/*document.oncontextmenu = function (e) {
  if (getCurrentPage() == "notes") {
    e.preventDefault();
    if (window.isContextMenuOpen != true) {
      window.menuElem = `<div class="notes_contextmenu" style="top: ` + e.y.toString() + `px; left: ` + e.x.toString() + `px;">Salut</div>`;
      window.menuElem = new DOMParser().parseFromString(window.menuElem, 'text/html');
      window.menuElem = window.menuElem.body.firstChild;
      document.body.appendChild(window.menuElem);
      window.isContextMenuOpen = true;
    }
    else {
      window.menuElem.parentNode.removeChild(window.menuElem)
      window.isContextMenuOpen = false;
    }
    const notes = document.querySelectorAll("#GInterface\\.Instances\\[2\\]\\.Instances\\[1\\]_Contenu_1 > tbody > tr > td:nth-child(2) > div > div > div > div > div > div:nth-child(1)");
    try {
      const noteElem = document.querySelector("#GInterface\\.Instances\\[2\\]_detail > div > div.BlocDevoirEvaluation_Contenu > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(1) > td.Gras");
      var newNote = prompt("Nouvelle note pour " + document.querySelector("#GInterface\\.Instances\\[2\\]_detail > div > div.BlocDevoirEvaluation_Contenu > div > table > tbody > tr:nth-child(1) > td > div").innerText + " :", noteElem.innerText);
      if (newNote != null) {
        noteElem.innerText = newNote;
        notes[window.notes.currentlySelected].innerText = newNote;
        window.notes.customNotes[window.notes.currentlySelected] = newNote;
        config.setItem("customNotes", JSON.stringify(window.notes.customNotes));
      }
    }
    catch {
      const noteElem = document.querySelector("#GInterface\\.Instances\\[2\\]_detail > div > div.BlocDevoirEvaluation_Contenu > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td.Gras");
      var newNote = prompt("Nouvelle note :", noteElem.innerText);
      if (newNote != null) {
        noteElem.innerText = newNote;
        notes[window.notes.currentlySelected].innerText = newNote;
        window.notes.customNotes[window.notes.currentlySelected] = newNote;
        config.setItem("customNotes", JSON.stringify(window.notes.customNotes));
      }
    }
  }
}*/

window.onclick = function (e) {
  if (window.isContextMenuOpen) {
    e.preventDefault();
    window.menuElem.parentNode.removeChild(window.menuElem)
    window.isContextMenuOpen = false;
  }
}

document.onreadystatechange = function (e) {
  setTimeout(makeAutoconnect, 2000);
}

patchCSS();
makeAutoconnect();
