import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCustomHeros } from "../../lib/customHerosRequest";
import PageLayout from "../../components/PageLayout";
import { HerosPanels } from "../../components/HerosPanels";
import { PanelMyHero } from "../../components/PanelMyHero";
import { useModal } from "../../Hooks/useModal";
import {Modal } from '../../components/Modal'
import { Pagination } from "../../components/Pagination";
import { usePagination } from "../../Hooks/usePagination";
import { connectDB } from "../../lib/dbConnect";
import { FaPaintBrush } from "react-icons/fa";
import styles from "../../styles/MyHeros.module.css";


export default function Myheros({ heros, success, info }) {
  const router = useRouter();
  const [removeModalLoot, openRemoveModal, closeRemoveModal] = useModal({
    type: "def",
    openStatus: false,
    autoClose: false
  });
  const [errorModalLoot, openErrorModal] = useModal({
    type: "error",
    openStatus: false,
    autoClose: true
  });
  const [successModalLoot, openSuccessModal] = useModal({
    type: "success",
    openStatus: false,
    autoClose: true
  });
  const { toPage, loot, reset } = usePagination(success && heros);
  
  const cleanAll = async ()=>{
    try {
      openRemoveModal();
      const res = await fetch('api/delete/allmyheros');
      const response = await res.json();
      console.log(response);
      reset();
      closeRemoveModal();
      openSuccessModal();
      router.replace(router.asPath)
    } catch (error) {
      openErrorModal();
      console.log('fetch',error);
    }
  };
  const goNew = () => router.push("/myheros/new");
  return (
    <>
      <Modal loot={removeModalLoot}>Removiendo todos los héroes...</Modal>
      <Modal loot={successModalLoot}>Removidos correctamente.</Modal>
      <Modal loot={errorModalLoot}>!Tarea fallida!</Modal>
    <PageLayout title="My heros">
      <header className={`${styles.header}`}>
        <h1 className={styles.title}> Mis Héroes</h1>
        <FaPaintBrush size={60} className={styles.icon} />
        <button className={`boton ${styles.btn_add}`} onClick={goNew}>
          <span className={styles.desc_icon}>CREAR NUEVO HÉROE</span>
        <FaPaintBrush size={25} className={styles.icon_add} />
        </button>
      </header>
      <Pagination loot={loot} toPage={toPage} />
      <HerosPanels>
        {success&&
          loot.results.map((hero) => (
            <PanelMyHero
              key={hero.id}
              id={hero.id}
              img={hero.img}
              name={hero.name}
              area={400}
            />
          ))}
      </HerosPanels>
      <Pagination loot={loot} toPage={toPage} />
      <div className={`${styles.btn_area}`}>
        <button className={`boton ${styles.btn_clean}`} onClick={cleanAll}>
          REMOVER TODOS
        </button>
      </div>
    </PageLayout>
    </>
  );
}

export const getServerSideProps = async ({req}) => {
  try {
    const cookie = req.headers.cookie;
    const { db } = await connectDB();
    const heros = await getCustomHeros(cookie);
    if (heros) {
      return {
        props: {
          heros,
          success: true,
        },
      };
    }
    return {
      props: { success: false, info: 'no hay coincidencia' },
    };
  } catch (err) {
    console.log("prop err", err);
    return {
      props: { success: false, info: 'algo paso mal' },
    };
  }
};
