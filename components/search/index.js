"use client";
import React, { useState, useMemo, useRef } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import Link from "next/link";
import styles from "./style/Search.module.css";
import Image from "next/image";

export function Search(props) {
  const [autocomopleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });
  const autoComplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Busca un personaje",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "heros",
            getItems: async ({ query }) => {
              // const res = await fetch(`/api/search/?q=${query}`);
              const res = await fetch(
                `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=5ab42191e80dab763b2eea835666ce40&hash=b91a1843f8d721b87e6d361cec1798a5`
              );
              const fres = await res.json();
              const data = fres.data.results.map((character) => ({
                id: character.id,
                img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                name: character.name,
              }));
              return data;
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autoComplete.getFormProps({
    inputElement: inputRef.current,
  });

  const inputProps = autoComplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <div className={styles.wraper}>
      <form {...formProps}>
        <input className={styles.input} {...inputProps} />
        {autocomopleteState.isOpen && (
          <div ref={panelRef} {...autoComplete.getPanelProps()}>
            {autocomopleteState.collections.map((collection, index) => {
              const { items } = collection;
              return (
                <section
                  key={`section-${index}`}
                  className={styles.section_panel}
                >
                  {items.length > 0 && (
                    <ul
                      {...autoComplete.getListProps()}
                      className={styles.list_panel}
                    >
                      {items.map((item) => (
                        <li key={item.id} className={styles.item_panel}>
                          <Link className={styles.title} href={`#`}>
                            <Image
                              className={styles.img_panel}
                              src={item.img}
                              width={30}
                              height={30}
                              alt={item.name}
                            />
                            {item.name}
                          </Link>
                          <div className={styles.redirect_icon_panel}>↗</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
}
