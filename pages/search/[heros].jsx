import PageLayout from "../../components/PageLayout";
import { HerosWraper } from "../../components/HerosWraper";
import { Herocard } from "../../components/Herocard";
import { requestApi } from "../../Services/requestApi";
import { getFavoriteStatus } from "../../lib/favoriteRequest";

export default function Heros({ characters, charge, error }) {
  console.log(error);
  return (
    <PageLayout title="Heros" desc="Page to shoe heros consult results">
      <HerosWraper>
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
          ))}
      </HerosWraper>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ params, req }) => {
  try {
    const q = params.heros.replace("%20", " ");
    
    const cookie = req.headers.cookie;
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
        characters: dataPromise,
        error: false,
        charge: true
      },
    };
  } catch (error) {
    return {
      props: {
        characters: null,
        charge: false,
        error: error.toString()
      },
    };
  }
};
