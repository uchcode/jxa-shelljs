#!/usr/bin/osascript -l JavaScript

function read(path) {
    return $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, $()).js
}

function write(contents, path) {
    $(contents).writeToFileAtomicallyEncodingError(path, true, $.NSUTF8StringEncoding, $())
}

function deleteAt(path) {
    return $.NSFileManager.defaultManager.removeItemAtPathError($(path).stringByStandardizingPath, $())
}

function doShell(s) {
    let a = Application.currentApplication()
    a.includeStandardAdditions = true
    return a.doShellScript(s,{alteringLineEndings:false}).trim()
}

const A = ['exit', 'input', 'print', 'error', 'log', 'getpass', 'test', 'doShell']
const B = ['fread', 'fwrite']
const C = ['echo', 'cat']
const D = ['cd', 'pwd', 'which']
const E = ['ls', 'find']
const F = ['cp', 'rm', 'mv2trash', 'mv', 'mkdir', 'touch', 'ln', 'chmod']
const G = ['head', 'tail', 'grep', 'sed', 'sort', 'uniq']
const H = ['dirs', 'pushd', 'popd']
const I = ['globalize']
const functions = A.concat(B).concat(C).concat(D).concat(E).concat(F).concat(G).concat(H).concat(I)

function run(argv) {
    switch (argv[0]) {
    case 'clean':
        deleteAt(`./Shell.js`)
        break
    case 'build':
    default:
        var source = read(`./sources/src-head.js`) + '\n'
        for (let f of functions) {
            source += read(`./sources/${f}.js`) + `global.Shell.${f} = ${f}\n\n`
        }
        source += read(`./sources/src-tail.js`)
        write(source, './Shell.js')
        break
    }
}
