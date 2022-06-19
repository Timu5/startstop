const vscode = require('vscode');
const { exec } = require("child_process");

function sendState(port, value) {
	if (port == undefined) {
		return;
	}

	let data = value ? 'ON' : 'OFF';

	exec(`startstop led 0 ${data}`, (err, stdout, stderr) => { });
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Starting Start Stop Button Extension');

	let debugging = false;

	vscode.debug.onDidChangeActiveDebugSession((e) => {
		if (e == undefined) {
			// session stopped
			console.log("Stopping debugging");
			debugging = false;
		}
		else {
			// session started
			console.log("Starting debugging");
			debugging = true;
		}
		sendState(port, debugging);
	});
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
