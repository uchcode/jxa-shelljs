function which(cmd) {
    if(!cmd) {
        throw new Error("which: missing argument: cmd");
    }
    try {
        return doShell(`cd "${pwd()}" && which ${cmd}`);
    } catch(e) {
        throw new Error(`which: ${cmd}: command not found`);
    }
}
