import React, { useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { useFlashcards } from '../context/FlashcardContext';
import { generateFlashcardsFromText } from '../services/openai';

export default function InputSection() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addCards } = useFlashcards();
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardCount, setCardCount] = useState<number>(15);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (textareaRef.current) {
        textareaRef.current.value = text;
      }
    };
    reader.readAsText(file);
  };

  const generateCards = async () => {
    const text = textareaRef.current?.value;
    if (!text) {
      alert('Please enter some text or upload a file first.');
      return;
    }

    try {
      setIsGenerating(true);
      const newCards = await generateFlashcardsFromText(text, cardCount);
      addCards(newCards);
      if (textareaRef.current) {
        textareaRef.current.value = '';
      }
    } catch (error) {
      alert('Error generating flashcards: ' + (error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="script" className="text-sm font-medium text-gray-700">
          Enter Video Script
        </label>
        <textarea
          id="script"
          ref={textareaRef}
          className="min-h-[200px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Paste your video script here..."
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border rounded-lg hover:bg-gray-50"
        >
          <Upload size={20} />
          Upload Script
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          className="hidden"
          onChange={handleFileUpload}
        />

        <select
          value={cardCount}
          onChange={(e) => setCardCount(Number(e.target.value))}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={10}>10 cards</option>
          <option value={15}>15 cards</option>
          <option value={20}>20 cards</option>
          <option value={30}>30 cards</option>
        </select>

        <button
          onClick={generateCards}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          <FileText size={20} />
          {isGenerating ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </div>
    </div>
  );
}