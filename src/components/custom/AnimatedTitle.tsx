import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AnimatedTitle = () => {
    const { t } = useTranslation('dashboard');
    const subtitles = [
        t('dashboard.subtitle.boost'),
        t('dashboard.subtitle.video'),
        t('dashboard.subtitle.photo'),
        t('dashboard.subtitle.site'),
        t('dashboard.subtitle.blog')
    ];

    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [subtitles.length]);

    return (
        <div className={'relative h-14'}>
            {subtitles.map((subtitle, index) => (
                <h2
                    key={index}
                    className={`absolute pl-4 text-4xl transition-opacity duration-500 ${
                        currentSubtitleIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{ left: 0, top: 0 }}
                >
                    {subtitle}
                </h2>
            ))}
        </div>
    );
};

export default AnimatedTitle;
