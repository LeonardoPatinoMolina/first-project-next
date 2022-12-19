import React, { useState, useEffect, useRef } from "react";
import PageLayout from "../../components/PageLayout";
import { HerosWraper } from "../../components/HerosWraper";
import { Herocard } from "../../components/Herocard";
import { useRouter } from "next/router";
import {requestApi} from '../../Services/requestApi'
import {getFavoriteStatus} from '../../lib/favoriteRequest'
import {connectDB} from '../../lib/dbConnect'
import { FaSearch } from "react-icons/fa";
import {Search} from '../../components/Search'
import styles from "../../styles/Search.module.css";

export default function SearchPage({ characters, error, charge }) {
  const router = useRouter();
  const inputSearchValue = useRef();
  const handleSearch = () => {
    const queryF = inputSearchValue.current.value;
    console.log('buscando', queryF);
    const abc = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
    const auxquery = abc[Math.floor(Math.random() * (25 - 0 + 1)) + 0]
    inputSearchValue.current.value = '';
    router.push(`/search/${queryF !== '' ? queryF : auxquery}`);
  };
  return (
    <PageLayout
      title="Search"
      desc="use this page to search for your character"
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Buscar</h1>
        <FaSearch className={styles.icon} size={50} />
      </header>
      <div className={styles.btn_area}>
        <Search placeholder='Buscar...' refeGet={inputSearchValue} />
        <button className={`boton ${styles.btn}`} onClick={()=>handleSearch()}>Buscar</button>
      </div>
      <HerosWraper >
        {charge &&
          characters.map((char) => (
            <Herocard
              key={char.id}
              id={char.id}
              name={char.name}
              img={char.img}
              area="400"
              favStatus={char.isFavorite}
            />
          )
        )}
      </HerosWraper>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ params, req }) => {
  try {
    const q = params.heros.replace("%20", " ");
    await connectDB();
    const cookie = req.headers.cookie;
    const response = await requestApi(q);
    const data = response.map(async (character) => {
      const resF = await getFavoriteStatus(cookie, {
        id: character.id,
        img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        name: character.name,
      });
      return resF;
    });
    const dataPromise = await Promise.all(data);
    return {
      props: {
        characters: dataPromise,
        error: false,
        charge: dataPromise.length >= 1,
      },
    };
  } catch (error) {
    return {
      props: {
        characters: null,
        charge: false,
        error: error.toString(),
      },
    };
  }
};
