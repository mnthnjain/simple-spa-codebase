import template from "./header.html";
import "./header.scss";

class Header extends HTMLElement {
  constructor(props) {
    super();
    this.innerHTML = template;
    window.callbacks.header = {
      navigateToComponent1,
      navigateToComponent2,
    };
  }
}
customElements.define("app-header", Header);

function navigateToComponent1() {
  location.href = "#component1";
}

function navigateToComponent2() {
  location.href = "#component2";
}
