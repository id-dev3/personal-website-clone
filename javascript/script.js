// TYPING EFFECT

class TextType {
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 9) || 1700;
      this.txt = "";
      this.isDeleting = false;
      this.tick();
    }
  
    tick() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];
  
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;
  
      let delta = this.period / fullTxt.length;
  
      if (this.isDeleting) {
        delta /= 2;
      }
  
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
  
      setTimeout(() => this.tick(), delta);
    }
}
  
window.addEventListener("DOMContentLoaded", () => {
    const elements = document.getElementsByClassName("typewrite");
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute("data-type");
        const period = elements[i].getAttribute("data-period");
        if (toRotate) {
        new TextType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // INJECT CSS
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }";
    document.body.appendChild(css);
});
  
// END TYPE EFFECT