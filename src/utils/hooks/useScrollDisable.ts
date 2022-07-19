function scrollDisableOnOverlay(isOpen : boolean) {
    let root_html = document!.querySelector("html")
    if (!isOpen) {
        root_html!.style.overflow =  "";
    } else {
        root_html!.style.overflow = "hidden";
    }
  }
  
  export { scrollDisableOnOverlay };
  