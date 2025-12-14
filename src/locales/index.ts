export const translations = {
    zh: {
        title: 'KernelSU 加群验证',
        subtitle: '请回答以下问题',
        submit: '提交答案',
        submitting: '提交中...',
        loading: '加载中...',
        success_title: '验证通过',
        success_msg: '恭喜！答题全部正确，已自动批准加群请求',
        fail_title: '验证失败',
        fail_msg: '答题错误，请重新申请加入群组',
        score: '得分',
        question: '题目',
        single: '单选',
        multiple: '多选',
        boolean: '判断',
        multiple_hint: '可选择多个选项',
        select_lang: '选择语言 / Select Language',
        open_in_tg: '请在 Telegram APP 中打开此页面'
    },
    en: {
        title: 'KernelSU Group Verification',
        subtitle: 'Please answer the following questions',
        submit: 'Submit',
        submitting: 'Submitting...',
        loading: 'Loading...',
        success_title: 'Verification Passed',
        success_msg: 'Congratulations! All answers correct. Your join request has been approved.',
        fail_title: 'Verification Failed',
        fail_msg: 'Incorrect answers. Please reapply to join the group.',
        score: 'Score',
        question: 'Question',
        single: 'Single',
        multiple: 'Multiple',
        boolean: 'T/F',
        multiple_hint: 'Select multiple options',
        select_lang: 'Select Language / 选择语言',
        open_in_tg: 'Please open this page in Telegram App'
    }
};

export type Language = 'zh' | 'en';
export type TranslationKey = keyof typeof translations.en;

export function t(lang: Language, key: TranslationKey): string {
    return translations[lang][key] || key;
}
