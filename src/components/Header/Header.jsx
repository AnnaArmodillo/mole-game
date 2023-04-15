import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './header.module.scss';
import { getSoundSelector, setSound } from '../../redux/slices/soundSlice';

export function Header() {
  const isSoundOn = useSelector(getSoundSelector);
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
          <i className="fa-solid fa-volume-xmark" />
        </button>
      ) : (
        <button
          type="button"
          className={styles.button}
          onClick={soundHandler}
          title="Включить звук"
        >
          <i className="fa-solid fa-volume-high" />
        </button>
      )}
      <Link
        to="./"
        className={styles.link}
        title="На главную"
      >
        КРОТОБОЙ
      </Link>
    </div>
  );
}
