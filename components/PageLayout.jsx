"use client";
import React, { useState, useRef } from "react";
import Head from "next/head";
import { NavBarHeader } from "./NavBarHeader";
import { useModal } from "../Hooks/useModal";
import Footer from "./Footer";


export default function PageLayout({ title, desc, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={desc} />
      </Head>
      <NavBarHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
