import React, { createContext, useState } from 'react';

interface SystemData {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
}

export const SystemDataContext = createContext<SystemData | null>(null);

type SystemDataProviderProps = {
    children: React.ReactNode;
}

export const SystemContext = ({ children }: SystemDataProviderProps) => {
    const [data, setData] = useState(null);

    return (
        <SystemDataContext.Provider value={{ data, setData }}>
            {children}
        </SystemDataContext.Provider>
    );
};
