import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Search } from "../../components/Search";
import { HerosWraper } from "../../components/HerosWraper";
import { Herocard } from "../../components/Herocard";
import { useRouter } from "next/router";
import {requestApi} from '../../Services/requestApi'
import {getFavoriteStatus} from '../../lib/favoriteRequest'
import {connectDB} from '../../lib/dbConnect'
import styles from "../../styles/Search.module.css";

export default function SearchPage({ characters, error, charge }) {
  console.log(error);
  const router = useRouter();
  const [queryF, setQueryF] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('buscando');
    const abc = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
    const auxquery = abc[Math.floor(Math.random() * (25 - 0 + 1)) + 0]
    router.push(`/search/${queryF !== '' ? queryF : auxquery}`);
  };
  return (
    <PageLayout
      title="Search"
      desc="use this page to search for your character"
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Buscar</h1>
        <span className={`material-icons ${styles.icon}`}>search</span>
      </header>
      <form className={styles.btn_area} onSubmit={(e)=>handleSearch(e)}>
        <input
          className={styles.input}
          type="text"
          name="query"
          placeholder="Buscar personaje"
          value={queryF}
          onChange={(e)=>setQueryF(e.target.value)}
        />
        <input type="submit" value="Buscar" className={`boton ${styles.btn}`}/>
      </form>
      <HerosWraper>
        {!charge ? (
          <div>Loading...</div>
        ) : (
          characters.map((char) => (
            <Herocard
              key={char.id}
              id={char.id}
              name={char.name}
              img={char.img}
              area="400"
              favStatus={char.isFavorite}
            />
          ))
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
        charge: true,
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
