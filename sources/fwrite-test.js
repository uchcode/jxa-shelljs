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

fwrite('本日は晴天なり', 'readme.txt')
fwrite('', 'readme.txt')
