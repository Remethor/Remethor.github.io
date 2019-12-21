console.log("Startup!");
global.sharedObj = {version: null, startMinecraft: null};
global.sharedObj.version = "0.0.1r";
global.sharedObj.startMinecraft = function () {
	exec('start '+process.cwd()+'/startMinecraft.bat');
	process.exit(0);
}