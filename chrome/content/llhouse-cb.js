// Copyright © 2009-2011, 2014 Liquidity Lighthouse, LLC.  All Rights Reserved.
window.addEventListener("load",Sombrero_install_b,true);
function Sombrero_install_a() {      
    try {
        var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        var prefString = prefManager.getCharPref("extensions.LiquidityLighthouse");
        if(prefString==0)
        {
            var setString= prefManager.setCharPref("extensions.LiquidityLighthouse",1);
            const kToolBarID = "nav-bar";
            const kTBItemID = "llhouse-button";
            var tbElem = document.getElementById(kToolBarID);
            var tbItemElem = document.getElementById(kTBItemID);
            if(!tbItemElem){
                var newSet = tbElem.currentSet.replace(/urlbar-container/,'llhouse-button,urlbar-container');
                tbElem.setAttribute("currentset", newSet);
                tbElem.currentSet = newSet;
                document.persist(kToolBarID, "currentset");
            }
        }
        else return;
    } catch(e) { }   
}
function Sombrero_install_b() {
    try {
        var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        var prefString = prefManager.getCharPref("extensions.LiquidityLighthouse");
        if(prefString==0)
        {
            var setString= prefManager.setCharPref("extensions.LiquidityLighthouse",1);
            const kToolBarID = "nav-bar";
            const kTBItemID = "llhouse-button";
            var tbElem = document.getElementById(kToolBarID);
            var tbItemElem = document.getElementById(kTBItemID);
            if(!tbItemElem){
                var newSet = tbElem.currentSet;
                var sets = newSet.split(',');
                newSet = '';
                for(i=0; i<sets.length; i++){
                    if(i==0)
                        newSet += sets[i];
                    else if(i==2)
                        newSet += ',llhouse-button,' + sets[i];
                    else
                        newSet += ',' + sets[i];
                }
                tbElem.setAttribute("currentset", newSet);
                tbElem.currentSet = newSet;
                document.persist(kToolBarID, "currentset");
            }
        }
    }catch(e) {  }
}
function openAndReuseOneTabPerURL(url) {
  var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                     .getService(Components.interfaces.nsIWindowMediator);
  var browserEnumerator = wm.getEnumerator("navigator:browser");
  // Check each browser instance for our URL
  var found = false;
  while (!found && browserEnumerator.hasMoreElements()) {
    var browserWin = browserEnumerator.getNext();
    var tabbrowser = browserWin.gBrowser;
    // Check each tab of this browser instance
    var numTabs = tabbrowser.browsers.length;
    for (var index = 0; index < numTabs; index++) {
      var currentBrowser = tabbrowser.getBrowserAtIndex(index);
      if (currentBrowser.currentURI.spec.indexOf(url) >= 0) {                    // test 11-26
 //     if (url == currentBrowser.currentURI.spec) {
        // The URL is already opened. Select this tab.    11-26 replaced with the url search above
        tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];
        // Focus *this* browser-window
        browserWin.focus();
        found = true;
        break;
      }
    }
  }
  // Our URL isn't open. Open it now.
  if (!found) {
    var recentWindow = wm.getMostRecentWindow("navigator:browser");
    if (recentWindow) {
      // Use an existing browser window
      recentWindow.delayedOpenTab(url, null, null, null, null);
    }
    else {
      // No browser windows are open, so open a new one.
      window.open(url);
    }
  }
}
function loadllhouseUrl()
{
  openAndReuseOneTabPerURL("http://www.liquiditylighthouse.com/");    // 11-25-2014
}