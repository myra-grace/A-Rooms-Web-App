import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

export const CircleWrapper = styled.div`
    border: 3px solid #E0CAFF;
    border-radius: 50%;
    box-shadow: 0 0 10px 10px #588b76;
    background-image : linear-gradient(0deg, rgba(63,171,251,1) 0%, rgba(198,70,252,1) 90%);

    width: 500px;
    height: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // @media screen and (max-width: 1200px) {
    //     width: 500px;
    //     height: 500px;
    //     }

    //     @media screen and (max-width: 1000px) {
    //         width: 400px;
    //         height: 400px;
    //     }

    //     @media screen and (max-width: 800px) {
    //         width: 300px;
    //         height: 300px;
    //     }

    //     @media screen and (max-width: 600px) {
    //         width: 200px;
    //         height: 200px;
    //     }
`;

export const GeneralWrapper = styled.div`
    width: 100vw;
    height: 100wh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

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

        &::-webkit-scrollbar {
            width: 0;
            display: none;
        }
    }

    html, body, div, span, p, h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style: none;
        word-wrap: break-word;
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
