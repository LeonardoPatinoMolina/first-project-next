import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Form.module.css";

export default function Signin() {
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
    passConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("registrando");
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Realice su ingreso a la plataforma" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ul className={styles.list}>
          <li className={styles.item_list}>
              <h1>Registrar nuevo usuario</h1>
              </li>
            <li className={styles.item_list}>
              <label htmlFor="user_name">Nombre de usario</label>
              <input
                className={styles.input_form}
                type="text"
                name="user"
                id="user_name"
                onChange={handleChange}
                value={formData.user}
                placeholder="Nombre de usuario"
              />
            </li>
            <li className={styles.item_list}>
              <label htmlFor="pass">Contraseña</label>
              <input
                className={styles.input_form}
                type="password"
                name="pass"
                id="pass"
                value={formData.pass}
                onChange={handleChange}
                placeholder="Contraseña"
              />
            </li>
            <li className={styles.item_list}>
              <label htmlFor="pass">Confirmar contraseña</label>
              <input
                className={styles.input_form}
                type="password"
                name="passConfirm"
                id="pass"
                value={formData.passConfirm}
                onChange={handleChange}
                placeholder="confirmar contraseña"
              />
            </li>
            <li className={styles.item_list}>
              <button className={styles.btn} type="submit">
                Registrar
              </button>
            </li>
            <li className={styles.item_list}>
              <p>
                <Link href="/login">Volver a ingreso</Link>
              </p>
            </li>
          </ul>
        </form>
      </main>
    </>
  );
}
