import { BRAND_LOGOS } from "../assets/brands";

export const BRAND_OPTIONS = {
  mainBrands: [
    {
      name: "Fiat",
      logo: BRAND_LOGOS.FIAT,
      infoAutoId: null,
    },
    { name: "Ford", logo: BRAND_LOGOS.FORD, infoAutoId: null },
    {
      name: "Renault",
      logo: BRAND_LOGOS.RENAULT,
      infoAutoId: null,
    },
    { name: "Chevrolet", logo: BRAND_LOGOS.CHEVROLET, infoAutoId: null },
    {
      name: "Nissan",
      logo: BRAND_LOGOS.NISSAN,
      infoAutoId: null,
    },
    { name: "Volkswagen", logo: BRAND_LOGOS.VOLKSWAGEN, infoAutoId: null },
    {
      name: "Citroen",
      logo: BRAND_LOGOS.CITROEN,
      infoAutoId: null,
    },
    { name: "Peugeot", logo: BRAND_LOGOS.PEUGEOT, infoAutoId: null },
    {
      name: "Toyota",
      logo: BRAND_LOGOS.TOYOTA,
      infoAutoId: null,
    },
    { name: "Hyundai", logo: BRAND_LOGOS.HYUNDAI, infoAutoId: null },
    {
      name: "Chrysler",
      logo: BRAND_LOGOS.CHRYSLER,
      infoAutoId: null,
    },
    { name: "Honda", logo: BRAND_LOGOS.HONDA, infoAutoId: null },
  ],
};

export const REVISION_OPTIONS = {
  calendarOpts: {
    firstDayOfWeek: 0,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  },
};

export const VEHICLE_DETAILS_OPTIONS = {
  colourOpts: [
    { label: "BLANCO", value: "MOST_COMMON", hex: "#FFFFFF" },
    { label: "GRIS", value: "COMMON", hex: "#8C8C8C" },
    { label: "PLATA", value: "COMMON", hex: "#C6C6C6" },
    { label: "NEGRO", value: "COMMON", hex: "#000000" },
    { label: "ROJO", value: "COMMON", hex: "#D91430" },
    { label: "AZUL", value: "RARE", hex: "#1860A8" },
    { label: "MARRON", value: "RARE", hex: "#AB805E" },
    { label: "BEIGE", value: "RARE", hex: "#E6C8A4" },
    { label: "OTRO", value: "EXOTIC", hex: null },
  ],
  stateOpts: [
    { label: "Con muchos detalles", value: "MANY_DETAILS" },
    { label: "Con pocos detalles", value: "FEW_DETAILS" },
    { label: "Aceptable", value: "GOOD" },
    { label: "Bueno", value: "VERY_GOOD" },
    { label: "Excelente", value: "EXCELLENT" },
  ],
  currencyOpts: [
    { value: "ARS", label: "Pesos argentinos" },
    { value: "USD", label: "Dólares estadounidenses" },
  ],
  urgencyOpts: [
    { label: "En menos de 1 semana", value: "ONE_WEEK" },
    { label: "En 2 semanas", value: "TWO_WEEKS" },
    { label: "En 3 semanas", value: "THREE_WEEKS" },
    { label: "En 4 semanas", value: "FOUR_WEEKS" },
    { label: "No tengo apuro", value: "NO_HURRY" },
  ],
};


export const OWNER_OPTIONS = {
  maritalStatus: [
    { label: "Casado", value: "CASADO" },
    { label: "Divorciado", value: "DIVORCIADO" },
    { label: "Viudo", value: "VIUDO" },
    { label: "Soltero", value: "SOLTERO" }
  ],
  dniSex: [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
  ],
};
