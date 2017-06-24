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

fread('fread-test.js')
