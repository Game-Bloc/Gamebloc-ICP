import styled from "styled-components";
import Slider from 'react-slick';

export const Carousel = styled(Slider)`
transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 36px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px; 
border-radius: 20px;
max-height: 40%;
width: 60%;
z-index: 0.1;

.slick-slider img{
  max-height: 40%;
  border-radius: 20px;

   }
   & > button{
     opacity: 0;
     height: 100%;
     width: 5vw;
     z-index: 1; 
   }

  &:hover{
    transition: opacity 0.2s ease 0s;
  }
  .slick-dots li button:before{
     color: #F6B8FC;
     font-size: 1rem;
  }

  @media screen and (max-width: 600px) {
     display: flex;
     width: 92%;
     justify-content: center;
     align-items: center;
  }
  
`;