import { Herocard } from "../components/Herocard";
import { HerosWraper } from "../components/HerosWraper";
import PageLayout from "../components/PageLayout";
import { requestApi } from "../Services/requestApi";
import { getFavoriteStatus } from "../lib/favoriteRequest";
import { connectDB } from "../lib/dbConnect";
import { SlideBanner } from "../components/SlideBanner";

export default function Home({ data, success }) {
  return (
    <PageLayout title="Home" desc="Home page to show random character's result">
      <SlideBanner />
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
          ))}
      </HerosWraper>
    </PageLayout>
  );
} //end of component

export const getServerSideProps = async (ctx) => {
  const abc = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
  const q = abc[Math.floor(Math.random() * (25 - 0 + 1)) + 0]; //algoritmo de aleatoriedad entre 0 y 25
  try {
    const cookie = ctx.req.headers.cookie;
    const { db } = await connectDB();
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
