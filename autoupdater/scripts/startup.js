console.log("Startup!");
global.sharedObj = {version: null, startMinecraft: null, resetConfig: null, redownloadMods: null};
global.sharedObj.version = "0.1.2r";
global.sharedObj.resetConfig = function () {
	deleteFolderRecursive("./minecraft/.minecraft/config/Embassy");
	fs.unlinkSync("./minecraft/.minecraft/config/betterhud.cfg");
	console.log("Pulling config");
	downloadFile('https://remethor.github.io/autoupdater/config/betterhud.cfg', './minecraft/.minecraft/config/betterhud.cfg', function(){
		console.log("Done!");
	});
}
global.sharedObj.resetConfig();
global.sharedObj.startMinecraft = function () {
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