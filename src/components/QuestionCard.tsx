import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { Question, Option } from '../types';
import { useMemo } from 'react';
import { t, type Language } from '../locales';

interface QuestionCardProps {
    question: Question;
    index: number;
    total: number;
    selectedOptions: string[]; // For this question
    onSelect: (optionId: string) => void;
    lang: Language;
}

export function QuestionCard({ question, index, total, selectedOptions, onSelect, lang }: QuestionCardProps) {
    const isMultiple = question.question_type === 'multiple';

    const typeLabel = useMemo(() => {
        return t(lang, question.question_type as any);
    }, [lang, question.question_type]);

    const typeColor = useMemo(() => {
        switch (question.question_type) {
            case 'multiple': return 'bg-purple-500';
            case 'boolean': return 'bg-green-500';
            default: return 'bg-tg-button';
        }
    }, [question.question_type]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-tg-secondary-bg rounded-xl p-4 mb-4"
        >
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-tg-hint font-medium">
                    {t(lang, 'question')} {index + 1} / {total}
                </span>
                <span className={clsx("text-[11px] px-2 py-0.5 rounded-full text-white font-medium", typeColor)}>
                    {typeLabel}
                </span>
            </div>

            <div className="text-[15px] font-medium leading-normal mb-3 text-tg-text">
                {question.text}
            </div>

            {isMultiple && (
                <div className="text-xs text-tg-hint italic mb-2">
                    {t(lang, 'multiple_hint')}
                </div>
            )}

            <div className="flex flex-col gap-2">
                {question.options.map((opt) => (
                    <OptionItem
                        key={opt.id}
                        option={opt}
                        selected={selectedOptions.includes(opt.id)}
                        isMultiple={isMultiple}
                        onClick={() => onSelect(opt.id)}
                    />
                ))}
            </div>
        </motion.div>
    );
}

interface OptionItemProps {
    option: Option;
    selected: boolean;
    isMultiple: boolean;
    onClick: () => void;
}

function OptionItem({ option, selected, isMultiple, onClick }: OptionItemProps) {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={clsx(
                "flex items-center p-3 rounded-lg cursor-pointer border-2 transition-colors duration-200",
                selected
                    ? "bg-tg-button text-tg-button-text border-transparent"
                    : "bg-tg-bg border-transparent hover:border-tg-button/50"
            )}
        >
            <div className={clsx(
                "w-5 h-5 flex items-center justify-center shrink-0 mr-3 border-2 rounded",
                isMultiple ? "rounded-md" : "rounded-full",
                selected ? "border-white bg-white" : "border-tg-hint"
            )}>
                {selected && (
                    isMultiple ? (
                        <svg className="w-3.5 h-3.5 text-tg-button" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-tg-button" />
                    )
                )}
            </div>
            <span className="font-bold mr-2 w-5">{option.id}.</span>
            <span className="text-sm leading-snug">{option.text}</span>
        </motion.div>
    );
}
