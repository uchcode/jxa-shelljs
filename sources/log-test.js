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

function x() {
    return 1
}
console.log(1)
log(1)
console.log(1.1)
log(1.1)
console.log('hello')
log('hello')
console.log(x)
log(x)
console.log(JSON.stringify([1]))
log([1])
console.log(JSON.stringify({x:1}))
log({x:1})
console.log(false)
log(false)
console.log(null)
log(null)
console.log(undefined)
log(undefined)
console.log('')
log('')
