import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";
import { Logo } from "../components/Logo";

//

export default function Signin() {
  const router = useRouter();
  const [formatError, setFormatError] = useState({
    user: true,
    pass: true,
    passConfirm: true,
  });
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
    passConfirm: "",
  });

  const exr = {
    user: /[\w\S]{8,30}$/g, //solo caracteres de palabra y no espacios
    pass: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/g, //minimo una minuscula una mayuscula y un digito
    passConfirm: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/g,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const validate = exr[name].test(value);
    if (value.length > 1) setFormatError({ ...formatError, [name]: validate });
    else setFormatError({ ...formatError, [name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.user.length < 2 &&
      formData.pass.length < 2 &&
      formData.passConfirm.length < 2 &&
      !formatError.user &&
      !formatError.pass &&
      !formatError.passConfirm
    ) {
      return console.log("falta");
    }
    console.log('iniciando registro');
    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      body: JSON.stringify({
        user: formData.user,
        pass: formData.pass
      })
    });
    const response = await res.json();
    console.log('registro enviado');
    if(response.success){
      alert('registrado');
      router.push('/login')
    }else{
      console.error(res.error);
      alert('algo sucedió mal')
    }
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Realice su ingreso a la plataforma" />
      </Head>
      <main>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ul className={styles.list}>
            <li className={styles.item_list}>
              <div className={styles.title}>
                <Logo size={100} color="#000" />
              </div>
            </li>
            <li className={styles.item_list}>
              <h1 className={styles.title}>Registrar nuevo usuario</h1>
            </li>
            <li className={styles.item_list}>
              <label htmlFor="user_name">Nombre de usario</label>
              <input
                className={`${styles.input_form} ${
                  !formatError.user && styles.input_err
                }`}
                type="text"
                name="user"
                id="user_name"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={formData.user}
                placeholder="Nombre de usuario"
              />
              {!formatError.user && (
                <span className={styles.warning}>
                  El nombre de usuario no debe contener espacios ni caracteres.
                  especiales
                </span>
              )}
            </li>
            <li className={styles.item_list}>
              <label htmlFor="pass">Contraseña</label>
              <input
                className={`${styles.input_form} ${
                  !formatError.pass && styles.input_err
                }`}
                type="password"
                name="pass"
                id="pass"
                value={formData.pass}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Contraseña"
              />
              {!formatError.pass && (
                <span className={styles.warning}>
                  La contraseña debe contener al menos un dígito y una
                  mayuscula, evite el uso de caracteres especiales.
                </span>
              )}
            </li>
            <li className={styles.item_list}>
              <label htmlFor="pass">Confirmar contraseña</label>
              <input
                className={`${styles.input_form} ${
                  !formatError.passConfirm && styles.input_err
                }`}
                type="password"
                name="passConfirm"
                id="pass"
                value={formData.passConfirm}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="confirmar contraseña"
              />
              {!formatError.passConfirm && (
                <span className={styles.warning}>
                  La contraseña debe contener al menos un dígito y una
                  mayuscula, evite el uso de caracteres especiales.
                </span>
              )}
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
