"use client";
import { useState } from "react";
import Head from "next/head";
import LoginForm from "../components/loginForm";
import SigninForm from "../components/signinForm";
import styles from "../styles/Gate.module.css";

export default function Gate() {
  const [initContext, setinitContext] = useState({
    title: "Log in",
    formType: "login",
  });
  return (
    <>
      <Head>
        <title>{initContext.title}</title>
        <meta name="description" content="Realice su ingreso a la plataforma" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.wrapper__gate}>
          {initContext.formType === "login" ? (
            <LoginForm setForm={setinitContext} />
          ) : (
            <SigninForm setForm={setinitContext} />
          )}
      </div>
    </>
  );
}
