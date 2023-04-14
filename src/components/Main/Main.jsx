import styles from './main.module.scss';
import { ButtonPlay } from '../ButtonPlay/ButtonPlay';

export function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.text}>Игра &quot;Кротобой&quot;</div>
      <p>Кроты очень хитры и кровожадны, бей их!</p>
      <ButtonPlay />
    </div>
  );
}
