import React from "react";
import PageLayout from "../../components/PageLayout";
import { connectDB } from "../../lib/dbConnect";
import Favorite from "../../models/favorite";

export default function Favorites({ favorites, error, success }) {
  return (
    <PageLayout title="Favorites" desc="favorites results">
      {success ? (
        favorites.map((fav) => <p key={fav._id}>{fav.name}</p>)
      ) : (
        <p key={favorites._id}>
          {error} -- Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Aperiam ipsam unde odit magni officia assumenda possimus molestiae
          voluptate provident quos natus expedita repellendus repellat inventore
          rerum, doloribus, nesciunt nulla rem!
        </p>
      )}
    </PageLayout>
  );
}

export const getServerSideProps = async () => {
  try {
    await connectDB();
    //"6387f1cfb9d0a470d4a3b372"
    // try {
    //   const favN = new Favorite({
    //     name: "Rosado palido",
    //     img: "http://i.annihil.us/u/prod/marvel/i/mg/9/80/4de932f1a298a.jpg",
    //   });
    //   favN.save();
    //   console.log("exito?");
    // } catch (err) {
    //   console.log(err);
    // }
    const favR = await Favorite.find();
    const refav = favR.map(fav=>{
      return {
        _id: fav._id.toString(),
        name: fav.name,
        img: fav.img
      }
    })
    if (refav.length < 1) {
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
        favorites: refav,
      },
    };
  } catch (error) {
    console.log('**',error);
    return { props: { success: false, error: "ocurrió un error" } };
  }
};
