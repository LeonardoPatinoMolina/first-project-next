import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCustomHeros } from "../../lib/customHerosRequest";
import PageLayout from "../../components/PageLayout";
import { HerosWraper } from "../../components/HerosWraper";
import { MyHerocard } from "../../components/MyHerocard";
import styles from "../../styles/MyHeros.module.css";
import { connectDB } from "../../lib/dbConnect";

export default function Myheros({ heros, error, info }) {
  const router = useRouter();
  const [inCreate, setInCreate] = useState(false);
  const cleanAll = async ()=>{
    try {
      const res = await fetch('api/delete/allmyheros');
      const response = await res.json();
      console.log(response);
      router.replace(router.asPath)
    } catch (error) {
      console.log('fetch',error);      
    }
  };
  const goNew = () => router.push("/myheros/new");
  return (
    <PageLayout title="My heros">
      <header className={`${styles.header}`}>
        <h1 className={styles.title}> Mis Héroes</h1>
        <span className={`material-icons ${styles.icon} `}>edit</span>
        <button className={`boton ${styles.btn_add}`} onClick={goNew}>
          <span className={styles.desc_icon}>CREAR NUEVO HÉROE</span>
          <span
            className={`material-icons ${styles.icon_add} ${
              inCreate && styles.revert
            }`}
          >
            add
          </span>
        </button>
      </header>
      <HerosWraper>
        {!error &&
          heros.map((hero) => (
            <MyHerocard
              key={hero.id}
              id={hero.id}
              name={hero.name}
              img={hero.img}
              area="400"
            />
          ))}
      </HerosWraper>
      <div className={`${styles.btn_area}`}>
        <button className={`boton ${styles.btn_clean}`} onClick={cleanAll}>
          QUITAR TODOS
        </button>
      </div>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  try {
    const cookie = req.headers.cookie;
    const { db } = await connectDB();
    const heros = await getCustomHeros(cookie);
    if (heros) {
      return {
        props: {
          heros,
          error: false,
        },
      };
    }
    return {
      props: { error: true, info: 'no hay coincidencia' },
    };
  } catch (err) {
    console.log("prop err", err);
    return {
      props: { error: true, info: 'algo paso mal' },
    };
  }
};
