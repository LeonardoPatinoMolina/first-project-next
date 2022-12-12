"use strict";
import React, { useState, useEffect, useRef } from "react";
import PageLayout from "../../components/PageLayout";
import { getCustomHeros } from "../../lib/customHerosRequest";
import { useRouter } from "next/router";
import styles from "../../styles/Character.module.css";
import { connectDB } from "../../lib/dbConnect";

export default function MyHeroPage({ hero, cookie }) {
  const router = useRouter();
  const goBack = () => router.back();
  useEffect(() => {
    const exp1 = /width="300"/g;
    const exp2 = /height="300"/g;
    const exp3 = /\(\-\|\-\)/g;
    const imgR1 = hero.img.replace(exp1, 'width="100%"');
    const imgR2 = imgR1.replace(exp2, 'height="100%"  (-|-)');
    const imgR3 = imgR2.replace(exp3, 'viewBox="0 0 300 300"');

    document.getElementById("img_wraper").innerHTML = imgR3;
  }, []);

  const deleteOne = async () => {
    const res = await fetch("/api/delete/myhero", {
      method: "POST",
      body: JSON.stringify({
        id: hero.id,
        name: hero.name,
      }),
    });
    const dataConfirm = await res.json();
    if (dataConfirm.success) {
      alert("exito delete myhero");
      router.push('/myheros');
    }
    else console.log("fallo delete myhero");
    console.log("delete");
  };

  return (
    <PageLayout title="My hero" desc="page whith details about your hero">
      <section className={styles.content}>
        {/* <img className={styles.img} src={hero.img} alt="persojaje" /> */}
        <div id="img_wraper" className={styles.image_svg}></div>
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
            <span className={`material-icons`}>undo</span>
            Volver
          </button>
          <button className={`boton ${styles.noFav_btn}`} onClick={deleteOne}>
            Borrar
            <span className={`material-icons`}>delete</span>
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
export const getServerSideProps = async ({ req, params }) => {
  try {
    const cookie = req.headers.cookie;
    const { db } = await connectDB();
    const heros = await getCustomHeros(cookie);
    if (heros) {
      const heroC = heros.filter((h) => h.id == params.id);
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
    console.log("prop err", err);
    return {
      props: { error: true, info: "algo paso mal" },
    };
  }
};
