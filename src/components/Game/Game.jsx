import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import classNames from 'classnames';
import styles from './game.module.scss';
import { Mole } from '../Mole/Mole';
import {
  countPoints,
  decreaseTotalScore,
  finishGame,
  getGameSelector,
  pauseGame,
  resumeGame,
  setLevelUp,
  setTotalScore,
  setWeaponLevelUp,
  startGame,
  startNewGame,
} from '../../redux/slices/gameSlice';
import {
  clearMole,
  getMoleSelector,
  setMole,
} from '../../redux/slices/moleSlice';
import { ProgressBar } from '../ProgressBar/ProgressBas';
import { MOLE_TIME, WEAPONS } from '../constants';
import { getPoints } from '../helper';
import { Modal } from '../Modal/Modal';
import glove from '../../sounds/glove_hit.mp3';
import bucket from '../../sounds/bucket_hit.mp3';
import shovel from '../../sounds/shovel_hit.mp3';
import { getSoundSelector } from '../../redux/slices/soundSlice';

export function Game() {
  const game = useSelector(getGameSelector);
  const sound = useSelector(getSoundSelector);
  const { lives } = useSelector(getMoleSelector);
  const [knockCount, setKnockCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MOLE_TIME);
  const [timeStart, setTimeStart] = useState('');
  const [isModalFailOpen, setIsModalFailOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [isModalPauseOpen, setIsModalPauseOpen] = useState(false);
  const sounds = [glove, bucket, shovel];
  const weapon = WEAPONS[game.weapon];
  const [knock, { stop }] = useSound(sounds[game.weapon], { volume: sound ? 0.25 : 0 });
  const dispatch = useDispatch();
  function pauseHandler() {
    dispatch(pauseGame());
    setIsModalPauseOpen(true);
  }
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
  function clickMoleHandler() {
    knock();
    setKnockCount((prev) => prev + game.weapon + 1);
  }
  function closeModalFailHandler() {
    setIsModalFailOpen(false);
  }
  function closeModalSuccessHandler() {
    startLevel();
    setIsModalSuccessOpen(false);
  }
  function closeModalPauseHandler() {
    dispatch(resumeGame());
    setTimeStart(Date.now() + timeLeft - MOLE_TIME);
    setIsModalPauseOpen(false);
  }
  function setWeaponLevelUpHandler() {
    dispatch(setWeaponLevelUp(game.weapon + 1));
    dispatch(decreaseTotalScore(game.totalScore - game.weaponPrice));
  }
  useEffect(() => {
    if (knockCount >= lives && game.started) {
      dispatch(setMole());
      dispatch(countPoints(+getPoints(timeLeft, lives) + game.score));
      dispatch(setTotalScore(+getPoints(timeLeft, lives) + game.totalScore));
      setTimeLeft(MOLE_TIME);
      setTimeStart(Date.now());
      setKnockCount(0);
    }
  }, [knockCount]);
  useEffect(() => {
    if (game.started && timeLeft >= 0) {
      setTimeout(() => {
        setTimeLeft(timeStart + MOLE_TIME - Date.now());
      }, 100);
    } else if (game.started) {
      stop();
      dispatch(finishGame());
      dispatch(clearMole());
      dispatch(setTotalScore(game.totalScore + game.score));
      setIsModalFailOpen(true);
    }
  }, [game.started, timeLeft, setTimeLeft, setIsModalFailOpen]);
  useEffect(() => {
    if (game.score >= game.goal) {
      stop();
      if (game.level < 10) {
        dispatch(setLevelUp(game.level + 1));
      }
      dispatch(finishGame());
      setIsModalSuccessOpen(true);
    }
  }, [game.score]);
  return (
    <div className={styles.game}>
      <div className={classNames([styles.board], [styles[weapon]])}>
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
        {game.started && <ProgressBar timeLeft={timeLeft} />}
        <div className={styles.wrapper}>
          <p>Счет</p>
          <p>{game.score}</p>
        </div>
        <div className={styles.wrapper}>
          <p>Цель</p>
          <p>{game.goal}</p>
        </div>
        {game.started && (
          <button
            type="button"
            className={styles.button}
            onClick={pauseHandler}
            title="Сделать паузу"
          >
            Пауза
          </button>
        )}
      </div>
      <Modal
        isModalOpen={isModalFailOpen}
        closeModalHandler={closeModalFailHandler}
      >
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
      <Modal
        isModalOpen={isModalSuccessOpen}
        closeModalHandler={closeModalSuccessHandler}
      >
        <p>Ты победил!</p>
        <p>
          Твой счет:
          {' '}
          {game.totalScore}
        </p>
        {game.level <= 10 && (
          <>
            <p>Но еще не все кроты повержены...</p>
            <button
              type="button"
              onClick={closeModalSuccessHandler}
              className={styles.button}
            >
              Следующий уровень
            </button>
            {game.weapon < 2 && (game.totalScore >= game.weaponPrice) && (
            <button
              type="button"
              onClick={setWeaponLevelUpHandler}
              className={styles.button}
            >
              Купить оружие получше
            </button>
            )}
          </>
        )}
      </Modal>
      <Modal
        isModalOpen={isModalPauseOpen}
        closeModalHandler={closeModalPauseHandler}
      >
        <p>
          Перерыв! Нажми продолжить, когда немного отдохнешь
        </p>
        <button
          type="button"
          className={styles.button}
          onClick={closeModalPauseHandler}
        >
          Продолжить
        </button>
      </Modal>
    </div>
  );
}
