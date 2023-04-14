import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './progressBar.module.scss';
import { MOLE_TIME } from '../constants';

export function ProgressBar({ timeLeft }) {
  const [fillerHidden, setFillerHidden] = useState(false);
  useEffect(() => {
    if (timeLeft <= 100) {
      setFillerHidden(true);
    }
  }, [timeLeft]);
  return (
    <div className={styles.container}>
      <div
        className={classNames({ [styles.hidden]: fillerHidden }, [
          styles.filler,
        ])}
        style={{ width: `${Math.ceil((timeLeft * 100) / MOLE_TIME)}%` }}
      />
    </div>
  );
}
