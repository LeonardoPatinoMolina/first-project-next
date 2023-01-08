import { SlideBanner } from "../components/SlideBanner";
import PageLayout from "../components/PageLayout";
import { requestApi } from "../Services/requestApi";
import { getFavoriteStatus } from "../lib/favoriteRequest";
import { connectDB } from "../lib/dbConnect";
import { WrapperPanels } from "../components/WrapperPanels";
import { Panel } from "../components/Panel";
import { Pagination } from "../components/Pagination";
import { usePagination } from "../Hooks/usePagination";

export default function Home({ data, success }) {
  const { toPage, loot } = usePagination(success && data);
  return (
    <PageLayout title="Home" desc="Home page to show random character's result">
      <SlideBanner />
      <Pagination loot={loot} toPage={toPage} />
      <WrapperPanels>
        {success &&
          loot.results.map((hero) => (
            <Panel
              key={hero.id}
              id={hero.id}
              img={hero.img}
              name={hero.name}
              favStatus={hero.isFavorite}
              area={400}
            />
          ))}
      </WrapperPanels>
      <Pagination loot={loot} toPage={toPage} />
    </PageLayout>
  );
} //end of component

export const getServerSideProps = async (ctx) => {
  const abc = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
  const q = abc[Math.floor(Math.random() * (25 - 0 + 1)) + 0]; //algoritmo de aleatoriedad entre 0 y 25
  try {
    const cookie = ctx.req.headers.cookie;
    await connectDB();
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
        data: [],
        success: false,
      },
    };
  }
};
