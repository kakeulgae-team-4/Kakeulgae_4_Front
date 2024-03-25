import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const UserContext = React.createContext( null ); // UserContext 생성

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
