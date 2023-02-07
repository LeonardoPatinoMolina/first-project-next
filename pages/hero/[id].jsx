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
import Image from "next/image";

export default function HeroPage({ hero }) {
  const [favChoise, setFavChoise] = useState(hero.isFavorite);
  const [addModalLoot, openAddModal, closeAddModal] = useModal({
    type: "def",
    openStatus: false,
    autoClose: false,
  });
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
  const router = useRouter();
  const goBack = () => router.back();
  useEffect(() => {
    setFavChoise(hero.isFavorite);
  }, [router.query.id, hero.isFavorite]);

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
  const errorHandle = () => {
    console.log("error manejado");
    closeRemoveModal();
    closeAddModal();
    openErrorModal();
  };
  return (
    <>
      <Modal loot={addModalLoot}>Añadiendo personaje a favoritos...</Modal>
      <Modal loot={removeModalLoot}>Removiendo personaje de favoritos...</Modal>
      <Modal loot={errorModalLoot}>!Tarea fallida!</Modal>
      <PageLayout title={hero.name}>
        <section className={styles.content}>
          
          <div className={styles.img}>
            <Image
              style={{ objectFit: "contain" }}
              src={hero.img}
              fill={true}
              alt="persojaje"
            />
          </div>

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
              <IoMdArrowRoundBack className={styles.item} size={25} />
              Volver
            </button>
            <button
              className={`boton ${styles.noFav_btn} ${
                !favChoise && styles.noneD
              }`}
              onClick={() => deleteOne()}
            >
              <BsStar className={styles.item} size={25} />
              Remover de favoritos
            </button>
            <button
              className={`boton ${styles.fav_btn} ${favChoise && styles.noneD}`}
              onClick={() => addOne()}
            >
              <BsFillStarFill className={styles.item} size={25} />
              Añadir a favoritos
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
