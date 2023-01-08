"use strict";
import React, { useState, useEffect, useRef } from "react";
import PageLayout from "../../components/PageLayout";
import { getCustomHeros } from "../../lib/customHerosRequest";
import { useRouter } from "next/router";
import { connectDB } from "../../lib/dbConnect";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useModal } from "../../Hooks/useModal";
import { Modal } from "../../components/Modal";
import styles from "../../styles/Character.module.css";

export default function MyHeroPage({ hero }) {
  const router = useRouter();
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
    autoClose: false,
  });
  const goBack = () => router.back();
  useEffect(() => {
    const exp1 = /width="300"/g;
    const exp2 = /height="300"/g;
    const exp3 = /\(\-\|\-\)/g;
    const imgR1 = hero.img.replace(exp1, 'width="100%"');
    const imgR2 = imgR1.replace(exp2, 'height="100%"  (-|-)');
    const imgR3 = imgR2.replace(exp3, 'viewBox="0 0 300 300"');

    document.getElementById("img_wraper").innerHTML = imgR3;
  }, [hero.img]);

  const deleteOne = async () => {
    try {
      openRemoveModal();
      const res = await fetch("/api/delete/myhero", {
        method: "POST",
        body: JSON.stringify({
          id: hero.id,
          name: hero.name,
        }),
      });
      const dataConfirm = await res.json();
      if (dataConfirm.success) {
        closeRemoveModal();
        openSuccessModal();
        router.push("/myheros");
      } else {
        console.log("fallo delete myhero");
        errorHandle();
      }
      console.log("delete");
    } catch (err) {
      errorHandle();
    }
  };
  const errorHandle = () => {
    console.log("error manejado");
    closeRemoveModal();
    openErrorModal();
  };

  return (
    <>
      <Modal loot={removeModalLoot}>Removiendo héroe...</Modal>
      <Modal loot={successModalLoot}>Removido correctamente.</Modal>
      <Modal loot={errorModalLoot}>!Tarea fallida!</Modal>
      <PageLayout title="My hero" desc="page whith details about your hero">
        <section className={styles.content}>
          <div id="img_wraper" className={styles.image_svg}></div>
          <h1 className={styles.title}>{hero.name}</h1>
          <p className={styles.desc}>
            {hero.history} -
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iusto
            sequi obcaecati repudiandae quisquam illo aperiam. Tenetur nemo,
          </p>
          <div className={styles.btn_list}>
            <button
              onClick={() => goBack()}
              className={`boton ${styles.back_btn}`}
            >
              <IoMdArrowRoundBack size={25} />
              Volver
            </button>
            <button className={`boton ${styles.noFav_btn}`} onClick={deleteOne}>
              Borrar
              <RiDeleteBin2Fill size={25} />
            </button>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  try {
    const cookie = req.headers.cookie;
    const { db } = await connectDB();
    const heros = await getCustomHeros(cookie);
    if (heros) {
      const heroC = heros.filter((h) => h.id == params.id);
      if (heroC.length === 0) {
        return {
          redirect: {
            permanent: true,
            destination: "/",
          },
        };
      }
      return {
        props: {
          hero: heroC[0],
          error: false,
        },
      };
    }
    return {
      props: { error: true, info: "no hay coincidencia" },
    };
  } catch (err) {
    console.log("prop my hero err", err);
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }
};
