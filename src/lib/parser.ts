import { Types } from "../types/types";

export const grabDecklist = (): Types.Card[] => {
  const deckListDiv = document.querySelector(".deck-view-deck-table");
  // will need to grab all table rows
  if (deckListDiv) {
    const tableRows = deckListDiv.querySelectorAll("tr");
    //if the class for the tr says deck-category-header we skip it
    const deckList: Types.Card[] = [];
    tableRows.forEach((row) => {
      if (!row.classList.contains("deck-category-header")) {
        //the name of the card is in the td > a with the class card_id card_name
        const cardName =
          row.querySelector(".card_id.card_name")?.textContent || "";
        //we have two td's with the the classname text-right, the first one doesn't have any data, but the second one has the price.
        const cardPriceUnparsed =
          row.querySelectorAll(".text-right")[1].textContent || "";
        const cardPrice = parseFloat(
          cardPriceUnparsed.replace("\n$", "").replace("\n", "")
        );
        const cardQuantityUnparsed =
          row.querySelectorAll(".text-right")[0].textContent || "";
        const cardQuantity = parseInt(
          cardQuantityUnparsed.replace("\n", "").replace("\n", ""),
          10
        );

        deckList.push({
          name: cardName,
          price: cardPrice,
          quantity: cardQuantity,
        });
      }
    });
    return deckList;
  }
  return [];
};
