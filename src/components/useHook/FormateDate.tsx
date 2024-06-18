import { useMemo } from 'react';

const useFormatDate = (dateString: string) => {
    return useMemo(() => {
        if (!dateString) return '';

        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }, [dateString]);
};

export default useFormatDate;
