function readFrom(path, encoding=$.NSUTF8StringEncoding) {
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

eval( readFrom('../Shell.js') )

Shell.globalize(this)

console.log(Shell.exit.toString())
console.log(exit.toString())
