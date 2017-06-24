function mkdir(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && mkdir ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && mkdir ${args.join(' ')}`
    }
    doShell(script)
}
