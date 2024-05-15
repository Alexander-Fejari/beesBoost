import {useTranslation} from "react-i18next";

const AnimatedTitle = () => {
    const {t} = useTranslation('dashboard')
    return (
        <>
            <h2 className={'ml-4 text-4xl'}>
                {t('dashboard.subtitle.boost')}
            </h2>
            <h2 className={'ml-4 text-4xl'}>
                {t('dashboard.subtitle.video')}
            </h2>
            <h2 className={'ml-4 text-4xl'}>
                {t('dashboard.subtitle.photo')}
            </h2>
            <h2 className={'ml-4 text-4xl'}>
                {t('dashboard.subtitle.site')}
            </h2>
            <h2 className={'ml-4 text-4xl'}>
                {t('dashboard.subtitle.blog')}
            </h2>
        </>
    )
}

export default AnimatedTitle
