export const FORM_OPTIONS = {
    colourOpts: [
        {label: "BLANCO", value: "MOST_COMMON", hex: "#FFFFFF"},
        {label: "GRIS", value: "COMMON", hex: "#8C8C8C"},
        {label: "PLATA", value: "COMMON", hex: "#C6C6C6"},
        {label: "NEGRO", value: "COMMON", hex: "#000000"},
        {label: "ROJO", value: "COMMON", hex: "#D91430"},
        {label: "AZUL", value: "RARE", hex: "#1860A8"},
        {label: "MARRON", value: "RARE", hex: "#AB805E"},
        {label: "BEIGE", value: "RARE", hex: "#E6C8A4"},
        {label: "OTRO", value: "EXOTIC", hex: null},
    ],
    licensePlateOpts: [
        { label: "Modelo de 1995 (AAA 000)", value: 1 },
        { label: "Modelo de 2016 (AA 000 AA)", value: 2 },
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
    ]

}