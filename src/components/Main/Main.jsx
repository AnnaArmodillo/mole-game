import { Link } from 'react-router-dom';
import styles from './main.module.scss';

export function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.text}>Игра &quot;Кротобой&quot;</div>
      <p>Кроты очень хитры и кровожадны, бей их!</p>
      <Link to="./game">
        <button type="button" className={styles.button}>Начать игру!</button>
      </Link>
    </div>
  );
}