import styles from './help.module.scss';
import { ButtonPlay } from '../ButtonPlay/ButtonPlay';

export function Help() {
  return (
    <div className={styles.help}>
      <h3>Как играть?</h3>
      <p>Справа от игрового поля есть кнопка &quot;Старт&quot;.</p>
      <p>
        После нажатия на эту кнопку на игровом поле появится первый крот, и
        начнется обратный отсчет.
      </p>
      <p>
        Крота нужно нейтрализовать, попав по нему молотком за отведенное время,
        которое будет отображаться справа от игрового поля. Чем больше времени у
        тебя останется, тем больше очков ты получишь.
      </p>
      <p>
        Но кротов все еще очень много, поэтому после победы над первым кротом
        появятся и другие, при этом счетчик оставшегося времени запустится
        заново.
      </p>
      <p>Когда время истечет, игра будет закончена. Удачи!</p>
      <ButtonPlay />
    </div>
  );
}
