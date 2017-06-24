let directoryStack = []

function pwd() {
    return $.NSFileManager.defaultManager.currentDirectoryPath.js
}

function cd(path='~/') {
    if (!$.NSFileManager.defaultManager.changeCurrentDirectoryPath($(path).stringByStandardizingPath)) {
        throw new Error(`cd: ${path}: No such file or directory\n`)
    }
    return $.NSFileManager.defaultManager.currentDirectoryPath.js
}




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

function pushd(path) {
    if (!path) {
        throw new Error("pushd: missing argument: path")
    }
    let d = pwd()
    cd($(path).stringByStandardizingPath.js)
    directoryStack.push(d)
    return dirs()
}

function popd() {
    if (directoryStack.length) {
        let d = directoryStack[directoryStack.length - 1]
        directoryStack.pop()
        cd(d)
    }
    return dirs()
}

console.log(JSON.stringify( dirs() ))
console.log(JSON.stringify( pushd('~/Music') ))
console.log(JSON.stringify( pushd('~/Documents') ))
console.log(JSON.stringify( popd() ))
console.log(JSON.stringify( popd() ))





