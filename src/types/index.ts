export type QuestionType = 'single' | 'multiple' | 'boolean';

export interface Option {
    id: string;
    text: string;
}

export interface Question {
    id: number;
    question_type: QuestionType;
    text: string;
    options: Option[];
}

export interface Answer {
    question_id: number;
    answer: string; // "A" or "A,B"
}

export interface FetchQuestionsResponse {
    session_id: string;
    questions: Question[];
    lang: string;
}

export interface SubmitResponse {
    success: boolean;
    message: string;
    correct_count?: number;
    total_count?: number;
}
