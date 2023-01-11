import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Modal } from "../components/Modal";
import { useModal } from "../Hooks/useModal";
import { Logo } from "../components/Logo";
import { usernameValidate } from "../lib/usernameRequest";
import styles from "../styles/Form.module.css";

//

export default function Signin() {
  const router = useRouter();
  const [viewPass, setviewPass] = useState(false);
  const [loadingModalLoot, openLoadingModal, closeLoadingModal] = useModal({
    type: "def",
    openStatus: false,
    autoClose: false,
  });
  const [successModalLoot, openSuccessModal] = useModal({
    type: "success",
    openStatus: false,
    autoClose: false,
  });
  const [formatErrorModalLoot, openFormatErrorModal] = useModal({
    type: "warning",
    openStatus: false,
    autoClose: true,
  });
  const [userErrorModalLoot, openUserErrorModal] = useModal({
    type: "error",
    openStatus: false,
    autoClose: true,
  });
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
    user: /[^\W\s]{8,30}$/g, //solo caracteres de palabra y no espacios
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
    openLoadingModal();
    if (
      formData.user.length < 2 ||
      formData.pass.length < 2 ||
      formData.passConfirm.length < 2 ||
      !formatError.user ||
      !formatError.pass ||
      !formatError.passConfirm ||
      formatError.pass !== formatError.passConfirm
    ) {
      return errorHandle();
    }
    //------------
    const userValidate = await usernameValidate(formData.user);
    if (userValidate.success) return errorHandle2();
    //------------
    console.log("iniciando registro");
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          user: formData.user,
          pass: formData.pass,
        }),
      });
      console.log("registro enviado",res);
      const response = await res.json();
      if (!response.success) {
        console.error(res.error);
        return errorHandle();
      }
      openSuccessModal();
      router.push("/login");
    } catch (err) {
      errorHandle();
    }
  };
  const errorHandle = () => {
    console.log("error manejado");
    closeLoadingModal();
    openFormatErrorModal();
  };
  const errorHandle2 = () => {
    console.log("error manejado 2");
    closeLoadingModal();
    openUserErrorModal();
  };
  return (
    <>
      <Modal loot={loadingModalLoot}>Validando datos...</Modal>
      <Modal loot={successModalLoot}>
        Registro exitoso, redirigiendo a ingreso...
      </Modal>
      <Modal loot={userErrorModalLoot}>
        ¡Tarea fallida! El nombre de usuario ya existe.
      </Modal>
      <Modal loot={formatErrorModalLoot}>
        ¡Tarea fallida! Verifique los datos ingresados.
      </Modal>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Realice su ingreso a la plataforma" />
      </Head>
      <div className={styles.wrapper}>
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
                required
              />
              {!formatError.user && (
                <span className={styles.warning}>
                  El nombre de usuario no debe contener espacios ni caracteres
                  especiales, minimo 8 caracteres.
                </span>
              )}
            </li>
            <li className={styles.item_list}>
              <label htmlFor="pass">Contraseña</label>
              <input
                className={`${styles.input_form} ${
                  !formatError.pass && styles.input_err
                }`}
                type={viewPass ? "text" : "password"}
                name="pass"
                id="pass"
                value={formData.pass}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Contraseña"
                required
              />
              {!formatError.pass && (
                <span className={styles.warning}>
                  La contraseña debe contener al menos un dígito y una
                  mayuscula, evite el uso de caracteres especiales, mínimo 8
                  caracteres.
                </span>
              )}
            </li>
            <li className={styles.item_list}>
              <label htmlFor="pass">Confirmar contraseña</label>
              <input
                className={`${styles.input_form} ${
                  !formatError.passConfirm && styles.input_err
                }`}
                type={viewPass ? "text" : "password"}
                name="passConfirm"
                id="confirm_pass"
                value={formData.passConfirm}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="confirmar contraseña"
                required
              />
              {!formatError.passConfirm && (
                <span className={styles.warning}>
                  La contraseña debe contener al menos un dígito y una
                  mayuscula, evite el uso de caracteres especiales.
                </span>
              )}
            </li>
            <li className={styles.item_list}>
              <div className={styles.check_area}>
                <label id={styles.show_pass} htmlFor="showPass">Mostrar contraseña</label>
                <input
                  type="checkbox"
                  name="showPass"
                  id="showPass"
                  onChange={({ target }) => setviewPass(target.checked)}
                />
              </div>
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
      </div>
    </>
  );
}
