import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './game.module.scss';
import { Mole } from '../Mole/Mole';
import {
  countPoints, finishGame, getGameSelector, startGame,
} from '../../redux/slices/gameSlice';
// eslint-disable-next-line no-unused-vars
import { clearMole, setMole } from '../../redux/slices/moleSlice';
import { ProgressBar } from '../ProgressBar/ProgressBas';
import { MOLE_TIME } from '../constants';
import { getPoints } from '../helper';
import { Modal } from '../Modal/Modal';

export function Game() {
  const { started, score } = useSelector(getGameSelector);
  const [timeLeft, setTimeLeft] = useState(MOLE_TIME);
  const [timeStart, setTimeStart] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  function startGameHandler() {
    dispatch(startGame());
    dispatch(setMole());
    setTimeStart(Date.now());
    setTimeLeft(MOLE_TIME);
  }
  function clickMoleHandler() {
    dispatch(setMole());
    dispatch(countPoints(+getPoints(timeLeft) + score));
    setTimeLeft(MOLE_TIME);
    setTimeStart(Date.now());
  }
  function closeModalHandler() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    if (started && timeLeft >= 0) {
      setTimeout(() => {
        setTimeLeft(timeStart + MOLE_TIME - Date.now());
      }, 100);
    } else if (started) {
      dispatch(finishGame());
      // dispatch(clearMole());
      // setIsModalOpen(true);
    }
  }, [started, timeLeft, setTimeLeft, setIsModalOpen]);

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        <div className={styles.gameGrid}>
          <Mole clickMoleHandler={clickMoleHandler} />
        </div>
      </div>
      <div className={styles.score}>
        {!started && (
          <button type="button" onClick={startGameHandler} className={styles.button}>Старт</button>
        )}
        {started
          && <ProgressBar timeLeft={timeLeft} />}
        <div className={styles.scoreWrapper}>
          <p>Счет</p>
          <p>{score}</p>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} closeModalHandler={closeModalHandler}>
        <p>О нет, кроты победили!</p>
        <p>
          Твой счет:
          {' '}
          {score}
          {' '}
          очков
        </p>
      </Modal>
    </div>
  );
}
