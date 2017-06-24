let Applet = Application.currentApplication()
Applet.includeStandardAdditions = true
function doShell(script, opt={}) {
    return Applet.doShellScript(script, {
        administratorPrivileges: !!opt.withPrompt,
        withPrompt: opt.withPrompt ? opt.withPrompt : '',
        alteringLineEndings: opt.alteringLineEndings ? opt.alteringLineEndings : false
    }).trim()
}
function pwd() {
    return $.NSFileManager.defaultManager.currentDirectoryPath.js
}

function which(cmd) {
    if(!cmd) {
        throw new Error("which: missing argument: cmd");
    }
    try {
        return doShell(`cd "${pwd()}" && which ${cmd}`);
    } catch(e) {
        throw new Error(`which: ${cmd}: command not found`);
    }
}

which('osascript')
