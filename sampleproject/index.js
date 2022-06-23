module.exports = {
    forEach(iterable, fnCb){
        for(let index in iterable){
            fnCb(iterable[index], index);
        }
    }
}