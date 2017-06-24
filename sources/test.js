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
