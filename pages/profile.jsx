"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Logo } from "../components/Logo";
import PageLayout from "../components/PageLayout";
import useSWR from "swr";
import { BiLogOut } from "react-icons/bi";
import { MdPersonOff } from "react-icons/md";
import { Modal } from "../components/Modal";
import { useModal } from "../Hooks/useModal";
import styles from "../styles/Form.module.css";

export default function Profile() {
  const router = useRouter();
  const [redirectModalLoot, openRedirectModal] = useModal({
    type: "def",
    openStatus: false,
  });
  const [deleteModalLoot, openDeleteModal, closeDeleteModal] = useModal({
    type: "def",
    openStatus: false,
  });
  const [errorModalLoot, openErrorModal] = useModal({
    type: "error",
    openStatus: false,
  });

  const fetcher = (url) =>
    fetch(url, { method: "POST" }).then((res) => res.json());
  const { data, error, isValidating } = useSWR("api/auth/profile", fetcher);

  const logout = async () => {
    try {
      const response = await fetch("api/auth/logout");
      const data = await response.json();
      openRedirectModal();
      router.push("/login");
    } catch (err) {
      errorHandle();
    }
  };
  const errorHandle = () => {
    console.log("error manejado");
    closeDeleteModal();
    openErrorModal();
  };

  const deleteAcount=async()=>{
    try {
      openDeleteModal();
      const response = await fetch('api/delete/useracount');
      const res = await response.json();
      if(!res.success) return errorHandle();
      logout();
    } catch (error) {
      errorHandle();      
    }
  }

  return (
    <>
      <Modal loot={redirectModalLoot}>Cerrando sesión...</Modal>
      <Modal loot={deleteModalLoot}>Eliminando cuenta...</Modal>
      <Modal loot={errorModalLoot}>¡Tarea fallida!</Modal>
      <PageLayout title="Profile" desc="Profile page">
        <section>
          <div className={styles.form}>
            <ul className={styles.list}>
              <li className={styles.item_list}>
                <div className={styles.title}>
                  <Logo size={120} color="#ddd" />
                </div>
              </li>
              <li className={styles.item_list}>
                <h1 className={styles.title}>Mi cuenta</h1>
              </li>
              <li className={styles.item_list}>
                <h4>
                  Nombre:{" "}
                  <span className={styles.dato}>
                    {!isValidating ? `${data.user.username}` : "loading..."}
                  </span>
                </h4>
              </li>
              <li className={styles.item_list}>
                <h4>
                  Favoritos:{" "}
                  <span className={styles.dato}>
                    {!isValidating ? `${data.user.favorites}` : "loading..."}
                  </span>
                </h4>
              </li>
              <li className={styles.item_list}>
                <h4>
                  Mis héroes:{" "}
                  <span className={styles.dato}>
                    {!isValidating ? `${data.user.custom_heros}` : "loading..."}
                  </span>
                </h4>
              </li>
              <li className={styles.item_list}>
                <button
                  className="boton"
                  onClick={logout}
                  title="cerrar sesión"
                >
                  Cerrar sesión
                  <BiLogOut size={25} />
                </button>
              </li>
              <li className={styles.item_list}>
                <button
                  className="boton"
                  onClick={deleteAcount}
                  title="eliminar cuenta"
                  >
                  Eliminar cuenta
                  <MdPersonOff size={25} />
                </button>
                  </li>
            </ul>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
