const attachTooltip = anchor => {
  let _isVisible = false;
  let _isActive = false;
  let _currEvent = null;
  let _anchorElement = null;
  let _prevElement = null;
  let _currElement = null;

  if (typeof anchor === "string") {
    if (document.querySelector(anchor)) {
      _anchorElement = document.querySelector(anchor);
    } else {
      throw new Error("DOM element doesn't exist!");
    }
  } else {
    throw new Error(
      "Expected string containing DOM node selector to attach tooltip."
    );
  }

  function _drawTooltip(content, posX) {
    const toolTipContent = `
      <div class="tool-tip">
        ${content}
      </div>
    `;
    let tooltipNode = document.querySelector(".tool-tip");

    if (tooltipNode) {
      _setIsActive(false);
      tooltipNode.remove();
    }

    _anchorElement.insertAdjacentHTML("beforeend", toolTipContent);
    tooltipNode = document.querySelector(".tool-tip");
    const tooltipSize = tooltipNode.getBoundingClientRect();
    tooltipNode.style.left = `${posX - tooltipSize.width / 2 + 16}px`; // 16 = 5px padding on either side of element + 3px border on either side.
    _setIsActive(true);

    /* handle fade in */
    setTimeout(() => {
      tooltipNode.classList.add("fade-in");
      _setIsVisible(true);
    }, 100);
  }

  function _setIsActive(bool) {
    _isActive = bool;
  }

  function _setIsVisible(bool) {
    _isVisible = bool;
  }

  function _setCurrElement(el) {
    _prevElement = _currElement;
    _currElement = el;
  }

  function _hasCurrElementChanged() {
    return _currElement !== _prevElement;
  }

  function _handleMouseOver(event) {
    if (!event.srcElement.id) {
      return;
    } // filter out the DOM nodes we don't care about

    _setCurrEvent(event);
    _setCurrElement(event.srcElement);

    if (!_currElement.attributes["data-item"]) {
      throw new Error(
        "Child elements must have data-item attribute containing the data to display in the tooltip!"
      );
    }

    const linkContent = _currElement.attributes["data-item"].textContent;
    const rect = _currElement.getBoundingClientRect();

    _reveal(linkContent, rect.x);
  }

  function _handleMouseLeave(event) {
    if (!_isActive) {
      // prevents unexpected error
      return;
    }

    const tooltipNode = document.querySelector("div.tool-tip");

    if (!tooltipNode) {
      throw new Error(
        "Something unexpected happened! Module-generated node with class .tool-tip has been prematurely deleted somehow! This is bad."
      );
    }

    tooltipNode.classList.remove("fade-in");
    _setIsVisible(false);
    _setIsActive(false);

    /* clean up after transition and get ready for the next tooltip */
    setTimeout(() => {
      tooltipNode.remove();
    }, 500);
  }

  function _setCurrEvent(e) {
    _currEvent = e;
  }

  function _reveal(content, posX) {
    if (_isActive) return;
    _drawTooltip(content, posX);
  }

  /* attach event listeners */
  if (!_anchorElement) {
    throw new Error("Anchor element to attach to DOM not defined.");
  }

  _anchorElement.addEventListener("mouseenter", _handleMouseOver, true);
  _anchorElement.addEventListener("mouseleave", _handleMouseLeave, true);
};

export default attachTooltip;
