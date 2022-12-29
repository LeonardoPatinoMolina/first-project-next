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
  const [errorModalLoot, openErrorModal] = useModal({
    type: "error",
    openStatus: false,
    autoClose: true,
  });
  const [formatErrorModalLoot, openFormatErrorModal] = useModal({
    type: "warning",
    openStatus: false,
    autoClose: true,
  });
  const [unauthModalLoot, openUnauthModal] = useModal({
    type: "error",
    openStatus: false,
    autoClose: true,
  });

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
    if (value.length > 1) setFormatError({ ...formatError, [name]: validate });
    else setFormatError({ ...formatError, [name]: true });
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
    openErrorModal();
  };
  const formatErrorHandle = () => {
    closeLoadingModal();
    openFormatErrorModal();
  };
  const errorHandle2 = () => {
    closeLoadingModal();
    openUnauthModal();
  };
  return (
    <>
      <Modal loot={loadingModalLoot}>Validando datos...</Modal>
      <Modal loot={successModalLoot}>
        Ingreso exitoso, redirigiendo a inicio...
      </Modal>
      <Modal loot={errorModalLoot}>!Tarea fallida!</Modal>
      <Modal loot={formatErrorModalLoot}>Verifique los datos ingresados.</Modal>
      <Modal loot={unauthModalLoot}>Usuario o contraseña errados.</Modal>
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
                type={`text`}
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
                type={viewPass ? "text" : "password"}
                name="pass"
                id="pass"
                value={formData.pass}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
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
