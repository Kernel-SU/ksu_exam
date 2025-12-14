import { motion } from 'framer-motion';
import { t, type Language } from '../locales';
import type { SubmitResponse } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultProps {
    result: SubmitResponse;
    lang: Language;
}

export function Result({ result, lang }: ResultProps) {
    const isSuccess = result.success;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-4"
        >
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-4 inline-block"
            >
                {isSuccess ? (
                    <CheckCircle className="w-20 h-20 text-green-500" />
                ) : (
                    <XCircle className="w-20 h-20 text-red-500" />
                )}
            </motion.div>

            <h2 className={`text-2xl font-bold mb-3 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                {isSuccess ? t(lang, 'success_title') : t(lang, 'fail_title')}
            </h2>

            <p className="text-sm text-tg-hint leading-relaxed mb-4">
                {result.message || (isSuccess ? t(lang, 'success_msg') : t(lang, 'fail_msg'))}
            </p>

            {!isSuccess && result.correct_count !== undefined && (
                <div className="text-lg font-semibold text-tg-text bg-tg-secondary-bg inline-block px-4 py-2 rounded-lg">
                    {t(lang, 'score')}: {result.correct_count} / {result.total_count}
                </div>
            )}
        </motion.div>
    );
}
