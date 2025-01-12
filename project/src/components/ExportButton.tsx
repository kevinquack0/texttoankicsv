import React from 'react';
import { saveAs } from 'file-saver';
import { Download } from 'lucide-react';
import { useFlashcards } from '../context/FlashcardContext';

export default function ExportButton() {
  const { cards } = useFlashcards();

  const exportToCSV = () => {
    if (cards.length === 0) {
      alert('No cards to export. Generate some flashcards first!');
      return;
    }

    const csvContent = [
      ['Front', 'Back'],
      ...cards.map(card => [
        `"${card.front.replace(/"/g, '""')}"`,
        `"${card.back.replace(/"/g, '""')}"`
      ])
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'anki-flashcards.csv');
  };

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
    >
      <Download size={20} />
      Export to CSV
    </button>
  );
}