import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
        scroll-behavior: smooth; 

        @media screen and (max-width: 1200px) {
        font-size: 15px
        }

        @media screen and (max-width: 1000px) {
        font-size: 14px
        }

        @media screen and (max-width: 800px) {
        font-size: 13px
        }

        @media screen and (max-width: 600px) {
        font-size: 12px
        }
    }

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-color: #1e2329;
    }

    html, body, div, span, p, h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style: none;
        color: #c4b1ab;
        //color: #f47a0e;
    }

    button, a {
        :hover {
            cursor: pointer;
        }
    }

//-------------------------------------------------------

    // body::-webkit-scrollbar {
    //     width: 0 !important;
    //     display: none;
    // }
`;

export default GlobalStyles;
