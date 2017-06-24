((global)=>{

let Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

let directoryStack = []

global.Shell = {}

function exit(n=0) {
    ObjC.import('stdlib')
    return $.exit(n)
}
global.Shell.exit = exit

function input(msg='') {
  $.NSFileHandle.fileHandleWithStandardOutput.writeData($(msg).dataUsingEncoding($.NSUTF8StringEncoding))
  return $.NSString.alloc.initWithDataEncoding($.NSFileHandle.fileHandleWithStandardInput.availableData, $.NSUTF8StringEncoding).js.trim()
}
global.Shell.input = input

function print(o, t='\n') {
    switch(Object.prototype.toString.call(o).slice(8,-1).toLowerCase()) {
    case 'object':
    case 'array':
        var s = JSON.stringify(o)
        break
    case 'null':
        var s = 'null'
        break
    case 'undefined':
        var s = 'undefined'
        break
    default:
        var s = o.toString()
        break
    }
    $.NSFileHandle.fileHandleWithStandardOutput.writeData($(s+t).dataUsingEncoding($.NSUTF8StringEncoding))
}
global.Shell.print = print

function error(o, t='\n') {
    switch(Object.prototype.toString.call(o).slice(8,-1).toLowerCase()) {
    case 'object':
    case 'array':
        var s = JSON.stringify(o)
        break
    case 'null':
        var s = 'null'
        break
    case 'undefined':
        var s = 'undefined'
        break
    default:
        var s = o.toString()
        break
    }
    $.NSFileHandle.fileHandleWithStandardError.writeData($(s+t).dataUsingEncoding($.NSUTF8StringEncoding))
}
global.Shell.error = error

function log(o) {
    if(o===''){$.NSLog('\n');return;}
    switch(Object.prototype.toString.call(o).slice(8,-1).toLowerCase()) {
    case 'object':
    case 'array':
        var s = JSON.stringify(o)
        break
    case 'null':
        var s = 'null'
        break
    case 'undefined':
        var s = 'undefined'
        break
    default:
        var s = o.toString()
        break
    }
    $.NSLog(s)
}
global.Shell.log = log

function getpass(msg='Password:') {
    ObjC.import('unistd')
    return $.getpass(msg)
}
global.Shell.getpass = getpass

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
global.Shell.test = test

function doShell(script, opt={}) {
    return Applet.doShellScript(script, {
        administratorPrivileges: !!opt.withPrompt,
        withPrompt: opt.withPrompt ? opt.withPrompt : '',
        alteringLineEndings: opt.alteringLineEndings ? opt.alteringLineEndings : false
    }).trim()
}
global.Shell.doShell = doShell

function fread(path, encoding=$.NSUTF8StringEncoding) {
    if (!path) {
        throw new Error('fread: missing argument: path')
    }
    let p = $(path).stringByStandardizingPath
    let u = encoding
    let e = $()
    let c = $.NSString.stringWithContentsOfFileEncodingError(p, u, e).js
    if (e.js) throw new Error($.NSString.stringWithFormat('%@', e).js)
    return c
}
global.Shell.fread = fread

function fwrite(contents, path, encoding=$.NSUTF8StringEncoding) {
    if (!contents && contents!=='') {
        throw new Error('fwrite: missing argument: contents')
    }
    if (!path) {
        throw new Error('fwrite: missing argument: path')
    }
    switch(Object.prototype.toString.call(contents).slice(8,-1).toLowerCase()) {
    case 'object':
    case 'array':
        var s = JSON.stringify(contents)
        break
    case 'null':
        var s = 'null'
        break
    case 'undefined':
        var s = 'undefined'
        break
    default:
        var s = contents.toString()
        break
    }
    let p = $(path).stringByStandardizingPath
    let a = true
    let u = encoding
    let e = $()
    let c = $(s)
    c.writeToFileAtomicallyEncodingError(p, a, u, e)
    if (e.js) {
        throw new Error($.NSString.stringWithFormat('%@', e).js)
    }
}
global.Shell.fwrite = fwrite

function echo(...args) {
    if (args.length>0 && args[0]==='-n') {
        args.shift()
        var t = ''
    } else {
        var t = '\n'
    }
    let s = args.toString()+t
    $.NSFileHandle.fileHandleWithStandardOutput.writeData($(s).dataUsingEncoding($.NSUTF8StringEncoding))
    return s
}
global.Shell.echo = echo

function cat(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        return `cd "${pwd()}" && cat ${args[0].join(' ')}`
    } else {
        return `cd "${pwd()}" && cat ${args.join(' ')}`
    }
}
global.Shell.cat = cat

function cd(path='~/') {
    if (!$.NSFileManager.defaultManager.changeCurrentDirectoryPath($(path).stringByStandardizingPath)) {
        throw new Error(`cd: ${path}: No such file or directory\n`)
    }
    return $.NSFileManager.defaultManager.currentDirectoryPath.js
}
global.Shell.cd = cd

function pwd() {
    return $.NSFileManager.defaultManager.currentDirectoryPath.js
}
global.Shell.pwd = pwd

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
global.Shell.which = which

function ls(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && ls ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && ls ${args.join(' ')}`
    }
    let ret = doShell(script)
    return ret ? ret.split('\n') : []
}
global.Shell.ls = ls

function find(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && find ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && find ${args.join(' ')}`
    }
    let ret = doShell(script)
    return ret ? ret.split('\n') : []
}
global.Shell.find = find

function cp(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && cp ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && cp ${args.join(' ')}`
    }
    doShell(script)
}
global.Shell.cp = cp

function rm(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && rm ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && rm ${args.join(' ')}`
    }
    doShell(script)
}
global.Shell.rm = rm

function mv2trash(...args) {
    let Finder = Application('Finder')
    args.forEach(e => {
        Finder.delete(Path($(e).stringByStandardizingPath.js))
    })
}
global.Shell.mv2trash = mv2trash

function mv(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && mv ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && mv ${args.join(' ')}`
    }
    doShell(script)
}
global.Shell.mv = mv

function mkdir(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && mkdir ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && mkdir ${args.join(' ')}`
    }
    doShell(script)
}
global.Shell.mkdir = mkdir

function touch(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && touch ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && touch ${args.join(' ')}`
    }
    doShell(script)
}
global.Shell.touch = touch

function ln(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && ln ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && ln ${args.join(' ')}`
    }
    doShell(script)
}
global.Shell.ln = ln

function chmod(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && chmod ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && chmod ${args.join(' ')}`
    }
    doShell(script)
}
global.Shell.chmod = chmod

function head(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && head ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && head ${args.join(' ')}`
    }
    return doShell(script)
}
global.Shell.head = head

function tail(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && tail ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && tail ${args.join(' ')}`
    }
    return doShell(script)
}
global.Shell.tail = tail

function grep(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && grep ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && grep ${args.join(' ')}`
    }
    return doShell(script)
}
global.Shell.grep = grep

function sed(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && sed ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && sed ${args.join(' ')}`
    }
    return doShell(script)
}
global.Shell.sed = sed

function sort(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && sort ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && sort ${args.join(' ')}`
    }
    return doShell(script)
}
global.Shell.sort = sort

function uniq(...args) {
    if (args.length===1 && Object.prototype.toString.call(args[0]).slice(8,-1).toLowerCase()==='array') {
        var script = `cd "${pwd()}" && uniq ${args[0].join(' ')}`
    } else {
        var script = `cd "${pwd()}" && uniq ${args.join(' ')}`
    }
    return doShell(script)
}
global.Shell.uniq = uniq

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
global.Shell.dirs = dirs

function pushd(path) {
    if (!path) {
        throw new Error("pushd: missing argument: path")
    }
    let d = pwd()
    cd($(path).stringByStandardizingPath.js)
    directoryStack.push(d)
    return dirs()
}
global.Shell.pushd = pushd

function popd() {
    if (directoryStack.length) {
        let d = directoryStack[directoryStack.length - 1]
        directoryStack.pop()
        cd(d)
    }
    return dirs()
}
global.Shell.popd = popd

function globalize(scope) {
	if (scope['globalize']) throw `globalize is exist, abort.`
	Object.keys(global.Shell).forEach( i => {
		if (i === 'globalize') return
		if (scope[i]) throw `${i} is exist, abort.`
		scope[i] = global.Shell[i]
	})
}
global.Shell.globalize = globalize

})(this);
