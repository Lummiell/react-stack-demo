import React, { useState, useEffect } from "react";
import "./index.css";
import { GiSpades, GiClubs, GiDiamonds, GiHearts } from "react-icons/gi";
import { Paper, Switch } from "@material-ui/core";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
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
function renderCard(card?: PlayingCard) {
  if (card) {
    const cardIcon = {
      H: <GiHearts />,
      S: <GiSpades />,
      D: <GiDiamonds />,
      C: <GiClubs />,
    };
    const cardColorClassName =
      card.Suit === Suit.Hearts || card.Suit === Suit.Diamonds
        ? "redCard"
        : "blackCard";
    return (
      <Paper className={"center card"}>
        <span className={cardColorClassName + " center"}>
          {card.Rank}
          {cardIcon[card.Suit]}
        </span>
      </Paper>
    );
  } else {
    return <></>;
  }
}
const CardStackToy = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [deckA, setDeckA] = useState<Deck>({ Cards: [] });
  const [deckB, setDeckB] = useState<Deck>({ Cards: [] });
  const [deckC, setDeckC] = useState<Deck>({ Cards: [] });
  const [show, setShow] = useState<boolean>(false);
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
    {
      alias: "C",
      get: deckC,
      set: setDeckC,
    },
  ];
  function transferCard(fromDeck: string, toDeck: string) {
    const OriginalDeck = Decks.find((item) => item.alias === fromDeck);
    const DestinationDeck = Decks.find((item) => item.alias === toDeck);
    if (DestinationDeck && OriginalDeck) {
      const [originalDeck, setOriginalDeck] = [
        OriginalDeck.get,
        OriginalDeck.set,
      ];
      const [destinationDeck, setDestinationDeck] = [
        DestinationDeck.get,
        DestinationDeck.set,
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
    //knuth shuffle
    function shuffle(array: PlayingCard[]) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
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
    shuffle(Cards);
    setDeckA({ Cards });
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <div>
          <div className="showCardsControl">
            <Switch
              onChange={() => {
                setShow(!show);
              }}
            />{" "}
            <span>Mostrar Baralhos</span>
          </div>
          <div className="playingCards">
            <div className="decksContainer">
              <div className="deck">
                <div className="card">
                  {!show ? (
                    <>{renderCard(deckA.Cards[0])}</>
                  ) : (
                    <>
                      {deckA.Cards.map((card) => {
                        return (
                          <div key={card.Rank + card.Suit}>
                            {renderCard(card)}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <button
                  className="transferButton"
                  onClick={() => {
                    transferCard("A", "B");
                  }}
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="deck">
                <button
                  className="transferButton"
                  onClick={() => {
                    transferCard("B", "A");
                  }}
                >
                  <ChevronLeft />
                </button>
                <div className="card">
                  {!show ? (
                    <>{renderCard(deckB.Cards[0])}</>
                  ) : (
                    <>
                      {deckB.Cards.map((card) => {
                        return (
                          <div key={card.Rank + card.Suit}>
                            {renderCard(card)}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <button
                  className="transferButton"
                  onClick={() => {
                    transferCard("B", "C");
                  }}
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="deck">
                <button
                  className="transferButton"
                  onClick={() => {
                    transferCard("C", "B");
                  }}
                >
                  <ChevronLeft />
                </button>
                <div className="card">
                  {!show ? (
                    <>{renderCard(deckC.Cards[0])}</>
                  ) : (
                    <>
                      {deckC.Cards.map((card) => {
                        return (
                          <div key={card.Rank + card.Suit}>
                            {renderCard(card)}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default CardStackToy;
