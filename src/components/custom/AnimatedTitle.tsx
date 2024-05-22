import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AnimatedTitle = () => {
    const { t } = useTranslation('dashboard');
    const wordsToChange = ['boost', 'video', 'photo', 'site', 'blog'];

    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsToChange.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [wordsToChange.length]);

    return (
        <section className={'w-full'}>
            {wordsToChange.map((word, index) => (
                <h2
                    key={index}
                    className={`pl-4 text-4xl transition-opacity duration-500 md:text-5xl ${
                        currentWordIndex === index ? 'block opacity-100' : 'hidden opacity-0'
                    }`}
                >
                    {t(`dashboard.subtitle.${word}`)}
                </h2>
            ))}
        </section>
    );
};

export default AnimatedTitle;
