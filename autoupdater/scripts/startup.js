console.log("Startup!");
global.sharedObj = {version: null, startMinecraft: null, resetConfig: null, redownloadMods: null};
global.sharedObj.version = "0.0.1r";
global.sharedObj.resetConfig = function () {
	deleteFolderRecursive("./minecraft/.minecraft/config/Embassy");
	deleteFolderRecursive("./minecraft/.minecraft/config/betterhud.cfg");
	downloadFile('https://remethor.github.io/autoupdater/config/betterhud.cfg', './minecraft/.minecraft/config/betterhud.cfg', function(){
		console.log("done");
	});
}
global.sharedObj.startMinecraft = function () {
	global.sharedObj.resetConfig();
	exec('start '+process.cwd()+'/startMinecraft.bat');
	process.exit(0);
}
global.sharedObj.redownloadMods = function () {
	let modsArray = remethorSettings.mods;
    deleteFolderRecursive('./miencraft/.minecraft/mods');
    mkDir("./minecraft/.minecraft/mods");
    for(let i=0;i<modsArray.length;i++){
    	downloadFile('https://remethor.github.io/autoupdater/mods/'+modsArray[i], './minecraft/.minecraft/mods/'+modsArray[i]);
    }
}