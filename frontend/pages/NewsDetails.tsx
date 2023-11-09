/// <reference path="../react-app-env.d.ts" />
import { Container } from "../styles/commonStyles/Container.styles";
import { Wrapper } from "../styles/commonStyles/Wrapper";
import { Text } from "../styles/commonStyles/Text";
import { LeftArrow2 } from "../styles/icon/Icons";
import { Img } from "../styles/commonStyles/Img";
import img from '../assets/images/newsImg.png';
import { Paragraph } from "../styles/commonStyles/Paragraph";
import React from "react";

const NewsDetails = () => {
    return(
        <Container
            margin="1rem"
        >
            <Wrapper
              display="flex"
              flexDirection="row"
              alignItems="center"
              cursor="pointer"
              margin="1rem 0 0 0"
              width="fit-content"
            >
                <LeftArrow2/>
                <Text
                  color="#F8DBFB"
                  fontWeight={600}
                  fontStyle="normal"
                  margin="0 0 0 .5rem"
                >Go Back
                </Text>

            </Wrapper>

            <Container
                display="flex"
                flexDirection="column"
                margin='2rem 2rem 1rem 2rem'
            >
                <Img 
                    src={img}
                    alt=""
                />

                <Wrapper
                        display="flex"
                        flexDirection="column"
                        margin="1rem 0 0 0"
                    >
                     <Text
                        fontWeight={700}
                        fontsize='2rem'
                        fontStyle="normal"
                        width="95%"
                     >
                         How Modern Technology Affects Gamers In The 21st Century
                     </Text>
                      <Wrapper
                       display="flex"
                       flexDirection="row"
                       alignItems="center"
                       margin="1rem 0 0 0"

                      >
                        <Paragraph
                        fontStyle="normal"
                        fontWeight={400}
                        fontsize='.875rem'
                        >
                           Jan 21
                        </Paragraph>

                        <Wrapper 
                          backgroundColor="#fff"
                          width=".5rem"
                          height=".5rem"
                          borderRadius="9999px"
                          margin="0 .8rem"
                        />

                        <Paragraph
                          fontStyle="normal"
                          fontWeight={400}
                          fontsize='.875rem'
                        >
                           5 Mins read
                        </Paragraph>

                      </Wrapper>
                </Wrapper>

                <Wrapper
                  margin="2rem 0 0 0" 
                >
                    <Paragraph>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                        Incidunt odit eos enim placeat est optio ducimus, porro ullam error! Pariatur necessitatibus ab rem. 
                        Sequi laboriosam possimus veritatis. Sapiente commodi vitae ut molestias asperiores blanditiis dolore temporibus, 
                        tempora in excepturi accusamus nihil quam odio ipsum consectetur nisi natus, earum corrupti nobis et tenetur sunt, 
                        doloremque deleniti accusantium! Natus, delectus eum dolor maiores dolorum voluptatibus eligendi excepturi iure! 
                        Culpa dignissimos maiores provident quos facere. Voluptate cum minima assumenda amet sapiente corrupti ab porro 
                        neque ullam necessitatibus! Blanditiis consequatur eos minima impedit, quia mollitia reiciendis error necessitatibus 
                        a quis sint nostrum, doloremque esse qui pariatur harum delectus recusandae architecto! Fugiat placeat, saepe recusandae 
                        ea dicta quam eos molestiae quo accusamus minus possimus. Facilis aut corrupti amet accusamus nobis consequatur nulla temporibus 
                        rerum veniam, aliquid itaque quam cum, quibusdam molestiae. Neque possimus quia est voluptatem a fugit explicabo excepturi quisquam 
                        praesentium dolorum eligendi suscipit nesciunt, ratione dolor sit aspernatur asperiores voluptatum tenetur reiciendis porro recusandae 
                        doloribus minima. Eum et vero excepturi eveniet dolore quia, odit, illo nam corrupti impedit sapiente placeat aliquid asperiores, 
                        commodi hic esse temporibus iusto totam? Eligendi rerum a beatae officiis, numquam obcaecati aspernatur voluptate repellendus rem sit 
                        accusantium debitis et inventore perferendis optio, dolorum reiciendis! Rerum perferendis, enim distinctio quam modi quibusdam omnis cum. 
                        Ducimus cum similique, dolor doloremque fuga id dolorum voluptatum in consequatur temporibus nesciunt commodi iure doloribus ad assumenda, 
                        quisquam nobis necessitatibus. Quia, iusto! Eius expedita ratione nulla quos, amet, libero unde minus magni asperiores architecto accusamus at quidem? 
                        Sed consectetur officiis deserunt asperiores numquam fugiat repudiandae, animi dolorum, illo ratione fuga quasi corrupti minima nisi ipsa. Esse iste odio a ea, 
                        exercitationem blanditiis aut, omnis reprehenderit earum molestias veniam odit rerum modi voluptas aliquid nobis magnam illum reiciendis quae itaque autem at ab officia consectetur. 
                        Consequuntur eveniet deleniti suscipit! Odit ab, facilis ad, necessitatibus officiis non, sint vel quos pariatur iure ea porro tempore hic natus corporis minima voluptatibus saepe. 
                        Laudantium dicta mollitia quaerat nisi, saepe earum quidem autem, optio magni unde asperiores ipsa porro impedit nesciunt. Nobis similique excepturi sit ex cupiditate adipisci 
                        repellat cum culpa consequatur. Reprehenderit quod cumque repellendus neque itaque! Nisi eius mollitia ipsam repellat provident, exercitationem sit facere ipsa illo quam.
                         Dolorum veritatis, at consequatur cupiditate, tenetur sequi voluptatum placeat ipsa, aperiam libero accusantium numquam dolorem. Debitis assumenda dolores nobis obcaecati totam quos perferendis ipsam, 
                         cum consequuntur repellendus tenetur veniam possimus dolorum. Facere doloremque iure iste excepturi dolore voluptates voluptatem veritatis eaque officiis, nemo dicta aspernatur, repudiandae ipsum qui, 
                         itaque aliquam temporibus quis neque adipisci expedita ducimus voluptate. Nisi earum saepe iure natus sed ipsum inventore distinctio, odit est. Architecto quo pariatur a. 
                         Alias explicabo optio a ratione, facere doloremque commodi reiciendis rem, minima nemo accusantium aliquam libero nulla qui, modi deserunt culpa dolorem iste omnis? 
                         Aperiam magnam illum fugit debitis libero officia beatae possimus. Unde, ratione! Veniam quia excepturi fugit? Odio deleniti fuga alias enim laborum. 
                         A praesentium cumque autem maiores consequatur possimus iure aperiam. Consequuntur cumque distinctio illum inventore eligendi fugiat reprehenderit, 
                         asperiores saepe consequatur perspiciatis ipsum officia tempora dolorem recusandae eos nobis doloribus voluptatem ullam quisquam! Voluptate asperiores 
                         quas dignissimos odio officiis inventore illum reiciendis minima. Quibusdam error placeat aspernatur porro quam, adipisci asperiores! Consectetur voluptatum, 
                         perspiciatis odit enim ipsa placeat nisi, possimus nemo eaque sed accusantium quam, praesentium quisquam animi expedita iure repudiandae quibusdam? Distinctio 
                         fugit pariatur cumque praesentium quidem, aspernatur facere obcaecati fugiat nostrum dicta iste neque commodi quisquam voluptates ipsa a error illum quis! 
                         Voluptatibus doloremque expedita dolore animi architecto quod necessitatibus nostrum mollitia id, illum aut aliquid dolor. Ducimus delectus a dolorum praesentium nostrum!
                    </Paragraph>


                </Wrapper>


            </Container>

        </Container>
    )
}

export default NewsDetails;