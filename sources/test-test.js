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

function test(...args) {
    try {
        if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
            var script = `cd "${pwd()}" && test ${args[0].join(' ')}`
        } else {
            var script = `cd "${pwd()}" && test ${args.join(' ')}`
        }
        doShell(script)
        return true
    } catch(e) {
        return false
    }
}

console.log( test(['-e', 'test-test.js']) )
console.log( test('-e', 'test-test-test.js') )
