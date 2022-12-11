export const drawCanvas = () => {
  //Guardar el elemento y el contexto
  const pizarra = document.getElementById("c");
  const context = pizarra.getContext("2d");

  let initialX;
  let initialY;
  //vendito getBoundClientRect!!, hasta que no te encontré no pude terminar esta funcioonalidad :')
  let posicion = pizarra.getBoundingClientRect();
  // relleno inicial de blanco para evitar transparencias

  const correccionX = posicion.x;
  const correccionY = posicion.y;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 301, 301);

  pizarra.addEventListener("mousedown", actionStart);
  pizarra.addEventListener("touchstart", actionStart);

  pizarra.addEventListener("mouseup", mouseUp);
  pizarra.addEventListener("touchend", mouseUp);

  function dibujar(cursorX, cursorY) {
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = 2;
    context.strokeStyle = "#000";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(cursorX, cursorY);
    context.stroke();
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

    pizarra.addEventListener("mousemove", actionRunnig);
    pizarra.addEventListener("touchmove", actionRunnig);
  }

  function actionRunnig(evt) {
    if (evt.type === "mousemove") {
      dibujar(evt.offsetX, evt.offsetY);
    }
    if (evt.type === "touchmove") {
      const listT = evt.changedTouches[0];
      dibujar(listT.pageX - correccionX, listT.pageY - correccionY);
    }
  }

  function mouseUp() {
    pizarra.removeEventListener("mousemove", actionRunnig);
    pizarra.removeEventListener("touchmove", actionRunnig);
  }
};

export const clearCanvas = () => {
  const cv = document.getElementById("canvas");
  const context = cv.getContext("2d");
  cv.width = cv.width;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 301, 301);
};

const prev = (e) => {
  //previene el eveto default del scrolling
  e.preventDefault();
};

export const drawFixed = () => {
  //fija la pagina
  const pizarra = document.getElementById("canvas");
  pizarra.addEventListener("touchmove", prev, { passive: false });
};
export const drawFree = () => {
  const pizarra = document.getElementById("canvas");
  pizarra.removeEventListener("touchmove", prev);
};
