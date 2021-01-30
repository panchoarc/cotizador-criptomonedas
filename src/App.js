import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Formulario from "./Components/Formulario";
import imagen from "./cryptomonedas.png";
import axios from "axios";
import Cotizacion from "./Components/Cotizacion";
import Spinner from "./Components/Spinner";
import Error from "./Components/Error";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;
function App() {
  const [moneda, setmoneda] = useState("");
  const [criptomoneda, setcriptomoneda] = useState("");
  const [resultado, setresultado] = useState({});
  const [error, setError] = useState(false);
  const [mensaje, setmensaje] = useState("");

  const [cargando, setcargando] = useState(false);

  useEffect(() => {
    
    const cotizarCriptomoneda = async () => {
      if (moneda === "") return;

      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      await axios
        .get(URL)
        .then((resultado) => {
          if (!resultado.data?.Response) {
            console.log(resultado);
            setcargando(true);
            setError(false);

            setTimeout(() => {
              setcargando(false);
              setresultado(resultado.data.DISPLAY[criptomoneda][moneda]);
            }, 2000);
          } else {
            setresultado({});
            setError(true);
            setmensaje("No se puede realizar la cotización, no se encuentra la moneda");
          }
        })
        .catch((err) => {
          setError(true);
          setmensaje(err.data.Message);
        });
    };
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen Crypto" />
      </div>
      <div>
        <Heading> Cotiza Criptomonedas al Instante </Heading>

        {error ? <Error mensaje={mensaje} /> : null}
        <Formulario setcriptomoneda={setcriptomoneda} setmoneda={setmoneda} />

        {cargando ? <Spinner /> : <Cotizacion resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
