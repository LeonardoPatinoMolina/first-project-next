import React, { useState, useEffect, useRef } from "react";
import PageLayout from "../../components/PageLayout";
import { HerosPanels } from "../../components/HerosPanels";
import { Panel } from "../../components/Panel";
import { Pagination } from "../../components/Pagination";
import { usePagination } from "../../Hooks/usePagination";
import { useRouter } from "next/router";
import {requestApi} from '../../Services/requestApi'
import {getFavoriteStatus} from '../../lib/favoriteRequest'
import {connectDB} from '../../lib/dbConnect'
import { FaSearch } from "react-icons/fa";
import {Search} from '../../components/Search'
import styles from "../../styles/Search.module.css";

export default function SearchPage({ characters, error, success }) {
  const router = useRouter();
  const { toPage, loot } = usePagination(success && characters);
  useEffect(() => {
    console.log('re');
    toPage(1)
  }, [router.query]);
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
      <Pagination loot={loot} toPage={toPage} />
      <HerosPanels>
        {success &&
          loot.results.map((hero) => (
            <Panel
              key={hero.id}
              id={hero.id}
              img={hero.img}
              name={hero.name}
              favStatus={false}
              area={400}
            />
          ))}
      </HerosPanels>
      <Pagination loot={loot} toPage={toPage} />
    </PageLayout>
  );
}

export const getServerSideProps = async ({ params, req }) => {
  try {
    const q = params.q.replace("%20", " ");
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
        success: dataPromise.length >= 1,
      },
    };
  } catch (error) {
    return {
      props: {
        characters: [],
        success: false,
        error: error.toString(),
      },
    };
  }
};
