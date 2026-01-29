import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import './style.css'
import SliderLogo from "../../components/SliderLogo/SliderLogo";
import objectives from '../../assets/odsImage.png'
import sdgCircle from '../../assets/sdgCircle.png'

import odsquiztextonly from '../../assets/odsquiz-textonly-bg.png'

const Home = () => {
    return(
        <div className="Home">
            {/* <div className="Content">
                <h1>Quero Participar</h1>
                <p>Responda algumas perguntas e descubra o quanto você contribui para as ODS</p>
            </div> */}
            
            <div className="home-row">
                <div className="home-column img-column">
                    <img  className='logo-center-rotating' src={odsquiztextonly} alt="" />
                    <img src={sdgCircle} className='rotating' alt="" />
                </div>
                <div className="home-column text-column">
                    <h2>Descubra o quanto   a sua comunidade progride para o desenvolvimento sustentável no Brasil</h2>
                    <p>Responda algumas perguntas e descubra o quanto a sua comunidade progride nos ODS.</p>
                    <Link to='/participar/login' className='home-button'>Responder agora</Link>
                </div>
            </div>

            <div className="OdsAll">
                <div className="OdsContent">
                    <h1>Os ODS no Brasil</h1>
                    

                    <p>Os Objetivos de Desenvolvimento Sustentável são um apelo global à ação para acabar com a pobreza, proteger o meio ambiente e o clima e garantir que as pessoas, em todos os lugares, possam desfrutar de paz e de prosperidade. Estes são os objetivos para os quais as Nações Unidas estão contribuindo a fim de que possamos atingir a Agenda 2030 no Brasil.</p>
                </div>

                <div className="OdsContent">
                    <h1>O que são os ODS?</h1>
                    
                    <p>Os Objetivos de Desenvolvimento Sustentável (ODS), também conhecidos como Objetivos Globais, foram adotados pelas Nações Unidas em 2015 como um apelo universal à ação para acabar com a pobreza, proteger o planeta e garantir que até 2030 todas as pessoas desfrutem de paz e prosperidade. Os 17 ODS são integrados – eles reconhecem que a ação em uma área afetará os resultados em outras, e que o desenvolvimento deve equilibrar a sustentabilidade social, econômica e ambiental.</p>

                </div>
            </div>            
                <SliderLogo></SliderLogo>

            <div className="Content">
                <a target="_blank"  href="https://odsbrasil.gov.br/"><img src="https://cdn.discordapp.com/attachments/1037486089801306113/1037492045343903875/8666682_external_link_icon.png" alt="" />Saiba mais em odsbrasil.gov.br</a>
            </div>

        </div>
    )
}

export default Home