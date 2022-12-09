import React, { useState } from "react";
import { useRouter } from "next/router";
import { Logo } from "../components/Logo";
import styles from "../styles/Form.module.css";
import PageLayout from "../components/PageLayout";
import Link from "next/link";
import useSWR from "swr";

export default function Profile() {
  const router = useRouter();
  const fetcher = (url) =>
    fetch(url, { method: "POST" }).then((res) => res.json());
  const { data, error, isValidating } = useSWR("api/auth/profile", fetcher);

  const logout = async () => {
    const response = await fetch("api/auth/logout");
    const data = await response.json();
    console.log("logout", data);
    router.push("/login");
  };
  return (
    <PageLayout title='Profile' desc="Profile page">
      <section>
        <div className={styles.form}>
          <ul className={styles.list}>
            <li className={styles.item_list}>
              <div className={styles.title}>
                <Logo size={120} color="#ddd" />
              </div>
            </li>
            <li className={styles.item_list}>
              <h1 className={styles.title}>Mi cuenta</h1>
            </li>
            <li className={styles.item_list}>
              <h4>
                Nombre:{" "}
                <span className={styles.dato}>
                  {!isValidating ? `${data.user.username}` : "loading..."}
                </span>
              </h4>
            </li>
            <li className={styles.item_list}>
              <h4>
                Favoritos:{" "}
                <span className={styles.dato}>
                  {!isValidating ? `${data.user.favorites}` : "loading..."}
                </span>
              </h4>
            </li>
            <li className={styles.item_list}>
              <h4>
                Mis héroes:{" "}
                <span className={styles.dato}>
                  {!isValidating ? `${data.user.custom_heros}` : "loading..."}
                </span>
              </h4>
            </li>
            <li className={styles.item_list}>
              <button className="boton" onClick={logout}>
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  // const { data } = await  // your fetch function here

  return {
    props: {
      epa: "",
    },
  };
};
