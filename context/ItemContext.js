import React, { createContext, useContext, useState, useEffect } from 'react';

const ItemContext = createContext(undefined);

// ItemProvider를 함수형 컴포넌트로 정의
export function ItemProvider({ children }) {
    const [activeItems, setActiveItems] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setActiveItems(prev => prev.filter(item => new Date(item.expiresAt) > now));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const value = {
        activeItems,
        addActiveItem: (item) => {
            setActiveItems(prev => [...prev, {
                ...item,
                activatedAt: new Date(),
                expiresAt: new Date(Date.now() + item.duration * 1000)
            }]);
        }
    };

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    );
}

// useItems 훅 정의
export const useItems = () => {
    const context = useContext(ItemContext);
    if (context === undefined) {
        throw new Error('useItems must be used within an ItemProvider');
    }
    return context;
};