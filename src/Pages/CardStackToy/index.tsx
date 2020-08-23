import React, { useState, useEffect } from "react";
import "./index.css";
enum Suit {
  Spades = "S",
  Hearts = "H",
  Diamonds = "D",
  Clubs = "C",
}
interface PlayingCard {
  Rank: string;
  Suit: Suit;
}
interface Deck {
  Cards: PlayingCard[];
}

const CardStackToy = () => {
  const [deckA, setDeckA] = useState<Deck>({ Cards: [] });
  const [deckB, setDeckB] = useState<Deck>({ Cards: [] });
  const Decks = [
    {
      alias: "A",
      get: deckA,
      set: setDeckA,
    },
    {
      alias: "B",
      get: deckB,
      set: setDeckB,
    },
  ];
  function transferCard(fromDeck: string, toDeck: string) {
    const foundOriginalDeck = Decks.find((item) => item.alias === fromDeck);
    const foundDestinationDeck = Decks.find((item) => item.alias === toDeck);
    if (foundDestinationDeck && foundOriginalDeck) {
      const [originalDeck, setOriginalDeck] = [
        foundOriginalDeck.get,
        foundOriginalDeck.set,
      ];
      const [destinationDeck, setDestinationDeck] = [
        foundDestinationDeck.get,
        foundDestinationDeck.set,
      ];
      if (originalDeck.Cards.length > 0) {
        const transferredCard = originalDeck.Cards.shift();
        if (transferredCard) {
          setOriginalDeck(originalDeck);
          setDestinationDeck({
            Cards: [transferredCard, ...destinationDeck.Cards],
          });
        }
      }
    }
  }
  useEffect(() => {
    const Ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
    const Suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];

    const Cards: PlayingCard[] = [];
    for (let i = 0; i < Ranks.length; i++) {
      const Rank = Ranks[i];
      for (let J = 0; J < Suits.length; J++) {
        const Suit = Suits[J];
        Cards.push({ Rank, Suit });
      }
    }
    setDeckA({ Cards });
  }, []);
  return (
    <>
      <div className="decksContainer">
        <div className="deck">
          <button
            onClick={() => {
              transferCard("A", "B");
            }}
          >
            {">"}
          </button>
          {deckA.Cards.map((Card) => {
            if (Card.Suit === Suit.Hearts || Card.Suit === Suit.Diamonds) {
              return (
                <span key={Card.Rank + Card.Suit} className="red">
                  {Card.Rank + Card.Suit}{" "}
                </span>
              );
            } else {
              return (
                <span key={Card.Rank + Card.Suit} className="black">
                  {Card.Rank + Card.Suit}{" "}
                </span>
              );
            }
          })}
        </div>
        <div className="deck">
          <button
            onClick={() => {
              transferCard("B", "A");
            }}
          >
            {"<"}
          </button>
          {deckB.Cards.map((Card) => {
            if (Card.Suit === Suit.Hearts || Card.Suit === Suit.Diamonds) {
              return (
                <span key={Card.Rank + Card.Suit} className="red">
                  {Card.Rank + Card.Suit}{" "}
                </span>
              );
            } else {
              return (
                <span key={Card.Rank + Card.Suit} className="black">
                  {Card.Rank + Card.Suit}{" "}
                </span>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
export default CardStackToy;
