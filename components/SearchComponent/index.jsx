"use client";
import React, { useState, useMemo, useRef } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import {useOutsideClick} from '../../Hooks/useOutsideClick'
import Link from "next/link";
import styles from "./style/Search.module.css";
import Image from "next/image";

export function SearchComponent(props) {
  const [watchClickPanel] = useOutsideClick(handleOutsideClick)
  const [autocomopleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });
  const autoComplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: props.placeholder,
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "heros",
            getItems: async ({ query }) => {
              // const res = await fetch(`/api/search/?q=${query}`);
              const res = await fetch(`/api/search/${query}`);
              const fres = await res.json();
              const data = fres.data.map((character) => ({
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
  );//end use memo 

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autoComplete.getFormProps({
    inputElement: inputRef.current,
  });

  const inputProps = autoComplete.getInputProps({
    inputElement: inputRef.current,
  });
  function handleOutsideClick(){
    setAutocompleteState({...autocomopleteState, isOpen: false});
  };

  return (
    <>
      <div className={styles.wraper}>
        <form {...formProps} className={styles.form}>
          <input className={styles.input} {...inputProps} ref={props.refeGet} />
          {autocomopleteState.isOpen && (
            <div ref={panelRef} {...autoComplete.getPanelProps()} className={styles.panel_wraper}>
              {autocomopleteState.collections.map((collection, index) => {
                const { items } = collection;
                return (
                  <section
                    key={`section-${index}`}
                    className={styles.section_panel}
                    ref={watchClickPanel}
                  >
                    {items.length > 0 && (
                      <ul
                        {...autoComplete.getListProps()}
                        className={styles.list_panel}
                      >
                        {items.map((item) => (
                          <li key={item.id} className={styles.item_panel}>
                            <Link
                              className={styles.title}
                              href={`/hero/${item.name.replace(" ", "%20")}`}
                            >
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
    </>
  );
}
