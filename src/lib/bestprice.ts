import { Types } from "../types/types";

export const pricePerCard = (cardCount: number) => {
  if (cardCount >= 200) {
    return 0.75;
  } else if (cardCount >= 50) {
    return 1.0;
  } else if (cardCount >= 10) {
    return 1.5;
  } else {
    return 2.0;
  }
};

export const bestPrice = (
  deckList: Types.Card[]
): { proxy: Types.Card[]; purchase: Types.Card[] } => {
  let cardCount = deckList.reduce((acc, card) => acc + card.quantity, 0);
  const proxy: Types.Card[] = [];
  const purchase: Types.Card[] = [];
  let sortingFinished = false;
  while (!sortingFinished) {
    const decklistLengith = deckList.length;
    const proxyPrice = pricePerCard(cardCount);
    deckList.forEach((card) => {
      if (card.price < proxyPrice) {
        cardCount -= card.quantity;
        purchase.push(card);
      }
    });
    purchase.forEach((card) => {
      deckList = deckList.filter((deckCard) => deckCard.name !== card.name);
    });
    if (decklistLengith === deckList.length) {
      sortingFinished = true;
    }
  }
  proxy.push(...deckList);
  return { proxy, purchase };
};
