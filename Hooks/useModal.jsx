import { useState } from "react";

export function useModal({ type, openStatus, autoClose }) {
  const [loot, setLoot] = useState({ type, openStatus, autoClose});
    const DELAY_MODAL_OPEN = 3000 ;
  const openModal = () => {
    setLoot({ ...loot, openStatus: true });
    if(autoClose) setTimeout(() => setLoot({ ...loot, openStatus: false }), DELAY_MODAL_OPEN);
  };

  const closeModal = () => setLoot({ ...loot, openStatus: false });
  return [loot, openModal, closeModal];
}
