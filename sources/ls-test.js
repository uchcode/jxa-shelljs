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

function ls(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && ls ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && ls ${args.join(' ')}`
    }
    let ret = doShell(script)
    return ret ? ret.split('\n') : []
}

console.log(JSON.stringify(ls('-la', '~/')))
console.log(JSON.stringify(ls('~/')))
console.log(JSON.stringify(ls()))
