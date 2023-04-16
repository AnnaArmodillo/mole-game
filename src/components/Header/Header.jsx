import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './header.module.scss';
import { getSoundSelector, setSound } from '../../redux/slices/soundSlice';
import { getGameSelector } from '../../redux/slices/gameSlice';

export function Header() {
  const isSoundOn = useSelector(getSoundSelector);
  const { level, totalScore } = useSelector(getGameSelector);
  const dispatch = useDispatch();
  function soundHandler() {
    dispatch(setSound());
  }
  return (
    <div className={styles.header}>
      {isSoundOn ? (
        <button
          type="button"
          className={styles.button}
          onClick={soundHandler}
          title="Выключить звук"
        >
          <i className="fa-solid fa-volume-high" />
        </button>
      ) : (
        <button
          type="button"
          className={styles.button}
          onClick={soundHandler}
          title="Включить звук"
        >
          <i className="fa-solid fa-volume-xmark" />
        </button>
      )}
      <Link
        to="./"
        className={styles.link}
        title="На главную"
      >
        КРОТОБОЙ
      </Link>
      <div>
        <div>
          Уровень
          {' '}
          {level}
        </div>
        <div>
          Общий счет
          {' '}
          {totalScore}
        </div>
      </div>
    </div>
  );
}
