import { useCallback, useState } from "react";

export const useAutoIndex = (initialIndex = 0) => {
    const [index, setIndex] = useState(initialIndex);

    const getCurrentIndex = useCallback(() => {
        return index;
    }, [index]);

    const getNextIndex = useCallback(() => {
        setIndex(index + 1);
        return index;
    }, [index]);

    return { getCurrentIndex, getNextIndex };
};
