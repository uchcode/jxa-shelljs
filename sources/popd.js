function popd() {
    if (directoryStack.length) {
        let d = directoryStack[directoryStack.length - 1]
        directoryStack.pop()
        cd(d)
    }
    return dirs()
}
