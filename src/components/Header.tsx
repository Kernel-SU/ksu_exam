import { t, type Language } from '../locales';

interface HeaderProps {
    lang: Language;
}

export function Header({ lang }: HeaderProps) {
    return (
        <div className="text-center mb-6 pt-4">
            <h1 className="text-xl font-semibold mb-2 text-tg-text">
                {t(lang, 'title')}
            </h1>
            <p className="text-sm text-tg-hint">
                {t(lang, 'subtitle')}
            </p>
        </div>
    );
}
