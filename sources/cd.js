function cd(path='~/') {
    if (!$.NSFileManager.defaultManager.changeCurrentDirectoryPath($(path).stringByStandardizingPath)) {
        throw new Error(`cd: ${path}: No such file or directory\n`)
    }
    return $.NSFileManager.defaultManager.currentDirectoryPath.js
}
