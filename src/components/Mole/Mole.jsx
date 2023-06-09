import { useSelector } from 'react-redux';
import moleImage from '../../images/mole.png';
import styles from './mole.module.scss';
import { getMoleSelector } from '../../redux/slices/moleSlice';
import { MOLE_SIZE } from '../constants';

export function Mole({ clickMoleHandler }) {
  const mole = useSelector(getMoleSelector);
  const size = MOLE_SIZE[mole.lives - 1];
  if (mole.column === '' || mole.row === '') {
    return null;
  }
  return (
    <div
      onClick={clickMoleHandler}
      className={styles.mole}
      style={{ gridColumn: `${mole.column}`, gridRow: `${mole.row}` }}
    >
      <img src={moleImage} alt="mole" className={styles[size]} />
    </div>
  );
}
