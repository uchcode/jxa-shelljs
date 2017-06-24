function dirs(opt) {
    if (opt && typeof opt !== 'string') {
        throw new Error("which: invalid argument: opt")
    }
    if (opt) {
        if (opt === '-c') {
            directoryStack.length = 0
        } else {
            throw new Error(`which: invalid argument: opt: '${opt}'`)
        }
    }
    let ary = directoryStack.concat()
    ary.push(pwd())
    ary.reverse()
    return ary
}
