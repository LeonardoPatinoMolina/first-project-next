import { useEffect, useRef, useState } from "react";
import { useVerifyRe } from "./useVerifyRe";
const C2S = require('canvas2svg')

export const useDrawNewCanvas = () => {
  // const [verifyRe] = useVerifyRe();
  const [dependence, setDependence] = useState("draw");
  const canvas = useRef();
  const canvasToSvg = useRef();
  const $ = (id) => document.getElementById(id);
  const COLOR = '#f1f2f3'
  useEffect(() => {
    //--------------------------------------------------------------

    //Guardar el elemento y el contexto
    canvas.current = $("c");
    const context = canvas.current.getContext("2d");
    canvasToSvg.current = new C2S(canvas.current.width,canvas.current.height);


    let initialX;
    let initialY;
    //vendito getBoundClientRect!!, hasta que no te encontré no pude terminar esta funcioonalidad :')
    let posicion = canvas.current.getBoundingClientRect();
    // relleno inicial de blanco para evitar transparencias

    const correccionX = posicion.x;
    const correccionY = posicion.y;

    canvas.current.addEventListener("mousedown", actionStart);
    canvas.current.addEventListener("touchstart", actionStart);

    canvas.current.addEventListener("mouseup", mouseUp);
    canvas.current.addEventListener("touchend", mouseUp);

    function dibujar(cursorX, cursorY) {
      //canvas
      context.beginPath();
      context.moveTo(initialX, initialY);
      context.lineWidth = 3;
      context.strokeStyle = "#000";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineTo(cursorX, cursorY);
      context.stroke();
      //canvasToSvg
      canvasToSvg.current.beginPath();
      canvasToSvg.current.moveTo(initialX, initialY);
      canvasToSvg.current.lineWidth = 3;
      canvasToSvg.current.strokeStyle = "#000";
      canvasToSvg.current.lineCap = "round";
      canvasToSvg.current.lineJoin = "round";
      canvasToSvg.current.lineTo(cursorX, cursorY);
      canvasToSvg.current.stroke();

      initialX = cursorX;
      initialY = cursorY;
    }

    function actionStart(evt) {
      if (evt.type === "mousedown") {
        initialX = evt.offsetX;
        initialY = evt.offsetY;
        dibujar(initialX, initialY);
      }
      if (evt.type === "touchstart") {
        const listT = evt.changedTouches[0];
        initialX = listT.pageX - correccionX;
        initialY = listT.pageY - correccionY;
        dibujar(initialX, initialY);
      }

      canvas.current.addEventListener("mousemove", actionRunnig);
      canvas.current.addEventListener("touchmove", actionRunnig);
    }

    function actionRunnig(evt) {
      if (evt.type === "mousemove") {
        dibujar(evt.offsetX, evt.offsetY);
      }
      if (evt.type === "touchmove") {
        evt.preventDefault();
        const listT = evt.changedTouches[0];
        dibujar(listT.pageX - correccionX, listT.pageY - correccionY);
      }
    }

    function mouseUp() {
      canvas.current.removeEventListener("mousemove", actionRunnig);
      canvas.current.removeEventListener("touchmove", actionRunnig);
    }

    //--------------------------------------------------------------
    //canvas
    context.fillStyle = COLOR;
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    //canvasToSvg
    canvasToSvg.current.fillStyle = COLOR;
    canvasToSvg.current.fillRect(0, 0, canvas.current.width, canvas.current.height);
  }, []);

  const clearCanvas = (e) => {
    // prev(e);
    const cv = $("c");
    const context = cv.getContext("2d");
    //canvas
    context.fillStyle = COLOR;
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    //canvasToSvg
    canvasToSvg.current = new C2S(canvas.current.width,canvas.current.height);
    canvasToSvg.current.fillStyle = COLOR;
    canvasToSvg.current.fillRect(0, 0, canvas.current.width, canvas.current.height);

  };

  const prev = (e) => {
    //previene el eveto default del scrolling
    e.preventDefault();
  };

  // const drawFixed = () => {
  //   //fija la pagina
  //   const pizarra = $("c");
  //   pizarra.addEventListener("touchmove", prev, { passive: false });
  // };
  // const drawFree = () => {
  //   const pizarra = $("c");
  //   pizarra.removeEventListener("touchmove", prev);
  // };

  const convertToSvg = ()=>{
    var epa  = canvasToSvg.current.getSerializedSvg(true); 
    return epa;
  }

  return { clearCanvas, convertToSvg };
};
