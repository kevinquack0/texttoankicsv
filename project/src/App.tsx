import React from 'react';
import { Brain } from 'lucide-react';
import { FlashcardProvider } from './context/FlashcardContext';
import InputSection from './components/InputSection';
import CardTable from './components/CardTable';
import ExportButton from './components/ExportButton';

function App() {
  return (
    <FlashcardProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Brain size={32} className="text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Anki Flashcard Creator
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Create Flashcards</h2>
              <InputSection />
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Preview Flashcards</h2>
                <ExportButton />
              </div>
              <CardTable />
            </section>
          </div>
        </main>
      </div>
    </FlashcardProvider>
  );
}

export default App;