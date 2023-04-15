import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './game.module.scss';
import { Mole } from '../Mole/Mole';
import {
  countPoints, finishGame, getGameSelector, setLevelUp, setTotalScore, startGame, startNewGame,
} from '../../redux/slices/gameSlice';
import { clearMole, setMole } from '../../redux/slices/moleSlice';
import { ProgressBar } from '../ProgressBar/ProgressBas';
import { MOLE_TIME } from '../constants';
import { getPoints } from '../helper';
import { Modal } from '../Modal/Modal';

export function Game() {
  const game = useSelector(getGameSelector);
  const [timeLeft, setTimeLeft] = useState(MOLE_TIME);
  const [timeStart, setTimeStart] = useState('');
  const [isModalFailOpen, setIsModalFailOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const dispatch = useDispatch();
  function startLevel() {
    dispatch(startGame());
    dispatch(setMole());
    setTimeStart(Date.now());
    setTimeLeft(MOLE_TIME);
  }
  function startNewGameHandler() {
    dispatch(startNewGame());
    setIsModalFailOpen(false);
    startLevel();
  }
  function startGameHandler() {
    startLevel();
  }
  function clickMoleHandler() {
    dispatch(setMole());
    dispatch(countPoints(+getPoints(timeLeft) + game.score));
    dispatch(setTotalScore(+getPoints(timeLeft) + game.totalScore));
    setTimeLeft(MOLE_TIME);
    setTimeStart(Date.now());
  }
  function closeModalFailHandler() {
    setIsModalFailOpen(false);
  }
  function closeModalSuccessHandler() {
    setIsModalSuccessOpen(false);
  }
  useEffect(() => {
    if (game.started && timeLeft >= 0) {
      setTimeout(() => {
        setTimeLeft(timeStart + MOLE_TIME - Date.now());
      }, 100);
    } else if (game.started) {
      dispatch(finishGame());
      dispatch(clearMole());
      dispatch(setTotalScore(game.totalScore + game.score));
      setIsModalFailOpen(true);
    }
  }, [game.started, timeLeft, setTimeLeft, setIsModalFailOpen]);
  useEffect(() => {
    if (game.score >= game.goal) {
      dispatch(setLevelUp(game.level + 1));
      dispatch(finishGame());
      setIsModalSuccessOpen(true);
    }
  }, [game.score]);
  return (
    <div className={styles.game}>
      <div className={styles.board}>
        <div className={styles.gameGrid}>
          <Mole clickMoleHandler={clickMoleHandler} />
        </div>
      </div>
      <div className={styles.score}>
        {!game.started && (
          <button
            type="button"
            onClick={startNewGameHandler}
            className={styles.button}
          >
            Начать новую игру
          </button>
        )}
        {game.started
          && <ProgressBar timeLeft={timeLeft} />}
        <div className={styles.wrapper}>
          <p>Счет</p>
          <p>{game.score}</p>
        </div>
        <div className={styles.wrapper}>
          <p>Цель</p>
          <p>{game.goal}</p>
        </div>
        <div className={styles.wrapper}>
          <p>Общий счет</p>
          <p>{game.totalScore}</p>
        </div>
        <div className={styles.wrapper}>
          <p>Уровень</p>
          <p>{game.level}</p>
        </div>
      </div>
      <Modal isModalOpen={isModalFailOpen} closeModalHandler={closeModalFailHandler}>
        <p>О нет, кроты победили!</p>
        <p>
          Твой счет:
          {' '}
          {game.totalScore}
        </p>
        <button
          type="button"
          onClick={startNewGameHandler}
          className={styles.button}
        >
          Начать игру заново
        </button>
      </Modal>
      <Modal isModalOpen={isModalSuccessOpen} closeModalHandler={closeModalSuccessHandler}>
        <p>Ты победил!</p>
        <p>
          Твой счет:
          {' '}
          {game.totalScore}
        </p>
        {(game.level <= 10) && (
          <>
            <p>Но еще не все кроты повержены...</p>
            <button
              type="button"
              onClick={() => {
                startGameHandler();
                setIsModalSuccessOpen(false);
              }}
              className={styles.button}
            >
              Следующий уровень
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}
