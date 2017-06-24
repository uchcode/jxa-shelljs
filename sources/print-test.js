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

function x() {
    return 1
}
console.log(1)
print(1)
console.log(1.1)
print(1.1)
console.log('hello')
print('hello')
console.log(x)
print(x)
console.log(JSON.stringify([1]))
print([1])
console.log(JSON.stringify({x:1}))
print({x:1})
console.log(false)
print(false)
console.log(null)
print(null)
console.log(undefined)
print(undefined)
console.log('')
print('')
