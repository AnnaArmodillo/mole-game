import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import classNames from 'classnames';
import styles from './game.module.scss';
import { Mole } from '../Mole/Mole';
import moleJar from '../../images/mole_jar.png';
import moleJarOutline from '../../images/mole_jar_outline.png';
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
import { useDebounce } from '../../hooks/useDebounce';

export function Game() {
  const game = useSelector(getGameSelector);
  const sound = useSelector(getSoundSelector);
  const { lives } = useSelector(getMoleSelector);
  const [knockCount, setKnockCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MOLE_TIME);
  const [timeNow, setTimeNow] = useState(Date.now());
  const [timeStart, setTimeStart] = useState('');
  const [pauseTimeLeft, setPauseTimeLeft] = useState(0);
  const [isModalFailOpen, setIsModalFailOpen] = useState(false);
  const [isModalWinOpen, setIsModalWinOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [isModalPauseOpen, setIsModalPauseOpen] = useState(false);
  const sounds = [glove, bucket, shovel];
  const weapon = WEAPONS[game.weapon];
  const [knock, { stop }] = useSound(sounds[game.weapon], {
    volume: sound ? 0.25 : 0,
  });
  const dispatch = useDispatch();
  const debouncedTimeNow = useDebounce(Date.now(), 100);
  function pauseHandler() {
    dispatch(pauseGame());
    setPauseTimeLeft(timeLeft);
    setIsModalPauseOpen(true);
  }
  function setNewMole() {
    setTimeLeft(MOLE_TIME);
    setTimeStart(timeNow);
    dispatch(setMole());
  }
  function startLevel() {
    setKnockCount(0);
    dispatch(startGame());
    dispatch(setMole());
    setTimeStart(timeNow);
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
  function closeModalWinHandler() {
    dispatch(finishGame());
    dispatch(clearMole());
    setIsModalWinOpen(false);
  }
  function closeModalSuccessHandler() {
    startLevel();
    setIsModalSuccessOpen(false);
  }
  function closeModalPauseHandler() {
    dispatch(resumeGame());
    setTimeStart(timeNow - MOLE_TIME + pauseTimeLeft);
    setTimeLeft(pauseTimeLeft);
    setIsModalPauseOpen(false);
  }
  function setWeaponLevelUpHandler() {
    dispatch(setWeaponLevelUp(game.weapon + 1));
    dispatch(decreaseTotalScore(game.totalScore - game.weaponPrice));
  }
  function updateScore() {
    dispatch(countPoints(+getPoints(timeLeft, lives) + game.score));
    dispatch(setTotalScore(+getPoints(timeLeft, lives) + game.totalScore));
  }
  useEffect(() => {
    setTimeNow(debouncedTimeNow);
  }, [debouncedTimeNow]);
  useEffect(() => {
    setTimeLeft(timeStart - timeNow + MOLE_TIME);
  }, [timeNow, timeStart, MOLE_TIME]);
  useEffect(() => {
    if (knockCount >= lives && game.started) {
      setKnockCount(0);
      setNewMole();
      updateScore();
    }
  }, [knockCount, game.started]);
  useEffect(() => {
    if (game.started && timeLeft <= 0) {
      dispatch(finishGame());
      dispatch(clearMole());
      setIsModalFailOpen(true);
      stop();
    }
  }, [game.started, timeLeft, finishGame, clearMole, setIsModalFailOpen, stop]);
  useEffect(() => {
    if (game.score >= game.goal) {
      stop();
      if (game.level < 10) {
        dispatch(setLevelUp(game.level + 1));
        setIsModalSuccessOpen(true);
      } else {
        setIsModalWinOpen(true);
      }
      dispatch(finishGame());
    }
  }, [
    game.score,
    game.goal,
    game.level,
    setLevelUp,
    setIsModalSuccessOpen,
    finishGame,
  ]);
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
        <div className={styles.moleJarWrapper}>
          <img
            src={moleJar}
            alt="кротовуха"
            className={styles.moleJar}
          />
          <div
            className={styles.container}
            style={{ height: `calc(100% - ${Math.ceil((game.score * 100) / game.goal)}%)` }}
          >
            <img
              src={moleJarOutline}
              alt="кротовуха"
              className={styles.moleJarOutline}
            />
          </div>
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
            {game.weapon < 2 && game.totalScore >= game.weaponPrice && (
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
        <p>Перерыв! Нажми продолжить, когда немного отдохнешь</p>
        <button
          type="button"
          className={styles.button}
          onClick={closeModalPauseHandler}
        >
          Продолжить
        </button>
      </Modal>
      <Modal
        isModalOpen={isModalWinOpen}
        closeModalHandler={closeModalWinHandler}
      >
        <p>Превосходно! Кроты побеждены!</p>
        <p>
          Твой счет:
          {game.totalScore}
        </p>
        <button
          type="button"
          onClick={() => {
            closeModalWinHandler();
            startNewGameHandler();
          }}
          className={styles.button}
        >
          Начать игру заново
        </button>
      </Modal>
    </div>
  );
}
