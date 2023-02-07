"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useDrawNewCanvas } from "../../Hooks/useDrawNewCanvas";
import PageLayout from "../../components/PageLayout";
import { FaPaintBrush } from "react-icons/fa";
import { Modal } from "../../components/Modal";
import { useModal } from "../../Hooks/useModal";
import styles from "../../styles/CreateHero.module.css";

export default function New() {
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    history: ''
  });
  const [canvasSize, setCanvasSize] = useState(300);
  const [addModalLoot, openAddModal, closeAddModal] = useModal({
    type: "def",
    openStatus: false,
    autoClose: false
  });
  const [warningModalLoot, openWarningModal] = useModal({
    type: "warning",
    openStatus: false,
    autoClose: true
  });
  const [warningCharModalLoot, openWarningCharModal] = useModal({
    type: "warning",
    openStatus: false,
    autoClose: true
  });
  const [errorModalLoot, openErrorModal] = useModal({
    type: "error",
    openStatus: false,
    autoClose: true
  });
  const [successModalLoot, openSuccessModal] = useModal({
    type: "success",
    openStatus: false,
    autoClose: true
  });
  const { clearCanvas, convertTo64 } = useDrawNewCanvas();
  useEffect(()=>{
    if(typeof window !== undefined){
      if(window.innerWidth > 710) {
        setCanvasSize(500)
        window.setTimeout(()=>{clearCanvas()},[500]);
      }
      else if(window.innerWidth < 310){
        setCanvasSize(200)
        window.setTimeout(()=>{clearCanvas()},[500]);
        }
    }
  },[]);
const REGEX_special_char = /[\^!¡¿?$#&/().=`´°|<>*;\\,{}]/g;

  const handleSubmit = async (e) => {
    // añade heroe creando registro en db
    e.preventDefault();
    if(REGEX_special_char.test(`${data.name} ${data.history}`)) return openWarningCharModal();
    openAddModal();
    const img = convertTo64();
    const myhero = {
      id: uuidv4(),
      img,
      name: data.name,
      history: data.history
    };
    //add your code here...
    try {
      const res = await fetch("/api/new/customhero", {
        method: "POST",
        body: JSON.stringify(myhero),
      });
      const dataConfirm = await res.json();
      if (dataConfirm.limitControl) return warningHandle();
      if (!dataConfirm.success) return errorHandle();
      successHandle();
    } catch (err) {
      errorHandle();
    }
  };

  const errorHandle = () => {
    console.log("error manejado");
    closeAddModal();
    openErrorModal();
  };
  const warningHandle = () => {
    console.log("advertencia manejada");
    closeAddModal();
    openWarningModal();
  };
  const successHandle = () => {
    console.log('exitooo')
    setData({name: '', history: ''});
    clearCanvas();
    closeAddModal();
    openSuccessModal();
  };


  return (
    <>
      <Modal loot={addModalLoot}>Añadiendo nuevo héroe</Modal>
      <Modal loot={errorModalLoot}>!Tarea fallida!</Modal>
      <Modal loot={successModalLoot}>!Añadido correctamente!</Modal>
      <Modal loot={warningModalLoot}>!Límite de heroes alcanzado!</Modal>
      <Modal loot={warningCharModalLoot}>Por favor evite usar caracteres especiales</Modal>
      <PageLayout title="New Hero" desc="create your own hero">
        <header className={`${styles.header}`}>
          <h1 className={styles.title}> Mi nuevo Héroe</h1>
          <FaPaintBrush size={60} className={styles.icon} />
        </header>
        <form id="form" className={styles.formulario} onSubmit={handleSubmit}>
          <ul className={styles.form_list}>
            <li className={styles.item_list}>
              <label htmlFor="name">Nombre</label>
              <input
                className={styles.text_field}
                type="text"
                name="name"
                placeholder="Nombre"
                value={data.name}
                onChange={(e) => setData({...data, name: e.target.value.slice(0,20)})}
                autoComplete="nope"
                required
              />
            </li>
            <li className={styles.item_list}>
              <label htmlFor="history">Historia</label>
              <textarea
                className={styles.text_field}
                rows="3"
                name="history"
                placeholder="Historia"
                value={data.history}
                onChange={(e) => setData({...data, history: e.target.value})}
                autoComplete="nope"
                required
              />
            </li>
          </ul>
          <div className={`${styles.form_out}`}>
            <input
              className={`boton ${styles.btn}`}
              type="button"
              onClick={clearCanvas}
              value="Limpiar"
            />
          </div>
          <canvas
            className={styles.canvas}
            id="c"
            width={canvasSize}
            height={canvasSize}
          ></canvas>
          <div className={styles.form_out}>
            <input
              className={`boton ${styles.btn}`}
              type="button"
              onClick={() => router.back()}
              value="Volver"
            />
            <input className={`boton ${styles.btn}`} type="submit" value="Guardar" />
          </div>
        </form>
      </PageLayout>
    </>
  );
}
