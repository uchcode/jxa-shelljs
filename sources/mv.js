function mv(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && mv ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && mv ${args.join(' ')}`
    }
    doShell(script)
}
