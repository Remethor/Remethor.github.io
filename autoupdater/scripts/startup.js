console.log("Startup!");
global.sharedObj = {version: null, startMinecraft: null, resetConfig: null};
global.sharedObj.version = "0.0.1r";
global.sharedObj.resetConfig = function () {
	deleteFolderRecursive("./minecraft/.minecraft/config/Embassy");
}
global.sharedObj.startMinecraft = function () {
	global.sharedObj.resetConfig();
	exec('start '+process.cwd()+'/startMinecraft.bat');
	process.exit(0);
}