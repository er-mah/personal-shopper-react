import React from "react";
import { Menubar } from "primereact/menubar";
import { INSTITUTIONAL } from "../utils/assets/institutional";
import { useNavigate } from "react-router-dom";
import { MAIN_URLS } from "../utils/constants";
import { MAH_URLS } from "../utils/constants/urls";

export const Header = () => {
  let navigate = useNavigate();

  const items = [
    {
      label: "Inicio",
      command: () => {
        window.location.replace(MAH_URLS.HOME);
      },
    },
    {
      label: "Créditos",
      items: [
        {
          label: "¿Por qué elegirnos?",
          command: () => {
            window.location.replace(MAH_URLS.CAR_CREDITS);
          },
        },
        {
          label: "Simulá tu crédito",
          command: () => {
            window.location.replace(MAH_URLS.CAR_CREDITS_SIMULATION);
          },
        },
      ],
    },
    {
      label: "Seguros",
      command: () => {
        window.location.replace(MAH_URLS.CAR_INSURANCES);
      },
    },
    {
      label: "Servicios",
      items: [
        {
          label: "Generación de leads",
          command: () => {
            window.location.replace(MAH_URLS.QUALITY_LEADS);
          },
        },
      ],
    },
    {
      label: "Usados",
      items: [
        {
          label: "Marketplace",
          command: () => {
            window.location.replace(MAH_URLS.MARKETPLACE);
          },
        },
        {
          label: "Blog",
          command: () => {
            window.location.replace(MAH_URLS.BLOG_POSTS);
          },
        },
        {
          label: "Cotizá tu auto",
          command: () => {
            navigate(MAIN_URLS.NEW_SALE_FORM);
          },
        },
      ],
    },
    {
      label: "Contacto",
      command: () => {
        window.location.replace("https://www.miautohoy.com.ar/contacto");
      },
    },
  ];

  const start = (
    <>
      <img
        alt="logo"
        src={INSTITUTIONAL.LOGO_CON_TEXTO}
        className="h-2rem mx-5 w-auto hidden lg:flex"
      ></img>
    </>
  );

  const end = (
    <>
      <img
        alt="logo"
        src={INSTITUTIONAL.LOGO_CON_TEXTO}
        className="h-2rem mx-3 w-auto flex lg:hidden"
      ></img>
    </>
  );

  return (
    <>
      <Menubar className="py-3 align-items-center justify-content-center px-2" model={items} start={start} end={end} />
    </>
  );
};
