function scrollDisableOnOverlay(isOpen) {
  if (isOpen) {
    document.querySelector("html").style.overflow = "hidden";
  } else {
    document.querySelector("html").style.overflow = null;
  }
}

export { scrollDisableOnOverlay };
