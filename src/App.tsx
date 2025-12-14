import { useEffect, useState, useCallback } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { fetchQuestions, submitAnswers } from './lib/api';
import type { Question, Answer, SubmitResponse } from './types';
import { type Language, t } from './locales';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { Result } from './components/Result';
import { AnimatePresence } from 'framer-motion';
import { Loader2, XCircle } from 'lucide-react';

function App() {
  const { tg, initData, haptic, isTelegram } = useTelegram();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [sessionId, setSessionId] = useState('');
  const [lang, setLang] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    // Detect language from TG or browser
    const userLang = tg?.initDataUnsafe?.user?.language_code || navigator.language;
    if (userLang?.startsWith('zh')) {
      setLang('zh');
    }

    async function load() {
      if (!isTelegram) {
        setLoading(false);
        return;
      }

      try {
        // Determine if we are in dev mode (no initData) or production
        const data = initData || '';
        // In dev, we might mock this call or handle empty initData on server
        const res = await fetchQuestions(data);
        setQuestions(res.questions);
        setSessionId(res.session_id);
        // Respect server lang if provided
        if (res.lang) setLang(res.lang as Language);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [tg, initData, isTelegram]);

  // Copy protection
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();

    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('selectstart', preventDefault); // IE/Chrome

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('selectstart', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Toggle language manually
  const toggleLang = () => {
    setLang(l => l === 'en' ? 'zh' : 'en');
    haptic('light');
  };

  const handleSelect = useCallback((qid: number, oid: string, type: string) => {
    haptic('light');
    setAnswers(prev => {
      const current = prev[qid] || [];
      if (type === 'multiple') {
        if (current.includes(oid)) {
          return { ...prev, [qid]: current.filter(id => id !== oid) };
        } else {
          return { ...prev, [qid]: [...current, oid] };
        }
      } else {
        return { ...prev, [qid]: [oid] };
      }
    });
  }, [haptic]);

  const handleSubmit = async () => {
    if (!sessionId) return;
    haptic('medium');
    setSubmitting(true);

    const answerList: Answer[] = Object.entries(answers).map(([qid, ans]) => ({
      question_id: parseInt(qid),
      answer: ans.join(',')
    }));

    try {
      const res = await submitAnswers(sessionId, answerList, initData || '');
      setResult(res);
      if (res.success) {
        haptic('success');
        setTimeout(() => tg?.close(), 3000);
      } else {
        haptic('error');
      }
    } catch (err: any) {
      setError(err.message);
      haptic('error');
    } finally {
      setSubmitting(false);
    }
  };

  const isAllAnswered = questions.length > 0 && questions.every(q => {
    const ans = answers[q.id];
    return ans && ans.length > 0;
  });

  // Dynamic background style based on TG theme
  const bgStyle = {
    backgroundColor: 'var(--color-tg-bg)',
    color: 'var(--color-tg-text)'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={bgStyle}>
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-tg-button mb-4" />
          <p className="text-tg-hint">{t(lang, 'loading')}</p>
        </div>
      </div>
    );
  }

  if (!isTelegram) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center" style={bgStyle}>
        <div>
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-tg-text font-medium text-lg">{t(lang, 'open_in_tg')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center" style={bgStyle}>
        <div>
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen" style={bgStyle}>
        <Result result={result} lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 max-w-lg mx-auto" style={bgStyle}>
      {/* Language Switcher */}
      <div className="fixed top-2 right-2 z-50">
        <button
          onClick={toggleLang}
          className="bg-tg-secondary-bg/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-tg-link shadow-sm border border-tg-hint/20"
        >
          {lang === 'en' ? '中文' : 'English'}
        </button>
      </div>

      <Header lang={lang} />

      <ProgressBar current={Object.keys(answers).length} total={questions.length} />

      <AnimatePresence mode="wait">
        <div className="space-y-4 pb-24">
          {questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              total={questions.length}
              selectedOptions={answers[q.id] || []}
              onSelect={(oid) => handleSelect(q.id, oid, q.question_type)}
              lang={lang}
            />
          ))}
        </div>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-tg-bg to-transparent">
        <div className="max-w-lg mx-auto">
          <button
            disabled={!isAllAnswered || submitting}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 transform active:scale-95 shadow-lg
                            ${!isAllAnswered || submitting
                ? 'bg-gray-400 cursor-not-allowed opacity-70'
                : 'bg-tg-button hover:shadow-xl hover:-translate-y-1'
              }`}
          >
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {t(lang, 'submitting')}
              </div>
            ) : (
              t(lang, 'submit')
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
