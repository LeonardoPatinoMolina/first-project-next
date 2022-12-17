import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { Modal } from "../components/Modal";
import { useModal } from "../Hooks/useModal";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";

export default function Login() {
  const router = useRouter();
  const [loadingModalIsOpen, openLoadingModal, closeLoadingModal] =
    useModal(false);
  const [successModalIsOpen, openSuccessModal, closeSuccessModal] =
    useModal(false);
  const [errorModalIsOpen, openErrorModal, closeErrorModal] = useModal(false);
  const [formatErrorModalIsOpen, openFormatErrorModal, closeFormatErrorModal] =
    useModal(false);
  const [unauthModalIsOpen, openUnauthModal, closeUnauthModal] =
    useModal(false);

  const [formatError, setFormatError] = useState({
    user: true,
    pass: true,
  });
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
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
    setFormatError({ ...formatError, [name]: validate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    openLoadingModal();
    if (
      formData.user.length < 2 ||
      formData.pass.length < 2 ||
      !formatError.user ||
      !formatError.pass
    ) {
      return formatErrorHandle();
    }
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const response = await res.json();
      if (response.success) {
        closeLoadingModal();
        openSuccessModal();
        router.push("/");
      } else {
        errorHandle2();
      }
    } catch (err) {
      errorHandle();
    }
  };
  const errorHandle = () => {
    closeLoadingModal();
    closeSuccessModal();
    openErrorModal();
    if (typeof window) setTimeout(() => closeErrorModal(), 2500);
  };
  const formatErrorHandle = () => {
    closeLoadingModal();
    openFormatErrorModal();
    if (typeof window) setTimeout(() => closeFormatErrorModal(), 2500);
  };
  const errorHandle2 = () => {
    closeLoadingModal();
    openUnauthModal();
    if (typeof window) setTimeout(() => closeUnauthModal(), 2500);
  };
  return (
    <>
      <Modal isOpen={loadingModalIsOpen}>Validando datos...</Modal>
      <Modal isOpen={successModalIsOpen} isSuccess={true}>
        Ingreso exitoso, redirigiendo a inicio...
      </Modal>
      <Modal isOpen={errorModalIsOpen} isError={true}>
        !Tarea fallida!
      </Modal>
      <Modal isOpen={formatErrorModalIsOpen} isError={true}>
        Verifique los datos ingresados.
      </Modal>
      <Modal isOpen={unauthModalIsOpen} isError={true}>
        Usuario no registrado.
      </Modal>
      <Head>
        <title>Log in</title>
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
                required
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
                required
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
      </div>
    </>
  );
}
