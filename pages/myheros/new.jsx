"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useDrawNewCanvas } from "../../Hooks/useDrawNewCanvas";
import PageLayout from "../../components/PageLayout";
import { FaPaintBrush } from "react-icons/fa";
import {Modal} from '../../components/Modal'
import { useModal } from "../../Hooks/useModal";
import styles from "../../Styles/CreateHero.module.css";

export default function New() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [addModalIsOpen, openAddModal, closeAddModal] = useModal(false);
  const [errorModalIsOpen, openErrorModal, closeErrorModal] = useModal(false);
  const { clearCanvas, convertToSvg } = useDrawNewCanvas();

  const handleSubmit = async (e) => {
    // añade heroe creando registro en db
    e.preventDefault();
    openAddModal();
    const img = convertToSvg();
    const myhero = {
      id: uuidv4(),
      img,
      name: name,
    };

    //add your code here...
    try{const res = await fetch("/api/new/customhero", {
      method: "POST",
      body: JSON.stringify(myhero),
    });
    const dataConfirm = await res.json();
    if (dataConfirm.success) {
      console.log("exito add custom");
      alert("añadido");
    } else {
      errorHandle();
    }}catch(err){
      errorHandle();
    }
    closeAddModal();
    clearCanvas();
    setName("");
  };
  const errorHandle=()=>{
    console.log('error manejado')
    closeAddModal();
    openErrorModal();
    if(typeof window) setTimeout(()=>closeErrorModal(), 3500);
  }
  return (
    <>
    <Modal isOpen={addModalIsOpen}>Añadiendo nuevo héroe</Modal>
    <Modal isOpen={errorModalIsOpen} isError={true}>!Tarea fallida!</Modal>
      <PageLayout title="New Hero" desc="create your own hero">
        <header className={`${styles.header}`}>
          <h1 className={styles.title}> Mi nuevo Héroe</h1>
        <FaPaintBrush size={60} className={styles.icon} />
        </header>
        <form id="form" className={styles.formulario} onSubmit={handleSubmit}>
          <ul className={styles.form_list}>
            <li className={styles.item_list} id="epa">
              <label htmlFor="name">Nombre</label>
              <input
                className={styles.text_field}
                type="text"
                name="name"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="nope"
                required
              />
            </li>
          </ul>
          <div className={`${styles.form_out}`}>
            <input
              className="boton"
              type="button"
              onClick={clearCanvas}
              value="Limpiar"
            />
          </div>
          <canvas
            className={styles.canvas}
            id="c"
            width="300"
            height="300"
          ></canvas>
          <div className={styles.form_out}>
            <input
              className="boton"
              type="button"
              onClick={() => router.back()}
              value="Volver"
            />
            <input className="boton" type="submit" value="Guardar" />
          </div>
        </form>
      </PageLayout>
    </>
  );
}
