class Counter extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["count"];
  }

  decrement() {
    let count = this.getAttribute("count");
    count = count - 1 > 0 ? count - 1 : 0;
    console.log(count);
    // this.setAttribute("count", 5);
  }

  get count() {
    return this.getAttribute("count");
  }

  set count(val) {
    this.setAttribute("count", val);
    console.log("set");
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === "count") {
      this.render();
      var self = this;
      if(self.getAttribute("isRunning") == null){
        self.setAttribute("isRunning", "1");
        window.setInterval(function () {
          let count = self.count;
          self.count = count - 1 > 0 ? count - 1 : 0;
          console.log(count);
        }, 1000);
      }
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
    <span>${this.count}</span>
    `;
  }
}

customElements.define("span-licznik", Counter);
