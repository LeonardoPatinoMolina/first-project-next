import React,{useEffect} from 'react'
import PageLayout from '../../components/PageLayout';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { useRouter } from 'next/router';
import styles from '../../styles/Character.module.css';

export default function HeroPage() {
  const router = useRouter();
  const [valueStr, setValueStr] = useLocalStorage('character','');
  console.log('char: ', valueStr);
  const goBack = ()=>{
    localStorage.removeItem('character');
    router.back();
  }
  return (
    <PageLayout>
       <section className={styles.content}>
      <img className={styles.img} src={valueStr.img} alt="persojaje" />
      <h1 className={styles.title}>{valueStr.name}</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iusto
        sequi obcaecati repudiandae quisquam illo aperiam. Tenetur nemo, beatae,
        voluptate atque fugiat voluptatibus porro quia incidunt qui, soluta
        velit ducimus!
      </p>
      <div className={styles.btn_list}>
        <button onClick={() => goBack()} className={`boton ${styles.back_btn}`}>
          <span className={`material-icons`}>undo</span>
          Volver
        </button>
        {/* {favorites.some((el) => el.id === parseInt(id)) ? ( //averiguamos si el presente personaje es favorito o no
          <button className={`boton ${noFav_btn}`} onClick={handleNoMeGusta}>
            Ya no Gusta
            <span className={`material-icons`}>grade</span>
          </button>
        ) : (
          <button className={`boton ${fav_btn}`} onClick={handleMeGusta}>
            Me Gusta
            <span className={`material-icons`}>grade</span>
          </button>
        )} */}
      </div>
    </section>
    </PageLayout>
  )
}

