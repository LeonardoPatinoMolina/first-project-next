import React, { useState } from "react";
import styles from "../styles/Form.module.css";
import Head from "next/head";
import Link from "next/link";
import { loginValidate } from "../lib/loginRequest";
import { Logo } from "../components/Logo";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [formatError, setFormatError] = useState({
    user: true,
    pass: true,
  });
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
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
    setFormatError({ ...formatError, [name]: validate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.user.length < 2 &&
      formData.pass.length < 2 &&
      !formatError.user &&
      !formatError.pass
    ) {
      return console.log("falta");
    }
    const res = await fetch('/api/auth/login',{
      method: 'POST',
      body:   JSON.stringify(formData),
    })
    const response = await res.json();
    if(response.success){
      alert('logeado')
      router.push('/');
    }else{
      alert('falla')
      console.error('algo salio mal');
    }
  };

  return (
    <>
      <Head>
        <title>Log in</title>
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
              <h1 className={styles.title}>Ingresar</h1>
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
                onChange={handleChange}
                value={formData.user}
                placeholder="Nombre de usuario"
              />
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
                ¿Aún no tiene una cuenta?
                <Link href="/signin">registrate aquí</Link>
              </p>
            </li>
          </ul>
        </form>
      </main>
    </>
  );
}
