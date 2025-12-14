import type { FetchQuestionsResponse, SubmitResponse, Answer } from '../types';

const API_BASE = '';

export async function fetchQuestions(initData: string): Promise<FetchQuestionsResponse> {
    const response = await fetch(`${API_BASE}/api/questions`, {
        headers: {
            'X-Telegram-Init-Data': initData
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to load questions');
    }

    return response.json();
}

export async function submitAnswers(
    sessionId: string,
    answers: Answer[],
    initData: string
): Promise<SubmitResponse> {
    const response = await fetch(`${API_BASE}/api/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Telegram-Init-Data': initData
        },
        body: JSON.stringify({
            session_id: sessionId,
            answers: answers
        })
    });

    return response.json();
}
