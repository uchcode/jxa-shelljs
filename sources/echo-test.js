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

echo('think different')
echo('-n', 'think different')

ObjC.import('stdlib')
$.exit(0)
