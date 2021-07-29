let getRange = () => {
    let range = document.createRange();
    return range;
}

let emptyRange = () => {
    let body = document.getElementsByTagName("body")[0]; 
    const selection = window.getSelection();
    selection.collapse(body, 0)
}


export {
    getRange,
    emptyRange
}