import React from "react";
import { Menubar } from "primereact/menubar";
import { INSTITUTIONAL } from "../utils/assets/institutional";
import { MAIN_URLS } from "../utils/constants";
import { HOME, TECHMO_URLS } from "../utils/constants/urls";

export const Header = () => {
  const items = [
    {
      label: "Inicio",
      command: () => {
        window.open(TECHMO_URLS.HOME, "_blank").focus();
      },
    },
    {
      label: "Créditos",
      items: [
        {
          label: "¿Por qué elegirnos?",
          command: () => {
            window.open(TECHMO_URLS.CAR_CREDITS, "_blank").focus();
          },
        },
        {
          label: "Simulá tu crédito",
          command: () => {
            window.open(TECHMO_URLS.CAR_CREDITS_SIMULATION, "_blank").focus();
          },
        },
      ],
    },
    {
      label: "Seguros",
      command: () => {
        window.open(TECHMO_URLS.CAR_INSURANCES, "_blank").focus();
      },
    },
    {
      label: "Servicios",
      items: [
        {
          label: "Generación de leads",
          command: () => {
            window.open(TECHMO_URLS.QUALITY_LEADS, "_blank").focus();
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
            window.open(TECHMO_URLS.MARKETPLACE, "_blank").focus();
          },
        },
        {
          label: "Blog",
          command: () => {
            window.open(TECHMO_URLS.BLOG_POSTS, "_blank").focus();
          },
        },
        {
          label: "Cotizá tu auto",
          command: () => {
            window.open(MAIN_URLS.NEW_SALE_FORM, "_blank").focus();
          },
        },
      ],
    },
    {
      label: "Contacto",
      command: () => {
        window.open(TECHMO_URLS.COMMUNICATION_CHANNEL, "_blank").focus();
      },
    },
  ];

  const start = (
    <>
      <a style={{ textDecoration: "none" }} href={HOME} target="_blank">
        <img
          alt="logo"
          src={INSTITUTIONAL.LOGO_CON_TEXTO}
          className="h-3rem mx-5 w-auto hidden lg:flex"
        ></img>
      </a>
    </>
  );

  const end = (
    <>
      <img
        alt="logo"
        src={INSTITUTIONAL.LOGO_SOLO}
        className="h-2rem mx-3 w-auto flex lg:hidden"
      ></img>
    </>
  );

  return (
    <>
      <Menubar
        className="py-3 align-items-center justify-content-center menubar"
        model={items}
        start={start}
        end={end}
      />
    </>
  );
};
