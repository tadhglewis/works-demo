import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        font-family: 'Open Sans', sans-serif;
        color: #1e1e1e;
    }
    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
