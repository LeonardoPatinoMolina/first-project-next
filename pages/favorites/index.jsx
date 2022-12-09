import React from "react";
import PageLayout from "../../components/PageLayout";
import { connectDB } from "../../lib/dbConnect";
import User from "../../models/user";
import { Herocard } from "../../components/Herocard";
import { decode } from "jsonwebtoken";
import { HerosWraper } from "../../components/HerosWraper";

export default function Favorites({ favorites, error, success }) {
  return (
    <PageLayout title="Favorites" desc="favorites results">
      <HerosWraper>
        {success &&
          favorites.map((fav) => (
            <Herocard
              key={fav.id}
              id={fav._id}
              name={fav.name}
              img={fav.img}
              area="400"
              favStatus={true}
            />
          ))}
      </HerosWraper>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ req }) => {
  try {
    await connectDB();
    const cookie = req.headers.cookie;
    const cookieValue = cookie.replace(/^tokenUser=/, "");
    const tokenDecode = decode(cookieValue, { complete: true });
    const userC = tokenDecode.payload.user;
    const userR = await User.findOne({ username: `${userC}` });

    if (userR.favorites.length < 1) {
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
        favorites: userR.favorites,
      },
    };
  } catch (error) {
    console.log("**", error);
    return { props: { success: false, error: "ocurrió un error" } };
  }
};
