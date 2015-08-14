//icon image:  http://www.flaticon.com/free-icon/pie-graph_87100
/*******************************************/
var version_name = chrome.runtime.getManifest().version_name;
version_name = version_name.split(" ");

var ext_version = "test";
if (version_name.length >= 2) {
	ext_version = version_name[1];
}
console.log("ext_version: " + ext_version);


/*******************************************/


function debugConsole(message) {
	if (ext_version == "develop") {
		console.log('%c ' + message + ' ', 'background: #006600; color: white');
	}
}