import styles from './game.module.scss';

export function Game() {
  return (
    <div className={styles.game}>
      <div className={styles.board}>
        game
      </div>
      <div className={styles.score}>score</div>
    </div>
  );
}
