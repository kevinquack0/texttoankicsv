import React, { createContext, useContext, useState } from 'react';
import { Flashcard, FlashcardContextType } from '../types';

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export function FlashcardProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Flashcard[]>([]);

  const addCards = (newCards: Flashcard[]) => {
    setCards((prev) => [...prev, ...newCards]);
  };

  const updateCard = (id: string, front: string, back: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, front, back } : card
      )
    );
  };

  const clearCards = () => {
    setCards([]);
  };

  return (
    <FlashcardContext.Provider value={{ cards, addCards, updateCard, clearCards }}>
      {children}
    </FlashcardContext.Provider>
  );
}

export function useFlashcards() {
  const context = useContext(FlashcardContext);
  if (context === undefined) {
    throw new Error('useFlashcards must be used within a FlashcardProvider');
  }
  return context;
}