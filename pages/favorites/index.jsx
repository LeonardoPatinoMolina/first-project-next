import React, { useRef } from "react";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import { connectDB } from "../../lib/dbConnect";
import User from "../../models/user";
import PageLayout from "../../components/PageLayout";
import { WrapperPanels } from "../../components/WrapperPanels";
import { BsFillStarFill } from "react-icons/bs";
import { useModal } from "../../Hooks/useModal";
import { Modal } from "../../components/Modal";
import { Panel } from "../../components/Panel";
import { Pagination } from "../../components/Pagination";
import { usePagination } from "../../Hooks/usePagination";
import styles from "../../styles/Favorites.module.css";

export default function Favorites({ favorites, error, success }) {
  const boton_clean_all = useRef();
  const { toPage, loot, reset } = usePagination(success && favorites);
  const [removeModalLoot, openRemoveModal, closeRemoveModal] = useModal({
    type: "def",
    openStatus: false,
    autoClose: false,
  });
  const [errorModalLoot, openErrorModal] = useModal({
    type: "error",
    openStatus: false,
    autoClose: true,
  });
  const [successModalLoot, openSuccessModal] = useModal({
    type: "success",
    openStatus: false,
    autoClose: true,
  });
  const router = useRouter();
  const cleanAll = async () => {
    if(boton_clean_all.current.classList.contains(styles.btn_disabled)) return;
    try {
      openRemoveModal();
      const res = await fetch("api/delete/allfavorites");
      const response = await res.json();
      console.log(response);
      reset();
      closeRemoveModal();
      openSuccessModal();
      router.replace(router.asPath);
    } catch (error) {
      openErrorModal();
      console.log("fetch", error);
    }
  };
  return (
    <>
      <Modal loot={removeModalLoot}>Removiendo todos los favoritos...</Modal>
      <Modal loot={successModalLoot}>Removidos correctamente.</Modal>
      <Modal loot={errorModalLoot}>!Tarea fallida!</Modal>
      <PageLayout title="Favorites" desc="favorites results">
        <header className={styles.header}>
          <h1 className={styles.title}>Favoritos</h1>
          <BsFillStarFill className={styles.icon} size={60} />
        </header>
        <Pagination loot={loot} toPage={toPage} />

        <WrapperPanels>
          {success &&
            loot.results.map((hero) => (
              <Panel
                key={hero.id}
                id={hero.id}
                img={hero.img}
                name={hero.name}
                favStatus={true}
                area={400}
              />
            ))}
        </WrapperPanels>
        <Pagination loot={loot} toPage={toPage} />
        <div className={`${styles.btn_area}`}>
          <button className={`boton ${styles.btn_clean} ${!success && styles.btn_disabled}`} ref={boton_clean_all} onClick={cleanAll}>
            REMOVER TODOS
          </button>
        </div>
      </PageLayout>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  try {
    await connectDB();
    const cookie = req.headers.cookie;
    const cookieValue = cookie.replace(/^tokenUser=/, "");
    const tokenDecode = decode(cookieValue, { complete: true });
    const userC = tokenDecode.payload.user;
    const userR = await User.findOne({ username: `${userC}` });

    if (userR.favorites.length < 1) {
      return {
        props: {
          success: false,
          error: "no hay resultados",
        },
      };
    }
    return {
      props: {
        success: true,
        error: false,
        favorites: userR.favorites,
      },
    };
  } catch (error) {
    console.log("**", error);
    return { props: { success: false, error: "ocurrió un error" } };
  }
};
