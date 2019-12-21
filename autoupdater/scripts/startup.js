console.log("Startup!");
document.getElementById("version").innerHTML = "0.1.1v";
let startMinecraft = function () {
	exec('start '+process.cwd()+'/minecraft/startMinecraft.bat');
}