function input(msg='') {
  $.NSFileHandle.fileHandleWithStandardOutput.writeData($(msg).dataUsingEncoding($.NSUTF8StringEncoding))
  return $.NSString.alloc.initWithDataEncoding($.NSFileHandle.fileHandleWithStandardInput.availableData, $.NSUTF8StringEncoding).js.trim()
}
