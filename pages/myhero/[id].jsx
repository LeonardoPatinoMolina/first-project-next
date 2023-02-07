"use strict";
import React, { useEffect } from "react";
import mongoose from 'mongoose'
import Image from 'next/image'
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

  const deleteOne = async () => {
    try {
      openRemoveModal();
      const res = await fetch("/api/delete/myhero", {
        method: "POST",
        body: JSON.stringify({
          id: hero._id,
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
            { hero.history }
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
              <RiDeleteBin2Fill size={25} />
              Borrar
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
    await connectDB();
    const heros = await getCustomHeros(cookie);
    if (heros) {
      const heroC = heros.filter((h) => h._id === params.id);
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
