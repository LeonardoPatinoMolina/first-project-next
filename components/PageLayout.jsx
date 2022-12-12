"use client";
import React, { useState, useRef } from "react";
import Head from "next/head";
import { NavBarHeader } from "./NavBarHeader";
import {Modal} from "./Modal";
import { useModal } from "../Hooks/useModal";
import Footer from "./Footer";


export default function PageLayout({ title, desc, children }) {
  const [isOpenModal, openModal, closeModal] = useModal(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={desc} />
      </Head>
      <Modal title={"Buscando..."} isOpen={isOpenModal}>
        <span className="material-icons modal__icon">styles.rotate_right</span>
      </Modal>
      <NavBarHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
