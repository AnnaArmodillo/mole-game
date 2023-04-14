import { Link } from 'react-router-dom';
import styles from './buttonPlay.module.scss';

export function ButtonPlay() {
  return (
    <Link to="/game" className={styles.link}>
      <button type="button" className={styles.button}>Начать игру!</button>
    </Link>
  );
}
