import React from "react";
import ReactDOM from "react-dom";
import { grabDecklist } from "./lib/parser";
import { bestPrice } from "./lib/bestprice";

const goldFishSite = window.location.href.startsWith(
  "https://www.mtggoldfish.com/"
);
if (goldFishSite) {
  const App: React.FC = () => {
    const deckList = grabDecklist();
    return (
      <button
        onClick={() => console.log(bestPrice(deckList))}
        className="btn-type-menu btn-type-menu-paper nav-item active"
      >
        Proxy
      </button>
    );
  };

  const rootElement = document.createElement("div");
  const ul = document.querySelector(
    ".type-switcher-tabs.nav.nav-pills.deck-type-menu.additional-1"
  );
  if (ul) {
    ul.appendChild(rootElement);
  }

  ReactDOM.render(<App />, rootElement);
}
