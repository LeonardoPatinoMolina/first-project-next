import { Herocard } from "../components/Herocard";
import { HerosWraper } from "../components/HerosWraper";
import PageLayout from "../components/PageLayout";
import { requestApi } from "../Services/requestApi";
import { getFavoriteStatus } from "../lib/favoriteRequest";
import {connectDB} from '../lib/dbConnect'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SearchBanner } from "../components/SearchBanner";

export default function Home({ data, success }) {
  const router = useRouter();
  return (
    <PageLayout title="Home" desc="Home page to show random character's result">
      <SearchBanner />
      {/* <div className='padre'>
      <div className="hijo">lorem1 lorem</div>
      <div className="hijo">lorem2</div>
      <div className="hijo">lorem3</div>
      <div className="hijo">lorem4</div>
      <div className="hijo">lorem5</div>
      <div className="hijo">lorem6</div>
      <div className="hijo">lorem7</div>
      <div className="hijo">lorem8</div>
      </div> */}
      <HerosWraper>
        {success &&
          data.map((character) => (
            <Herocard
              key={character.id}
              id={character.id}
              name={character.name}
              img={character.img}
              area="400"
              favStatus={character.isFavorite}
            />
          )
        )}
      </HerosWraper>
    </PageLayout>
  );
} //end of component

export const getServerSideProps = async (ctx) => {
  const abc = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
  const q = abc[Math.floor(Math.random() * (25 - 0 + 1)) + 0]; //algoritmo de aleatoriedad entre 0 y 25
  try {
    const cookie = ctx.req.headers.cookie;
    const { db } = await connectDB()
    const response = await requestApi(q);
    const data =response.map(async (character) => {
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
        data: dataPromise,
        success: true,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: null,
        success: false,
      },
    };
  }
};
