import { Link } from 'react-router-dom';
import styles from './main.module.css';

export function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.text}>Игра &quot;Кротобой&quot;</div>
      <Link to="./game">
        <button type="button" className={styles.button}>Начать игру!</button>
      </Link>
    </div>
  );
}
