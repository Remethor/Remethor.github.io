console.log("Startup!");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

global.sharedObj = {version: "Error", nick: "Player"+Math.floor(Math.random()*100), uuid: "uuid"};
global.sharedObj.version = "0.1.2r";
global.sharedObj.resetConfig = function () {
	deleteFolderRecursive("./minecraft/.minecraft/config/Embassy");
	if(fs.existsSync("./minecraft/.minecraft/config/betterhud.cfg")){
		fs.unlinkSync("./minecraft/.minecraft/config/betterhud.cfg");
		console.log("Pulling config");
		downloadFile('https://remethor.github.io/autoupdater/config/betterhud.cfg', './minecraft/.minecraft/config/betterhud.cfg', function(){
		console.log("Done!");
	});
	}
}
global.sharedObj.startMinecraft = function () {
	exec('start '+process.cwd()+'/startMinecraft.bat');
	process.exit(0);
}
global.sharedObj.redownloadIndex = function () {
	if(fs.existsSync("./index.html")){
		fs.unlinkSync("./index.html");
	}
	if(fs.existsSync("./style.css")){
		fs.unlinkSync("./style.css");
	}
	downloadFile('https://remethor.github.io/autoupdater/index.html', './index.html');
	downloadFile('https://remethor.github.io/autoupdater/style.css', './style.css');
}
global.sharedObj.redownloadMods = function () {
	let modsArray = remethorSettings.mods;
    deleteFolderRecursive('./miencraft/.minecraft/mods');
    mkDir("./minecraft/.minecraft/mods");
    for(let i=0;i<modsArray.length;i++){
    	downloadFile('https://remethor.github.io/autoupdater/mods/'+modsArray[i], './minecraft/.minecraft/mods/'+modsArray[i]);
    }
}



global.sharedObj.resetConfig();
global.sharedObj.redownloadIndex();
