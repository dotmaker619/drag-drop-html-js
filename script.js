dragElement(document.getElementById("mydiv"));
const firstOffsetTop = document.getElementById("mydiv").offsetTop;
const firstOffsetLeft = document.getElementById("mydiv").offsetLeft;

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var dDragTop = elmnt.offsetTop;
  var dDragLeft = elmnt.offsetLeft;

  if (document.getElementById(elmnt.id)) {
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    fixedDiv = elmnt.cloneNode(true);
    fixedDiv.id = "fixed_div";
    document.getElementById("left_box").appendChild(fixedDiv);

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    console.log("Mouse Down");
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement(e) {
    e = e || window.event;
    e.preventDefault();
    
    const redBoxElm = document.getElementById("red_box");
    document.getElementById("fixed_div").remove();

    if (
      isInRange(e.clientX, redBoxElm.offsetLeft, redBoxElm.offsetLeft + redBoxElm.offsetWidth) &&
      isInRange(e.clientY, redBoxElm.offsetTop, redBoxElm.offsetTop + redBoxElm.offsetHeight)
    ) {
      elmnt.style.top = (redBoxElm.offsetHeight - elmnt.offsetHeight) / 2 + redBoxElm.offsetTop;
      elmnt.style.left = (redBoxElm.offsetWidth - elmnt.offsetWidth) / 2 + redBoxElm.offsetLeft;
      document.onmouseup = null;
      document.onmousemove = null;
    } else {
      console.log("dropped outside:>>");
      elmnt.style.top = dDragTop;
      elmnt.style.left = dDragLeft;
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

function isInRange(x, min, max) {
  return x >= min && x <= max;
}
