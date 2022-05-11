import { useEffect } from 'react';

// Custom hook that checks for clicks outside of a target sent in (ref)
// If the click is outside of the target the callback function sent in is being called
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