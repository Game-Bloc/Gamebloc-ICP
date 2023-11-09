import styled from "styled-components";

const StreamStyle = styled.div`
 margin: 0 .5rem 0 .5rem;
 display: flex;
 height: 250px;
 box-shadow: rgb(0 0 0 / 69%) 0px 26px 36px -10px,
 rgb(0 0 0 / 73%) 0px 16px 10px -10px;
 position: relative;
 cursor: pointer;
 overflow: hidden;


video{
 position: absolute;
 width: 100%;
 height: 180px;
 top: 0;
 object-fit: cover;
 border-radius: 20px;
}
`;

export default StreamStyle;