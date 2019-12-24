console.log('Startup!');

let contents = win.webContents;

win.removeMenu();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function waitForDownload() {
	await sleep(100);
	win.loadFile(process.cwd()+'/index.html');
	contents.executeJavaScript('document.getElementById("Zagraj").disabled = true;');
	await sleep(300);
	contents.reload();
	win.webContents.executeJavaScript('document.getElementById("Zagraj").disabled = true;');
	await sleep(300);
	contents.reload();
	contents.executeJavaScript('document.getElementById("Zagraj").disabled = true;');
	await sleep(5000);
	contents.executeJavaScript('document.getElementById("Zagraj").disabled = false;');
}

global.sharedObj = {version: 'Error', nick: 'Player'+Math.floor(Math.random()*100), uuid: 'uuid'};
global.sharedObj.version = '0.2.0r';
global.sharedObj.resetConfig = function () {
	deleteFolderRecursive('./minecraft/.minecraft/config/Embassy');
	if(fs.existsSync('./minecraft/.minecraft/config/betterhud.cfg')){
		fs.unlinkSync('./minecraft/.minecraft/config/betterhud.cfg');
		console.log('Pulling config');
		downloadFile('https://remethor.github.io/autoupdater/config/betterhud.cfg', './minecraft/.minecraft/config/betterhud.cfg', function(){
		console.log('Done!');
	});
	}
}
global.sharedObj.startMinecraft = function (nick) {
	let uuid = '71f3f1c7398201f2375c6775db3514a9';
	let maxMem = 6;
	let minMem = 2;
	if(nick != null && fs.existsSync('./nick.txt')){
		fs.unlinkSync('./nick.txt');
	}
	if(nick != null)
		exec('echo '+nick+' >> nick.txt');
	exec('start '+process.cwd()+'/startMinecraft.bat');
	process.exit(0);
}
global.sharedObj.redownloadIndex = function () {
	if(fs.existsSync('./index.html')){
		fs.unlinkSync('./index.html');
	}
	if(fs.existsSync('./style.css')){
		fs.unlinkSync('./style.css');
	}
	if(fs.existsSync('./logo.png')){
		fs.unlinkSync('./logo.png');
	}
	downloadFile('https://remethor.github.io/autoupdater/index.html', './index.html');
	downloadFile('https://remethor.github.io/autoupdater/style.css', './style.css');
	downloadFile('https://remethor.github.io/autoupdater/logo.png', './logo.png');
	waitForDownload();
	if(fs.existsSync('./startMinecraft.bat')){
		fs.unlinkSync('./startMinecraft.bat');
	}
	downloadFile('https://remethor.github.io/autoupdater/startMinecraft.bat', './startMinecraft.bat');
}
global.sharedObj.redownloadMods = function () {
	let modsArray = remethorSettings.mods;
    deleteFolderRecursive('./minecraft/.minecraft/mods');
    mkDir('./minecraft/.minecraft/mods');
    for(let i=0;i<modsArray.length;i++){
    	downloadFile('https://remethor.github.io/autoupdater/mods/'+modsArray[i], './minecraft/.minecraft/mods/'+modsArray[i]);
    }
    let libsArray = remethorSettings.javaLibraries;
    for(let i=0;i<libsArray.length;i++){
    	downloadFile('https://remethor.github.io/autoupdater/javaLibraries/'+libsArray[i], './minecraft/javaLibraries/'+libsArray[i]);
    }
}
global.sharedObj.resetConfig();
global.sharedObj.redownloadIndex();

