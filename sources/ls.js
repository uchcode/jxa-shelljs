function ls(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && ls ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && ls ${args.join(' ')}`
    }
    let ret = doShell(script)
    return ret ? ret.split('\n') : []
}
