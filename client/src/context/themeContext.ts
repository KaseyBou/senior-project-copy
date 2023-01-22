import React from "react";

export const themes = {

    light: {
        foreground: '#242526',
        background: '#fff',
        buttonForeground: '#fff',
        buttonBackground: '#242526',
    },

    dark: {
        foreground: '#fff',
        background: '#242526',
        buttonForeground: '#242526',
        buttonBackground: '#fff',
    },

};

export const ThemeContext = React.createContext({
    theme: {}
});