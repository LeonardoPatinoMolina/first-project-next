"use strict";
import React, { useState, useEffect, useRef } from "react";
import { requestApi } from "../../Services/requestApi";
import PageLayout from "../../components/PageLayout";
import { getFavoriteStatus } from "../../lib/favoriteRequest";
import { useRouter } from "next/router";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useModal } from "../../Hooks/useModal";
import { Modal } from "../../components/Modal";
import styles from "../../styles/Character.module.css";

export default function HeroPage({ hero, cookie }) {
  const [favChoise, setFavChoise] = useState(hero.isFavorite);
  const [addModalIsOpen, openAddModal, closeAddModal] = useModal(false);
  const [removeModalIsOpen, openRemoveModal, closeRemoveModal] = useModal(false);
  const [errorModalIsOpen, openErrorModal, closeErrorModal] = useModal(false);
  const router = useRouter();
  const goBack = () => router.back();
  useEffect(() => {
    setFavChoise(hero.isFavorite);
  }, [router.query.id]);

  const deleteOne = async () => {
    console.log("delete curse");
    openRemoveModal();
    try {
      const res = await fetch("/api/delete/favorite", {
        method: "POST",
        body: JSON.stringify({
          id: hero.id,
          name: hero.name,
          img: hero.img,
        }),
      });
      const dataConfirm = await res.json();
      if (!dataConfirm.success) {
        console.log("fallo delete fav");
        return errorHandle();
      }
      console.log("exito delete fav");
      setFavChoise(false);
      closeRemoveModal();
    } catch (err) {
      console.log("fallo el delete");
      errorHandle();
    }
  };
  const addOne = async () => {
    console.log("new curse");
    openAddModal();
    try {
      const res = await fetch("/api/new/favorite", {
        method: "POST",
        body: JSON.stringify({
          id: hero.id,
          name: hero.name,
          img: hero.img,
        }),
      });
      const dataConfirm = await res.json();
      if (!dataConfirm.success) {
        console.log("fallo add fav");
        return errorHandle();
      }
      closeAddModal();
      console.log("exito add fav");
      setFavChoise(true);
    } catch (err) {
      errorHandle();
      console.log("fallo el new fav");
    }
  };
  const errorHandle=()=>{
    console.log('error manejado')
    closeRemoveModal();
    closeAddModal();
    openErrorModal();
    if(typeof window) setTimeout(()=>closeErrorModal(), 3500);
  }
  return (
    <>
      <Modal isOpen={addModalIsOpen}>Añadiendo personaje a favoritos...</Modal>
      <Modal isOpen={removeModalIsOpen}>Removiendo personaje de favoritos...</Modal>
      <Modal isOpen={errorModalIsOpen} isError={true}>!Tarea fallida!</Modal>
      <PageLayout title={hero.name}>
        <section className={styles.content}>
          <img className={styles.img} src={hero.img} alt="persojaje" />
          <h1 className={styles.title}>{hero.name}</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iusto
            sequi obcaecati repudiandae quisquam illo aperiam. Tenetur nemo,
            beatae, voluptate atque fugiat voluptatibus porro quia incidunt qui,
            soluta velit ducimus!
          </p>
          <div className={styles.btn_list}>
            <button
              onClick={() => goBack()}
              className={`boton ${styles.back_btn}`}
            >
              <IoMdArrowRoundBack size={25} />
              Volver
            </button>
            <button
              className={`boton ${styles.noFav_btn} ${
                !favChoise && styles.noneD
              }`}
              onClick={() => deleteOne()}
            >
              Remover de favoritos
              <BsStar className={styles.item} size={25} />
            </button>
            <button
              className={`boton ${styles.fav_btn} ${favChoise && styles.noneD}`}
              onClick={() => addOne()}
            >
              Añadir a favoritos
              <BsFillStarFill className={styles.item} size={25} />
            </button>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
export const getServerSideProps = async ({ params, req }) => {
  const q = params.id.replace("%20", " ");
  const cookie = req.headers.cookie;
  try {
    const res = await requestApi(q);
    const resF = await getFavoriteStatus(cookie, {
      id: res[0].id,
      name: res[0].name,
      img: res[0].thumbnail.path + "." + res[0].thumbnail.extension,
    }); //devuelve true si el actyual elemento es favorito
    return {
      props: {
        hero: resF,
        cookie,
      },
    };
  } catch (err) {
    console.log("id hero**", err);
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }
};
