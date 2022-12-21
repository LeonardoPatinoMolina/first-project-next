import { useState } from "react";

export function useModal({ type, openStatus, autoClose }) {
  const initialState = {
    color: colorSet(),
    openStatus,
    animateStatus: type !== 'error',
  };
  const [loot, setLoot] = useState(initialState);

  function colorSet() {
    switch (type) {
      case "error":
        return "#ff0000";
      case "success":
        return "#12fd14";
      case "warning":
        return "#ffd000";
      default:
        return "#777777";
    } //switch end
  }
  const DELAY_MODAL_OPEN = 3000;
  const openModal = () => {
    setLoot({ ...loot, openStatus: true });
    if (autoClose)
      setTimeout(
        () => setLoot({ ...loot, openStatus: false }),
        DELAY_MODAL_OPEN
      );
  };

  const closeModal = () => setLoot({ ...loot, openStatus: false });
  return [loot, openModal, closeModal];
}
