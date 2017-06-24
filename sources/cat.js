function cat(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        return `cd "${pwd()}" && cat ${args[0].join(' ')}`
    } else {
        return `cd "${pwd()}" && cat ${args.join(' ')}`
    }
}
