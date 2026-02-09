import React, { useContext, useState } from "react";
import "./style.css";

import InputText from "../../components/InputText";
import InputCheckBox from "../../components/InputCheckBox";
import { useNavigate } from "react-router-dom";
import { ResultContext } from "../../contexts/results";
import { createIniciative } from "../../services/api";
import { verifyCep, getCoordinates } from "../../services/location";

const Initiative = () => {
  const [name, setName] = useState("");
  const [nameResponsible, setNameResponsible] = useState("");
  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [actionPlace, setActionPlace] = useState("");
  const [peopleAssited, setPeopleAssisted] = useState("");
  const [selectAnswer, setSelectAnswer] = useState("");
  const [checkBoxAnswers, setCheckBoxAnswers] = useState(new Array(4).fill(0));
  const [cepError, setCepError] = useState(false);
  const [error, setError] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const { storeResult } = useContext(ResultContext);
  const navigate = useNavigate();

  const getCheckBoxAnswers = (value, index) => {
    setCheckBoxAnswers((prev) => {
      const auxArray = [...prev];
      auxArray.splice(index, 1, value);
      return auxArray;
    });
  };

  const processData = async () => {
    const auxResults = new Array(17).fill(0);
    const pointFactor = 100;
    let totalPoints = 0;
    let odsMaxIndex = 0;
    let mainODS = 0;
    let selectedAnswer = "";

    const obsSocial = [
      3, 3, 4, 4, 4, 4, 5, 5, 5, 10, 10, 10, 10, 16, 16, 16, 16, 16, 16,
    ];
    const obsAmbiental = [
      6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13,
      14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 12, 12, 12,
    ];
    const obsEconomic = [
      1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 9, 9, 9, 9, 9, 9, 11, 11, 11,
      11, 11, 11, 11, 11, 11, 11, 11, 11, 17, 17, 17, 17,
    ];

    const socialData = checkBoxAnswers[1];
    const ambientalData = checkBoxAnswers[2];
    const economicData = checkBoxAnswers[3];

    if (socialData) {
      for (let i = 0; i < socialData.length; i++) {
        if (socialData[i] === true) {
          auxResults[obsSocial[i] - 1] += pointFactor;
        }
      }
    }

    if (ambientalData) {
      for (let i = 0; i < ambientalData.length; i++) {
        if (ambientalData[i] === true) {
          auxResults[obsAmbiental[i] - 1] += pointFactor;
        }
      }
    }

    if (economicData) {
      for (let i = 0; i < economicData.length; i++) {
        if (economicData[i] === true) {
          auxResults[obsEconomic[i] - 1] += pointFactor;
        }
      }
    }

    await storeResult(auxResults);

    if (selectAnswer == "1") {
      selectedAnswer = "Sociedade Civil";
    } else if (selectAnswer == "2") {
      selectedAnswer = "Instituição Pública";
    } else if (selectAnswer == "3") {
      selectedAnswer = "Instituição Privada";
    }

    auxResults.map((eachResult, key) => {
      if (eachResult > auxResults[odsMaxIndex]) {
        odsMaxIndex = key;
      }
      totalPoints += eachResult;
    });

    mainODS = odsMaxIndex + 1;

    return [totalPoints, mainODS, selectedAnswer];
  };

  const createNewIniciative = async () => {
    if (
      name &&
      nameResponsible &&
      address &&
      cep &&
      email &&
      actionPlace &&
      peopleAssited &&
      selectAnswer
    ) {
      const [points, mainODS, selectedAnswer] = await processData();
      const cepExists = await verifyCep(cep, setCepError);
      if (cepExists) {
        const [lat, lon] = await getCoordinates(address, setTryAgain, setError);

        await createIniciative(
          name,
          nameResponsible,
          address,
          cep,
          email,
          actionPlace,
          peopleAssited,
          selectedAnswer,
          points,
          mainODS,
          parseFloat(lat),
          parseFloat(lon),
        )
          .then(() => {
            setTryAgain(false);
            setError(false);
            navigate("/resultado");
          })
          .catch(() => {
            setTryAgain(false);
            setError(true);
          });
      }
    } else {
      setTryAgain(true);
    }
  };

  const hasPillarSocial = checkBoxAnswers[0]?.[0] === true;
  const hasPillarAmbiental = checkBoxAnswers[0]?.[1] === true;
  const hasPillarEconomic = checkBoxAnswers[0]?.[2] === true;

  return (
    <div className="Initiative">
      <div className="InitiativeContainer">
        <InputText
          value={name}
          setAnswers={setName}
          label="Nome da iniciativa:"
        />
        <InputText
          value={nameResponsible}
          setAnswers={setNameResponsible}
          label="Nome completo do responsável:"
        />
        <InputText
          value={address}
          setAnswers={setAddress}
          label="Endereço completo:"
          description="ex.: Rua Teresópolis, 275, Vila Amélia, Nova Friburgo."
        />
        <InputText
          value={cep}
          setAnswers={setCep}
          label="CEP:"
          description="ex.: 28523440"
          isCep={true}
        />
        <InputText
          value={email}
          setAnswers={setEmail}
          label="Email do responsável:"
        />
        <InputText
          value={actionPlace}
          setAnswers={setActionPlace}
          label="Local de atuação da iniciativa:"
        />
        <InputText
          value={peopleAssited}
          setAnswers={setPeopleAssisted}
          label="Quantidade de pessoas atendidas:"
        />

        <div className="InitiativeArea">
          <p>Tipo da Instituição organizadora:</p>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setSelectAnswer(e.target.value)}
          >
            <option value="">Selecione sua resposta</option>
            <option value="1">Sociedade Civil</option>
            <option value="2">Instituição Pública</option>
            <option value="3">Instituição Privada</option>
          </select>
        </div>

        <InputCheckBox
          getCheckBoxAnswers={getCheckBoxAnswers}
          checkBoxIndex={0}
          title="A iniciativa tem atuação em qual dos pilares:"
          options={["Social", "Ambiental", "Econômico"]}
        />

        {hasPillarSocial ? (
          <InputCheckBox
            getCheckBoxAnswers={getCheckBoxAnswers}
            checkBoxIndex={1}
            title="No âmbito social (relacionado às pessoas), assinale as alternativas que mais se relacionam com o objetivo da sua iniciativa:"
            options={[
              "Saúde",
              "Bem-estar",
              "Educação básica",
              "Alfabetização",
              "Educação para cidadania",
              "Educação para desenvolvimento sustentável",
              "Igualdade de gênero",
              "Empoderamento de mulheres e meninas",
              "Trabalho doméstico",
              "Redução das  desigualdades",
              "Aumento de renda dos mais vulneráveis",
              "Inclusão social",
              "Econômica e política",
              "Políticas migratórias e refugiados",
              "Paz e justiça",
              "Instituições eficazes",
              "Acesso à justiça",
              "Redução da violência",
              "Redução da corrupção",
              "Gestão participativa",
            ]}
          />
        ) : null}

        {hasPillarAmbiental ? (
          <InputCheckBox
            getCheckBoxAnswers={getCheckBoxAnswers}
            checkBoxIndex={2}
            title="No âmbito ambiental (relacionado ao planeta), assinale as alternativas que mais se relacionam com o objetivo da sua iniciativa:"
            options={[
              "Qualidade da água",
              "Água potável",
              "Saneamento básico/esgoto sanitário",
              "Economia de água",
              "Qualidade de rios e córregos",
              "Proteção de mananciais",
              "Comitê de bacias hidrográficas",
              "Recursos hídricos",
              "Acesso à energia elétrica",
              "Energia limpa",
              "Consumo e produção responsáveis",
              "Uso eficiente de recursos naturais",
              "Resíduos perigosos ou reuso",
              "Turismo sustentável",
              "Mudança do clima",
              "Desastres naturais",
              "Educação para mudança do clima",
              "Gases do efeito estufa GEE",
              "Vida na água",
              "Oceanos, mares e recursos marinhos",
              "Eutrofização",
              "Lixo plástico nos mares",
              "Pesca",
              "Áreas de proteção costeira ou marinha",
              "Vida terrestre",
              "Ecossistemas terrestres",
              "Florestas",
              "Desertificação",
              "Degradação do solo",
              "Biodiversidade",
              "Áreas de proteção terrestre",
              "Desperdício de alimentos",
              "Geração energia limpa",
              "Reciclagem ou reuso",
            ]}
          />
        ) : null}

        {hasPillarEconomic ? (
          <InputCheckBox
            getCheckBoxAnswers={getCheckBoxAnswers}
            checkBoxIndex={3}
            title="No âmbito econômico (relacionado à prosperidade), assinale as alternativas que se relacionam com o objetivo da sua iniciativa:"
            options={[
              "Erradicação da pobreza",
              "Direito à moradia",
              "Resiliência dos pobres e daqueles em situação de vulnerabilidade",
              "Programas e políticas sociais",
              "Fome zero",
              "Agricultura sustentável",
              "Acesso à alimentos nutritivos",
              "Insegurança alimentar",
              "Produtividade e renda agrícola",
              "Investimento e desenvolvimento agrícola",
              "Emprego decente",
              "Crescimento econômico",
              "Direitos trabalhistas",
              "Indústria",
              "Pesquisa, desenvolvimento e  inovação",
              "Infraestrutura",
              "Microempresas",
              "Captura de carbono por atividade industrial",
              "Tecnologias de informação e comunicação",
              "Cidades e comunidades sustentáveis",
              "Habitação / moradia segura",
              "Urbanização de favelas",
              "Transporte público",
              "Desenvolvimento urbano sustentável",
              "Patrimônios culturais e naturais",
              "Desastres naturais (mortes e perdas financeiras )",
              "Gestão municipal de resíduos sólidos urbanos",
              "Poluição do ar",
              "Acesso à áreas públicas verdes e abertas",
              "Acessibilidade às áreas públicas",
              "Políticas pública económico e socioambientais",
              "Parcerias e meios de implementação",
              "Fortalecer a mobilização de recursos internos",
              "Aumentar a estabilidade macroeconômica",
              "Cooperação entre países para o desenvolvimento",
            ]}
          />
        ) : null}

        <button onClick={() => createNewIniciative()}>Enviar</button>

        {cepError ? <p>Erro ao verificar CEP, tente novamente...</p> : null}

        {error || tryAgain ? (
          tryAgain ? (
            <div>
              <p>Preencha todos os campos do formulário...</p>
            </div>
          ) : (
            <div>
              <p>Ocorreu um erro tente novamente...</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Initiative;
