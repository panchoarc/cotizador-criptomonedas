import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";
import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3 ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ setmoneda, setcriptomoneda }) => {
  const [listaCripto, setlistaCripto] = useState([]);
  const [error, seterror] = useState(false);

  const MONEDAS = [
    { codigo: "AED", nombre: "United Arab Emirates Dirham" },
    { codigo: "AFN", nombre: "Afghan Afghani" },
    { codigo: "ALL", nombre: "Albanian Lek" },
    { codigo: "AMD", nombre: "Armenian Dram" },
    { codigo: "ANG", nombre: "Netherlands Antillean Guilder" },
    { codigo: "AOA", nombre: "Angolan Kwanza" },
    { codigo: "ARS", nombre: "Argentine Peso" },
    { codigo: "AUD", nombre: "Australian Dollar" },
    { codigo: "AWG", nombre: "Aruban Florin" },
    { codigo: "AZN", nombre: "Azerbaijani Manat" },
    { codigo: "BAM", nombre: "Bosnia-Herzegovina Convertible Mark" },
    { codigo: "BBD", nombre: "Barbadian Dollar" },
    { codigo: "BDT", nombre: "Bangladeshi Taka" },
    { codigo: "BGN", nombre: "Bulgarian Lev" },
    { codigo: "BHD", nombre: "Bahraini Dinar" },
    { codigo: "BIF", nombre: "Burundian Franc" },
    { codigo: "BMD", nombre: "Bermudan Dollar" },
    { codigo: "BND", nombre: "Brunei Dollar" },
    { codigo: "BOB", nombre: "Bolivian Boliviano" },
    { codigo: "BRL", nombre: "Brazilian Real" },
    { codigo: "BSD", nombre: "Bahamian Dollar" },
    { codigo: "BTC", nombre: "Bitcoin" },
    { codigo: "BTN", nombre: "Bhutanese Ngultrum" },
    { codigo: "BWP", nombre: "Botswanan Pula" },
    { codigo: "BYN", nombre: "Belarusian Ruble" },
    { codigo: "BZD", nombre: "Belize Dollar" },
    { codigo: "CAD", nombre: "Canadian Dollar" },
    { codigo: "CDF", nombre: "Congolese Franc" },
    { codigo: "CHF", nombre: "Swiss Franc" },
    { codigo: "CLF", nombre: "Chilean Unit of Account (UF)" },
    { codigo: "CLP", nombre: "Chilean Peso" },
    { codigo: "CNH", nombre: "Chinese Yuan (Offshore)" },
    { codigo: "CNY", nombre: "Chinese Yuan" },
    { codigo: "COP", nombre: "Colombian Peso" },
    { codigo: "CRC", nombre: "Costa Rican Colón" },
    { codigo: "CUC", nombre: "Cuban Convertible Peso" },
    { codigo: "CUP", nombre: "Cuban Peso" },
    { codigo: "CVE", nombre: "Cape Verdean Escudo" },
    { codigo: "CZK", nombre: "Czech Republic Koruna" },
    { codigo: "DJF", nombre: "Djiboutian Franc" },
    { codigo: "DKK", nombre: "Danish Krone" },
    { codigo: "DOP", nombre: "Dominican Peso" },
    { codigo: "DZD", nombre: "Algerian Dinar" },
    { codigo: "EGP", nombre: "Egyptian Pound" },
    { codigo: "ERN", nombre: "Eritrean Nakfa" },
    { codigo: "ETB", nombre: "Ethiopian Birr" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "FJD", nombre: "Fijian Dollar" },
    { codigo: "FKP", nombre: "Falkland Islands Pound" },
    { codigo: "GBP", nombre: "British Pound Sterling" },
    { codigo: "GEL", nombre: "Georgian Lari" },
    { codigo: "GGP", nombre: "Guernsey Pound" },
    { codigo: "GHS", nombre: "Ghanaian Cedi" },
    { codigo: "GIP", nombre: "Gibraltar Pound" },
    { codigo: "GMD", nombre: "Gambian Dalasi" },
    { codigo: "GNF", nombre: "Guinean Franc" },
    { codigo: "GTQ", nombre: "Guatemalan Quetzal" },
    { codigo: "GYD", nombre: "Guyanaese Dollar" },
    { codigo: "HKD", nombre: "Hong Kong Dollar" },
    { codigo: "HNL", nombre: "Honduran Lempira" },
    { codigo: "HRK", nombre: "Croatian Kuna" },
    { codigo: "HTG", nombre: "Haitian Gourde" },
    { codigo: "HUF", nombre: "Hungarian Forint" },
    { codigo: "IDR", nombre: "Indonesian Rupiah" },
    { codigo: "ILS", nombre: "Israeli New Sheqel" },
    { codigo: "IMP", nombre: "Manx pound" },
    { codigo: "INR", nombre: "Indian Rupee" },
    { codigo: "IQD", nombre: "Iraqi Dinar" },
    { codigo: "IRR", nombre: "Iranian Rial" },
    { codigo: "ISK", nombre: "Icelandic Króna" },
    { codigo: "JEP", nombre: "Jersey Pound" },
    { codigo: "JMD", nombre: "Jamaican Dollar" },
    { codigo: "JOD", nombre: "Jordanian Dinar" },
    { codigo: "JPY", nombre: "Japanese Yen" },
    { codigo: "KES", nombre: "Kenyan Shilling" },
    { codigo: "KGS", nombre: "Kyrgystani Som" },
    { codigo: "KHR", nombre: "Cambodian Riel" },
    { codigo: "KMF", nombre: "Comorian Franc" },
    { codigo: "KPW", nombre: "North Korean Won" },
    { codigo: "KRW", nombre: "South Korean Won" },
    { codigo: "KWD", nombre: "Kuwaiti Dinar" },
    { codigo: "KYD", nombre: "Cayman Islands Dollar" },
    { codigo: "KZT", nombre: "Kazakhstani Tenge" },
    { codigo: "LAK", nombre: "Laotian Kip" },
    { codigo: "LBP", nombre: "Lebanese Pound" },
    { codigo: "LKR", nombre: "Sri Lankan Rupee" },
    { codigo: "LRD", nombre: "Liberian Dollar" },
    { codigo: "LSL", nombre: "Lesotho Loti" },
    { codigo: "LYD", nombre: "Libyan Dinar" },
    { codigo: "MAD", nombre: "Moroccan Dirham" },
    { codigo: "MDL", nombre: "Moldovan Leu" },
    { codigo: "MGA", nombre: "Malagasy Ariary" },
    { codigo: "MKD", nombre: "Macedonian Denar" },
    { codigo: "MMK", nombre: "Myanma Kyat" },
    { codigo: "MNT", nombre: "Mongolian Tugrik" },
    { codigo: "MOP", nombre: "Macanese Pataca" },
    { codigo: "MRO", nombre: "Mauritanian Ouguiya (pre-2018)" },
    { codigo: "MRU", nombre: "Mauritanian Ouguiya" },
    { codigo: "MUR", nombre: "Mauritian Rupee" },
    { codigo: "MVR", nombre: "Maldivian Rufiyaa" },
    { codigo: "MWK", nombre: "Malawian Kwacha" },
    { codigo: "MXN", nombre: "Mexican Peso" },
    { codigo: "MYR", nombre: "Malaysian Ringgit" },
    { codigo: "MZN", nombre: "Mozambican Metical" },
    { codigo: "NAD", nombre: "Namibian Dollar" },
    { codigo: "NGN", nombre: "Nigerian Naira" },
    { codigo: "NIO", nombre: "Nicaraguan Córdoba" },
    { codigo: "NOK", nombre: "Norwegian Krone" },
    { codigo: "NPR", nombre: "Nepalese Rupee" },
    { codigo: "NZD", nombre: "New Zealand Dollar" },
    { codigo: "OMR", nombre: "Omani Rial" },
    { codigo: "PAB", nombre: "Panamanian Balboa" },
    { codigo: "PEN", nombre: "Peruvian Nuevo Sol" },
    { codigo: "PGK", nombre: "Papua New Guinean Kina" },
    { codigo: "PHP", nombre: "Philippine Peso" },
    { codigo: "PKR", nombre: "Pakistani Rupee" },
    { codigo: "PLN", nombre: "Polish Zloty" },
    { codigo: "PYG", nombre: "Paraguayan Guarani" },
    { codigo: "QAR", nombre: "Qatari Rial" },
    { codigo: "RON", nombre: "Romanian Leu" },
    { codigo: "RSD", nombre: "Serbian Dinar" },
    { codigo: "RUB", nombre: "Russian Ruble" },
    { codigo: "RWF", nombre: "Rwandan Franc" },
    { codigo: "SAR", nombre: "Saudi Riyal" },
    { codigo: "SBD", nombre: "Solomon Islands Dollar" },
    { codigo: "SCR", nombre: "Seychellois Rupee" },
    { codigo: "SDG", nombre: "Sudanese Pound" },
    { codigo: "SEK", nombre: "Swedish Krona" },
    { codigo: "SGD", nombre: "Singapore Dollar" },
    { codigo: "SHP", nombre: "Saint Helena Pound" },
    { codigo: "SLL", nombre: "Sierra Leonean Leone" },
    { codigo: "SOS", nombre: "Somali Shilling" },
    { codigo: "SRD", nombre: "Surinamese Dollar" },
    { codigo: "SSP", nombre: "South Sudanese Pound" },
    { codigo: "STD", nombre: "São Tomé and Príncipe Dobra (pre-2018)" },
    { codigo: "STN", nombre: "São Tomé and Príncipe Dobra" },
    { codigo: "SVC", nombre: "Salvadoran Colón" },
    { codigo: "SYP", nombre: "Syrian Pound" },
    { codigo: "SZL", nombre: "Swazi Lilangeni" },
    { codigo: "THB", nombre: "Thai Baht" },
    { codigo: "TJS", nombre: "Tajikistani Somoni" },
    { codigo: "TMT", nombre: "Turkmenistani Manat" },
    { codigo: "TND", nombre: "Tunisian Dinar" },
    { codigo: "TOP", nombre: "Tongan Pa'anga" },
    { codigo: "TRY", nombre: "Turkish Lira" },
    { codigo: "TTD", nombre: "Trinidad and Tobago Dollar" },
    { codigo: "TWD", nombre: "New Taiwan Dollar" },
    { codigo: "TZS", nombre: "Tanzanian Shilling" },
    { codigo: "UAH", nombre: "Ukrainian Hryvnia" },
    { codigo: "UGX", nombre: "Ugandan Shilling" },
    { codigo: "USD", nombre: "United States Dollar" },
    { codigo: "UYU", nombre: "Uruguayan Peso" },
    { codigo: "UZS", nombre: "Uzbekistan Som" },
    { codigo: "VEF", nombre: "Venezuelan Bolívar Fuerte (Old)" },
    { codigo: "VES", nombre: "Venezuelan Bolívar Soberano" },
    { codigo: "VND", nombre: "Vietnamese Dong" },
    { codigo: "VUV", nombre: "Vanuatu Vatu" },
    { codigo: "WST", nombre: "Samoan Tala" },
    { codigo: "XAF", nombre: "CFA Franc BEAC" },
    { codigo: "XAG", nombre: "Silver Ounce" },
    { codigo: "XAU", nombre: "Gold Ounce" },
    { codigo: "XCD", nombre: "East Caribbean Dollar" },
    { codigo: "XDR", nombre: "Special Drawing Rights" },
    { codigo: "XOF", nombre: "CFA Franc BCEAO" },
    { codigo: "XPD", nombre: "Palladium Ounce" },
    { codigo: "XPF", nombre: "CFP Franc" },
    { codigo: "XPT", nombre: "Platinum Ounce" },
    { codigo: "YER", nombre: "Yemeni Rial" },
    { codigo: "ZAR", nombre: "South African Rand" },
    { codigo: "ZMW", nombre: "Zambian Kwacha" },
    { codigo: "ZWL", nombre: "Zimbabwean Dollar" },
  ];
  const [moneda, SelectMoneda] = useMoneda("Elige tu moneda", "", MONEDAS);

  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listaCripto
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(URL);
      setlistaCripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const cotizarMoneda = (e) => {
    e.preventDefault();

    if (moneda === "" || criptomoneda === "") {
      seterror(true);
      return;
    }
    seterror(false);
    console.log(moneda);
    setmoneda(moneda);
    console.log(criptomoneda);
    setcriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMoneda />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

Formulario.propTypes = {
  setmoneda: PropTypes.func.isRequired,
  setcriptomoneda: PropTypes.func.isRequired,
};

export default Formulario;
