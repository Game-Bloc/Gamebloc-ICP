import styled from "styled-components";

const VideoStyled = styled.div`
 margin: 0 2rem 0 2rem;
 display: flex;
 width: 40%;
 max-height: 50%;
 box-shadow: rgb(0 0 0 / 69%) 0px 26px 36px -10px,
 rgb(0 0 0 / 73%) 0px 16px 10px -10px;
 position: relative;
 cursor: pointer;
 overflow: hidden;
 border-radius: 20px;

video{
 position: absolute;
 width: 100%;
 height: 100%;
 top: 0;
 object-fit: cover;
}

@media screen and (max-width: 600px) {
    display: none;
}

`;

export default VideoStyled;