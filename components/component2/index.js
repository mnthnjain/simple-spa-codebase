import "./component2.scss";
import template from "./component2.html";

let timeOnPage = 0;
let timerFunction;

export default function component1() {
  window.callbacks.component1 = {
    notifyForPageLoad: () => {
      alert("allert from component 2 js file");
    },
  };

  window.onComponentLoad = () => {
    console.log("welcome, your component loaded");
    timerFunction = setInterval(updateTime, 1000);
  };

  window.unloadComponent = () => {
    timeOnPage = 0;
    clearInterval(timerFunction);
  };

  return template;
}

function updateTime() {
  timeOnPage++;
  document.getElementById("timer").innerText = timeOnPage;
}
