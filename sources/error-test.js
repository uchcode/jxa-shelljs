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

error('booo')
