import React from "react";
import ReactDOM from "react-dom";
import { grabDecklist } from "./lib/parser";
import { bestPrice, pricePerCard } from "./lib/bestprice";
import { useState } from "react";
import { Types } from "./types/types";

const goldFishSite = window.location.href.startsWith(
  "https://www.mtggoldfish.com/"
);

// Define the Modal component
const Modal: React.FC<{ onClose: () => void; decklist: Types.Card[] }> = ({
  onClose,
  decklist,
}) => {
  const deckSplit = bestPrice(decklist);
  const { proxy, purchase } = deckSplit;
  const proxyText = proxy
    .map((card) => `${card.quantity} ${card.name}`)
    .join("\n");
  const purchaseText = purchase
    .map((card) => `${card.quantity} ${card.name}`)
    .join("\n");
  const proxyPricePerCard = pricePerCard(proxy.length);
  const proxyPrice = proxy
    .reduce((acc, card) => acc + proxyPricePerCard * card.quantity, 0)
    .toFixed(2);
  const purchasePrice = purchase
    .reduce((acc, card) => acc + card.price * card.quantity, 0)
    .toFixed(2);
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Sorted by best price</h2>
        <div style={styles.textFieldsContainer}>
          <div style={styles.sortedColumn}>
            <h3>Non-proxy: ${purchasePrice}</h3>
            <textarea
              style={{ width: "100%", resize: "none" }}
              rows={30}
              value={purchaseText}
            />
            <div>
              <button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  navigator.clipboard.writeText(purchaseText);
                }}
              >
                Copy to clipboard
              </button>
              <a
                href="https://www.cardkingdom.com/builder"
                target="_blank"
                style={{ fontSize: "16px", color: "blue" }}
                onClick={() => {
                  window.open("https://www.cardkingdom.com/builder", "_blank");
                }}
              >
                Purchase from Card Kingdom
              </a>
            </div>
          </div>
          <div style={styles.sortedColumn}>
            <h3>Proxy: ${proxyPrice}</h3>
            <textarea
              style={{ width: "100%", resize: "none" }}
              rows={30}
              value={proxyText}
            />
            <div>
              <button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  navigator.clipboard.writeText(proxyText);
                }}
              >
                Copy to clipboard
              </button>
              <a
                href="https://mtg-print.com/"
                target="_blank"
                style={{ fontSize: "16px", color: "blue" }}
                onClick={() => {
                  window.open("https://mtg-print.com/", "_blank");
                }}
              >
                Purchase from MTG-Print
              </a>
            </div>
          </div>
        </div>
        <button onClick={onClose}>Close Window</button>
      </div>
    </div>
  );
};

if (goldFishSite) {
  const App: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };
    const deckList = grabDecklist();
    return (
      <div>
        <button
          onClick={handleButtonClick}
          className="btn-type-menu btn-type-menu-paper nav-item active"
        >
          Proxy
        </button>
        {showModal && <Modal onClose={handleCloseModal} decklist={deckList} />}
      </div>
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

const styles = {
  parentDiv: {
    position: "relative",
  },
  modalOverlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    color: "black",
    width: "80%",
    maxWidth: "800px",
  },
  modalText: {
    color: "black",
  },
  textFieldsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "20px",
  },
  sortedColumn: {
    width: "48%",
    height: "auto",
  },
};
