import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
  *{
    box-sizing: border-box;
     margin: 0;
     padding: 0;
   }

   html{
    overflow-x: hidden;
   }


  body{
      background-color: #01070E;
      margin: 0;
      -moz-osx-font-smoothing: grayscale;
      font-family: 'Open Sans', sans-serif;
      overflow: hidden;
  }

  
`;
export default GlobalStyles;