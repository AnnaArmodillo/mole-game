import { Link } from 'react-router-dom';
import styles from './header.module.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <Link to="./" className={styles.link} title="На главную">КРОТОБОЙ</Link>
    </div>
  );
}
