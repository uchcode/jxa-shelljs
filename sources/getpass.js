function getpass(msg='Password:') {
    ObjC.import('unistd')
    return $.getpass(msg)
}
