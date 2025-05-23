import CountryFlag from "react-country-flag";

export const CountryToCode: Record<string, string> = {
  Afganistán: "AF",
  Albania: "AL",
  Alemania: "DE",
  Andorra: "AD",
  Angola: "AO",
  AntiguaYBarbuda: "AG",
  ArabiaSaudita: "SA",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaiyán: "AZ",
  Bahamas: "BS",
  Bangladés: "BD",
  Barbados: "BB",
  Baréin: "BH",
  Bélgica: "BE",
  Belice: "BZ",
  Benín: "BJ",
  Bielorrusia: "BY",
  Birmania: "MM",
  Bolivia: "BO",
  BosniaYHerzegovina: "BA",
  Botsuana: "BW",
  Brasil: "BR",
  Brunéi: "BN",
  Bulgaria: "BG",
  BurkinaFaso: "BF",
  Burundi: "BI",
  Bután: "BT",
  CaboVerde: "CV",
  Camboya: "KH",
  Camerún: "CM",
  Canadá: "CA",
  Catar: "QA",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Chipre: "CY",
  Colombia: "CO",
  Comoras: "KM",
  Congo: "CG",
  CoreaDelNorte: "KP",
  CoreaDelSur: "KR",
  CostaDeMarfil: "CI",
  CostaRica: "CR",
  Croacia: "HR",
  Cuba: "CU",
  Dinamarca: "DK",
  Dominica: "DM",
  Ecuador: "EC",
  Egipto: "EG",
  ElSalvador: "SV",
  EmiratosÁrabesUnidos: "AE",
  Eritrea: "ER",
  Eslovaquia: "SK",
  Eslovenia: "SI",
  España: "ES",
  EstadosUnidos: "US",
  Estonia: "EE",
  Etiopía: "ET",
  Filipinas: "PH",
  Finlandia: "FI",
  Fiyi: "FJ",
  Francia: "FR",
  Gabón: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Ghana: "GH",
  Granada: "GD",
  Grecia: "GR",
  Guatemala: "GT",
  Guinea: "GN",
  GuineaBissau: "GW",
  GuineaEcuatorial: "GQ",
  Guyana: "GY",
  Haití: "HT",
  Honduras: "HN",
  Hungría: "HU",
  India: "IN",
  Indonesia: "ID",
  Irak: "IQ",
  Irán: "IR",
  Irlanda: "IE",
  Islandia: "IS",
  IslasMarshall: "MH",
  IslasSalomón: "SB",
  Israel: "IL",
  Italia: "IT",
  Jamaica: "JM",
  Japón: "JP",
  Jordania: "JO",
  Kazajistán: "KZ",
  Kenia: "KE",
  Kirguistán: "KG",
  Kiribati: "KI",
  Kuwait: "KW",
  Laos: "LA",
  Lesoto: "LS",
  Letonia: "LV",
  Líbano: "LB",
  Liberia: "LR",
  Libia: "LY",
  Liechtenstein: "LI",
  Lituania: "LT",
  Luxemburgo: "LU",
  MacedoniaDelNorte: "MK",
  Madagascar: "MG",
  Malasia: "MY",
  Malaui: "MW",
  Maldivas: "MV",
  Malí: "ML",
  Malta: "MT",
  Marruecos: "MA",
  Mauricio: "MU",
  Mauritania: "MR",
  México: "MX",
  Micronesia: "FM",
  Moldavia: "MD",
  Mónaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Mozambique: "MZ",
  Namibia: "NA",
  Nauru: "NR",
  Nepal: "NP",
  Nicaragua: "NI",
  Níger: "NE",
  Nigeria: "NG",
  Noruega: "NO",
  NuevaZelanda: "NZ",
  Omán: "OM",
  PaísesBajos: "NL",
  Pakistán: "PK",
  Palaos: "PW",
  Palestina: "PS",
  Panamá: "PA",
  PapúaNuevaGuinea: "PG",
  Paraguay: "PY",
  Perú: "PE",
  Polonia: "PL",
  Portugal: "PT",
  ReinoUnido: "GB",
  RepúblicaCentroafricana: "CF",
  RepúblicaCheca: "CZ",
  RepúblicaDominicana: "DO",
  Ruanda: "RW",
  Rumanía: "RO",
  Rusia: "RU",
  Samoa: "WS",
  SanCristóbalYNieves: "KN",
  SanMarino: "SM",
  SanVicenteYLasGranadinas: "VC",
  SantaLucía: "LC",
  SantoToméYPríncipe: "ST",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  SierraLeona: "SL",
  Singapur: "SG",
  Siria: "SY",
  Somalia: "SO",
  SriLanka: "LK",
  Sudáfrica: "ZA",
  Sudán: "SD",
  SudánDelSur: "SS",
  Suecia: "SE",
  Suiza: "CH",
  Surinam: "SR",
  Tailandia: "TH",
  Taiwán: "TW",
  Tanzania: "TZ",
  Tayikistán: "TJ",
  TimorOriental: "TL",
  Togo: "TG",
  Tonga: "TO",
  TrinidadYTobago: "TT",
  Túnez: "TN",
  Turquía: "TR",
  Turkmenistán: "TM",
  Tuvalu: "TV",
  Ucrania: "UA",
  Uganda: "UG",
  Uruguay: "UY",
  Uzbekistán: "UZ",
  Vanuatu: "VU",
  Vaticano: "VA",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Yibuti: "DJ",
  Zambia: "ZM",
  Zimbabue: "ZW",

  Spain: "ES",
  Italy: "IT",
  Mexico: "MX",
  UnitedKingdom: "GB",
  UnitedStates: "US",
  Brazil: "BR",
  Germany: "DE",
  France: "FR",
  Peru: "PE",
};

export const renderCountryFlag = (country: string) => {
  const code = CountryToCode[country];
  if (!code) return <span>🏳️</span>; // Icono por defecto si no se encuentra el país
  return (
    <CountryFlag
      countryCode={code}
      svg
      style={{ width: "24px", height: "18px" }}
      title={country}
    />
  );
};

export default CountryToCode;
