import PageLayout from "../../components/PageLayout";
import { HerosWraper } from "../../components/HerosWraper";
import { Herocard } from "../../components/Herocard";
import { requestApi } from "../../Services/requestApi";

export default function Heros({ characters, charge, error }) {
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
            />
          ))}
      </HerosWraper>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ params }) => {
  try {
    const q = params.heros.replace("-", " ");
    const res = await requestApi(q);
    const data = res.map((char) => {
      const dato = {
        id: char.id,
        name: char.name,
        img: char.thumbnail.path + "." + char.thumbnail.extension,
      };
      return dato;
    });

    return {
      props: {
        characters: data,
        charge: true,
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
