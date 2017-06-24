function mv2trash(...args) {
    let Finder = Application('Finder')
    args.forEach(e => {
        Finder.delete(Path($(e).stringByStandardizingPath.js))
    })
}
