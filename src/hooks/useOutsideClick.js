import { useEffect } from 'react';

const useOutsideClick = (callback, ref) => {
    const handleClickOutside = (e) => {
            if (ref && ref.current && !ref.current.contains(e.target)) {
                callback();
                return;
            }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    });
};

export default useOutsideClick;