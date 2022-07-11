function scrollDisableOnOverlay(isOpen) {
  if (!isOpen) {
    document.querySelector("html").style.overflow = null;
  } else {
    document.querySelector("html").style.overflow = "hidden";
  }
}

export { scrollDisableOnOverlay };
