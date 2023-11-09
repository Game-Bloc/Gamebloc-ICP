import React from "react";
import { Container } from "../../styles/commonStyles/Container.styles";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Carousel } from "../../styles/custom/Carousel";
import { SliderDetails } from "../../data/Index";
import { Img } from "../../styles/commonStyles/Img";
import { Text } from "../../styles/headerStyle/Header.styled";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import  VideoStyled  from "../../styles/custom/VideoStyled";
import vid from '../../assets/videos/elden.mp4';

const SliderView = () => {

    let settings = {
        dots:true,
        infinite:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
     }

    return (
        <Container 
        backgroundColor="#01070E"
        display="flex"
        flexDirection="row"
        width="100%"
        >
            <Carousel {...settings}>
                {
                    SliderDetails.map((data, index)=>{
                        return(
                            <Container 
                                key={index}
                                position='relative'
                                zIndex="-99"
                                borderRadius="15px"
                            >
                                <Img 
                                    src={data.img} 
                                    alt={data.title}
                                    width='100%'
                                    height="16rem"
                                    borderRadius="20px"
                                    opacity=".5"
                                    zIndex="-99"
                                />
                                <Wrapper 
                                 position="absolute"
                                 top="30%"
                                 left="5%"
                                 display="flex"
                                 flexDirection="column"
                                > 
                                    <Text
                                      className="heading2"
                                      fontsize='1.5rem'
                                      fontWeight={400}

                                    >
                                        {data.title}
                                    </Text>
                                    <Paragraph
                                      margin="1rem 0 0 0"
                
                                    >
                                        {data.description}
                                    </Paragraph>

                                </Wrapper>

                            </Container>
                        )
                    })
                }

            </Carousel>

            
                <VideoStyled>
                    <video autoPlay loop muted >
                       <source src={vid} type="video/mp4" />
                    </video>
                </VideoStyled>

            
        </Container>
    )
}

export default SliderView;