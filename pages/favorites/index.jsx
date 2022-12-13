import React, {useEffect} from "react";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import { connectDB } from "../../lib/dbConnect";
import User from "../../models/user";
import PageLayout from "../../components/PageLayout";
import { Herocard } from "../../components/Herocard";
import { HerosWraper } from "../../components/HerosWraper";
import styles from '../../styles/Favorites.module.css'

export default function Favorites({ favorites, error, success }) {
  const router = useRouter();
  const cleanAll = async ()=>{
    try {
      const res = await fetch('api/delete/allfavorites');
      const response = await res.json();
      console.log(response);
      router.replace(router.asPath)
    } catch (error) {
      console.log('fetch',error);      
    }
  };
  return (
    <PageLayout title="Favorites" desc="favorites results">
      <header className={styles.header}>
        <h1 className={styles.title}>Favoritos</h1>
        <span className={`material-icons ${styles.icon}`}>grade</span>
      </header>
      <HerosWraper>
        {success &&
          favorites.map((fav) => (
            <Herocard
              key={fav.id}
              id={fav._id}
              name={fav.name}
              img={fav.img}
              area="400"
              favStatus={true}
            />
          ))}
      </HerosWraper>
      <div className={`${styles.btn_area}`}>
        <button 
          className={`boton ${styles.btn_clean}`}
          onClick={cleanAll}
        >QUITAR TODOS</button>
      </div>
    </PageLayout>
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
