export let rangeSet;
if (document.createRange)
  rangeSet = function (node, start, end, endNode) {
    let r = document.createRange();
    r.setStart(node, start)
    r.setEnd(endNode || node, end)
    return r
  }
else rangeSet = function (node, start, end) {
  let r = document.body.createTextRange()
  try { r.moveToElementText(node.parentNode) }
  catch (e) { return r }
  r.collapse(true)
  r.moveEnd("character", end)
  r.moveStart("character", start)
  return r
};