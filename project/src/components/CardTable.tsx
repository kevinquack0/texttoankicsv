import React, { useState } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { useFlashcards } from '../context/FlashcardContext';
import { Flashcard } from '../types';

export default function CardTable() {
  const { cards, updateCard } = useFlashcards();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ front: string; back: string }>({
    front: '',
    back: ''
  });

  const startEditing = (card: Flashcard) => {
    setEditingId(card.id);
    setEditForm({ front: card.front, back: card.back });
  };

  const saveEdit = (id: string) => {
    updateCard(id, editForm.front, editForm.back);
    setEditingId(null);
  };

  if (cards.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No flashcards yet. Generate some cards to see them here.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Front (Question)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Back (Answer)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cards.map((card) => (
            <tr key={card.id}>
              <td className="px-6 py-4">
                {editingId === card.id ? (
                  <textarea
                    value={editForm.front}
                    onChange={(e) => setEditForm({ ...editForm, front: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{card.front}</div>
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === card.id ? (
                  <textarea
                    value={editForm.back}
                    onChange={(e) => setEditForm({ ...editForm, back: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{card.back}</div>
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === card.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveEdit(card.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Save size={20} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing(card)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Pencil size={20} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}