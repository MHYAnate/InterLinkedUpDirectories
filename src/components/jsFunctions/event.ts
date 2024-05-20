onmouseenter = (event) => {};

addEventListener("mouseleave", (event) => {});

onmouseleave = (event) => {};

addEventListener("mousemove", (event) => {});

onmousemove = (event) => {};

addEventListener("mouseout", (event) => {});

onmouseout = (event) => {};

addEventListener("mouseover", (event) => {});

onmouseover = (event) => {};

addEventListener("mouseup", (event) => {});

onmouseup = (event) => {};

// The mousedown event is fired at an Element when a pointing device button is pressed while the pointer is inside the element.

// Note: This differs from the click event in that click is fired after a full click action occurs; that is, the mouse button is pressed and released while the pointer remains inside the same element. mousedown is fired the moment the button is initially pressed.

// The mouseenter event is fired at an Element when a pointing device (usually a mouse) is initially moved so that its hotspot is within the element at which the event was fired.

// Syntax
// Use the event name in methods like addEventListener(), or set an event handler property.

// The mouseleave event is fired at an Element when the cursor of a pointing device (usually a mouse) is moved out of it.

// mouseleave and mouseout are similar but differ in that mouseleave does not bubble and mouseout does. This means that mouseleave is fired when the pointer has exited the element and all of its descendants, whereas mouseout is fired when the pointer leaves the element or leaves one of the element's descendants (even if the pointer is still within the element).

// The mouseleave and mouseout events will not be triggered when the element is replaced or removed from the DOM.

// Syntax
// Use the event name in methods like addEventListener(), or set an event handler property.

// The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.

// Syntax
// Use the event name in methods like addEventListener(), or set an event handler property.

// The mouseout event is fired at an Element when a pointing device (usually a mouse) is used to move the cursor so that it is no longer contained within the element or one of its children.

// mouseout is also delivered to an element if the cursor enters a child element, because the child element obscures the visible area of the element.

// The mouseover event is fired at an Element when a pointing device (such as a mouse or trackpad) is used to move the cursor onto the element or one of its child elements.

// Syntax
// Use the event name in methods like addEventListener(), or set an event handler property.

// he mouseup event is fired at an Element when a button on a pointing device (such as a mouse or trackpad) is released while the pointer is located inside it.

// mouseup events are the counterpoint to mousedown events.

let sidebar:any = document.getElementById("sidebar");
if (sidebar.childElementCount > 0) {
  // Do something
}