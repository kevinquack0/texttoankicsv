export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardContextType {
  cards: Flashcard[];
  apiKey: string;
  addCards: (cards: Flashcard[]) => void;
  updateCard: (id: string, front: string, back: string) => void;
  clearCards: () => void;
  setApiKey: (key: string) => void;
}