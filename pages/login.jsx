import React, { useState } from "react";
import styles from "../styles/Form.module.css";
import Head from "next/head";
import Link from "next/link";
import { loginValidate } from "../lib/loginRequest";

export default function Login() {
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resV = await loginValidate(formData);
    if(!resV.success) return alert('nope');
    alert('yep')
  };

  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="description" content="Realice su ingreso a la plataforma" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ul className={styles.list}>
            <li className={styles.item_list}>
              <h1>Ingresar</h1>
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
              <button className={styles.btn} type="submit">
                Ingresar
              </button>
            </li>
            <li className={styles.item_list}>
              <p>
                ¿Aún no tiene una cuenta?{" "}
                <Link href="/signin">registrate aquí</Link>
              </p>
            </li>
          </ul>
        </form>
      </main>
    </>
  );
}
