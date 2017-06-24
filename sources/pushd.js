function pushd(path) {
    if (!path) {
        throw new Error("pushd: missing argument: path")
    }
    let d = pwd()
    cd($(path).stringByStandardizingPath.js)
    directoryStack.push(d)
    return dirs()
}
