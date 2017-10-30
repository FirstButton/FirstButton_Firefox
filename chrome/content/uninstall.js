// Copyright © 2009-2011 Liquidity Lighthouse, LLC.  All Rights Reserved.
const EXTENSION_UUID = "llhouse-custom-button@liquiditylighthouse.com";
function initializeOverlay() {
UninstallObserver.register();
}
var UninstallObserver = {
_uninstall : false,
observe : function(subject, topic, data) {
  if (topic == "em-action-requested") {
    subject.QueryInterface(Components.interfaces.nsIUpdateItem);
    if (subject.id == EXTENSION_UUID) {
      if (data == "item-uninstalled") {
        this._uninstall = true;
      } else if (data == "item-cancel-action") {
        this._uninstall = false;
      }
    }
  } else if (topic == "quit-application-granted") {
    if (this._uninstall) {
        var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        var prefString = prefManager.getCharPref("extensions.LiquidityLighthouse");
        prefManager.setCharPref("extensions.LiquidityLighthouse",0);
    }
    this.unregister();
  }
},
register : function() {
 var observerService =
   Components.classes["@mozilla.org/observer-service;1"].
     getService(Components.interfaces.nsIObserverService);

 observerService.addObserver(this, "em-action-requested", false);
 observerService.addObserver(this, "quit-application-granted", false);
},
unregister : function() {
  var observerService =
    Components.classes["@mozilla.org/observer-service;1"].
      getService(Components.interfaces.nsIObserverService);

  observerService.removeObserver(this,"em-action-requested");
  observerService.removeObserver(this,"quit-application-granted");
}
}
window.addEventListener("load", initializeOverlay, false);