import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="w-full h-1 bg-tg-secondary-bg rounded-full overflow-hidden mb-6">
            <motion.div
                className="h-full bg-tg-button"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
}
