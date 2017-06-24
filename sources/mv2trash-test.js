function mv2trash(...args) {
    let Finder = Application('Finder')
    args.forEach(e => {
        Finder.delete(Path($(e).stringByStandardizingPath.js))
    })
}

mv2trash('mv2trash-copy.js')
