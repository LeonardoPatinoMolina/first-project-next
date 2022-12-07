import { Herocard } from "../components/Herocard";
import { HerosWraper } from "../components/HerosWraper";
import PageLayout from "../components/PageLayout";
import { requestApi } from "../Services/requestApi";

export default function Home({ data }) {
  return (
    <PageLayout title="Home" desc="Home page to show random character's result">
      <HerosWraper>
        {data.map((character) => (
          <Herocard
            key={character.id}
            id={character.id}
            name={character.name}
            img={character.img}
            area='400'
          />
        ))}
      </HerosWraper>
    </PageLayout>
  );
} //end of component

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const abc = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
  const q = abc[Math.floor(Math.random() * (25 - 0 + 1)) + 0]; //algoritmo de aleatoriedad entre 0 y 25
  const response = await requestApi(q); // your fetch function here
  const data = response.map((character) => ({
    id: character.id,
    img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    name: character.name,
  }));
  return {
    props: {
      data,
    },
  };
};
