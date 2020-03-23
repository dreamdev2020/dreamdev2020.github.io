// ==UserScript==
// @name         Legend Express Agar.io Extension
// @namespace    Legend Express Agario Mod
// @version      1.7
// @description  Agario Mod - Legend,Ogario,Kitty,Old Skins,Animated Skins,Language Packs,Manual User Scripts,Chat,60++ Macros/Hotkeys(Tricksplit,Doublesplit,Quick Feeding,Popsplit,Auto Coins,Freeze Cell Macro,Auto respawn)
// @homepage     https://www.legendmod.ml
// @author       Jimboy3100
// @license      MIT
// @icon         https://legendmod.ml/banners/CropedImage128.gif
// @match        https://agar.io/*
// @match        https://play.google.com/*
// @downloadURL  https://legendmod.ml/LMexpress/LMexpress.user.js
// @updateURL    https://legendmod.ml/LMexpress/LMexpress.user.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      hslo.io
// @connect	 agartool.io
// @connect	 imasters.org.ru
// @connect	 cdn.ogario.ovh
// @connect      deltav4.glitch.me
// @connect      dreamdev2020.github.io/
// ==/UserScript==

// Legend Mod by Jimboy3100
/*MIT License*/

// Check location
if (location.host === "agar.io" && location.pathname === "/") {
    var url = window.location.href;
    localStorage.setItem("url", url);
    location.href = "https://agar.io/legendmod" + location.hash;
    return;
}
var modVersion = GM_info.script.version;
// Inject Legend
function inject(page) {
    var page = page.replace("</body>", "<script>init('" + modVersion + "');</script>" + "</body>");
    return page;
}
document.documentElement.innerHTML = "";
var LMdetails;
var mode = location.pathname.slice(1);
var modwebsite;
switch (mode) {
    case 'normal':
        modwebsite = 'https://agar.io';
        Htmlscript(modwebsite);
        break;
    case 'hslo':
        modwebsite = 'https://hslo.io/install.user.js';
        Userscript(modwebsite);
        break;
    case 'agartool':
        modwebsite = 'https://www.agartool.io/agartool.user.js';
        Userscript(modwebsite);
        break;
    case 'vanilla':
        modwebsite = 'http://imasters.org.ru/agar/js/vanilla.user.js';
        Userscript(modwebsite);
        break;		
    case 'ogario':
        modwebsite = 'https://cdn.ogario.ovh/v4/beta/ogario.v4.user.js';
        Userscript(modwebsite);
        break;
    case 'delta':
        modwebsite = 'https://deltav4.glitch.me/v4/index.html';
        Htmlscript(modwebsite);
        break;
    case 'neo': 
        modwebsite = 'https://dreamdev2020.github.io/legendmod/LMexpress.html';
        Htmlscript(modwebsite);
		setTimeout(function() {		
			modwebsite = 'https://legendmod.ml/ExampleScripts/Neoprivate.js';
			Userscript(modwebsite);
		}, 5000);
	break;	
    case 'mobile': 
        modwebsite = 'https://dreamdev2020.github.io/legendmod/LMexpress.html';
        Htmlscript(modwebsite);
		setTimeout(function() {		
			modwebsite = 'https://legendmod.ml/ExampleScripts/gamepad.user.js';
			Userscript(modwebsite);
		}, 5000);
	break;			
    case 'legendmod': default:
        modwebsite = 'https://dreamdev2020.github.io/legendmod/LMexpress.html';
        Htmlscript(modwebsite);
        break;
}

function Htmlscript(modwebsite) {
    LMdetails = GM_xmlhttpRequest({
        method: "GET",
        url: modwebsite,
        synchronous: false,
        onload: function(legend) {
            var doc = inject(legend.responseText);
            document.open();
            document.write(doc);
            setTimeout(function() {
                window.history.pushState(null, null, "/");
            }, 2000);
            document.close();
        }
    });
}

function Userscript(modwebsite) {
    LMdetails = GM_xmlhttpRequest({
        method: "GET",
        url: modwebsite,
        onload: function(e) {
            new Function(['GM_info, GM_xmlhttpRequest'], e.responseText)(GM_info, GM_xmlhttpRequest);
        }
    });
}

if (location.host == "play.google.com") {
    window.close();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
