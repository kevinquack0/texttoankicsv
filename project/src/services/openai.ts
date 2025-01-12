import OpenAI from 'openai';
import { Flashcard } from '../types';

export const generateFlashcardsFromText = async (text: string, apiKey: string, cardCount: number = 15): Promise<Flashcard[]> => {
    if (!apiKey) {
        throw new Error('OpenAI API key is required');
    }

    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant that creates flashcards from text. Generate exactly ${cardCount} flashcards in a clear question and answer format. Respond with a JSON object that has a 'cards' array, where each card has a 'front' and 'back' property. Example format: {"cards": [{"front": "Question 1", "back": "Answer 1"}, ...]}`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            response_format: { type: "json_object" }
        });

        if (!response.choices[0]?.message?.content) {
            throw new Error('No response content received from OpenAI');
        }

        const parsedContent = JSON.parse(response.choices[0].message.content);

        if (!parsedContent.cards || !Array.isArray(parsedContent.cards)) {
            throw new Error('Invalid response format: missing cards array');
        }

        return parsedContent.cards.map((card: { front: string, back: string }, index: number) => {
            if (!card.front || !card.back) {
                throw new Error('Invalid card format: missing front or back property');
            }
            return {
                id: `card-${Date.now()}-${index}`,
                front: card.front,
                back: card.back
            };
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to generate flashcards: ${error.message}`);
        }
        throw new Error('An unexpected error occurred while generating flashcards');
    }
}; 