const vscode = require('vscode');
const { exec } = require("child_process");
const path = require('node:path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Starting Start Stop Button Extension');

	let debugging = false;
	const extensionPath = context.extensionPath;

	const sendState = (value) => {
		let data = value ? 'ON' : 'OFF';
		let cmd = path.format({ dir: extensionPath, base: 'startstop.py' });
		exec(`python ${cmd} led 0 ${data}`, (err, stdout, stderr) => { });
	};

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
		sendState(debugging);
	});
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
