import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { createUsers } from "../../services/api";
import HackLogo from "../../assets/hack2030.png";
import "./style.css";
import { IMaskInput } from "react-imask";
import LoadingPage from "../LoadingPage";

import { verifyCep, getCoordinates } from "../../services/location";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [cepError, setCepError] = useState(false);
  const [terms, setTerms] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext);

  const createNewUser = async () => {
    if (name && email && password && cep && address && terms) {
      const cepExists = await verifyCep(cep, setCepError);

      if (cepExists) {
        const coords = await getCoordinates(address, setTryAgain, setError);

        if (coords) {
          const [lat, lon] = coords;

          setLoading(true);
          await createUsers(
            name,
            email,
            password,
            address,
            cep,
            parseFloat(lat),
            parseFloat(lon),
            0,
          )
            .then(async () => {
              await login(email, password)
                .then(() => {
                  setTryAgain(false);
                  setError(false);
                  navigate("/painel");
                })
                .catch(() => {
                  setTryAgain(false);
                  setError(true);
                });
            })
            .catch(() => {
              setTryAgain(false);
              setError(true);
            });
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    } else {
      setTryAgain(true);
    }
  };

  return (
    <div className="SignIn">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="card-login">
          <img src={HackLogo} />
          <h4>Cadastre-se grátis!</h4>
          <div className="input-area">
            <span className="label">Nome Completo</span>
            <input
              type="text"
              className="inputText"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-area">
            <span className="label">Email</span>
            <input
              type="text"
              className="inputText"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-area">
            <span className="label">
              Entre com o seu CEP{" "}
              <p className="input-text-description">ex.: 28624800</p>
            </span>
            <IMaskInput
              className="inputText"
              mask="00000000"
              value={cep}
              onAccept={(value) => setCep(value)}
            />
          </div>

          <div className="input-area">
            <span className="label">
              Endereço completo:{" "}
              <p className="input-text-description">
                ex.: Rua Teresópolis, 275, Vila Amélia, Nova Friburgo.
              </p>
            </span>
            <input
              type="text"
              className="inputText"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="input-area">
            <span className="label">Senha</span>
            <input
              type="password"
              className="inputText"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="Confirm">
            <input
              type="checkbox"
              className="CheckBox"
              onClick={() => setTerms(!terms)}
            />
            <label>
              Eu concordo com os <Link to="/termos">Termos de Serviço</Link> e
              com a <Link to="/privacidade">Política de Privacidade</Link> do
              Hack2030
            </label>
          </div>

          <button onClick={() => createNewUser()}>Cadastrar</button>

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
      )}
    </div>
  );
};

export default SignIn;
