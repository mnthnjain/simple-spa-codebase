import "./component1.scss";
import template from "./component1.html";
export default function component2() {
  window.onComponentLoad = () => {
    console.log("welcome, your component2 loaded");
  };

  return template;
}
