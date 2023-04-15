import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import logo from '../../images/logo.png';

export function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="logo" className={styles.logo} />
        <p>
          Armadillo
        </p>
      </div>
      <p className={styles.text}>2023</p>
      <p>За озвучку огромное спасибо Марии Денисовой!</p>
      <Link to="./help" className={styles.link} title="Не понятно, как играть? Тебе сюда!">
        Справка
      </Link>
    </div>
  );
}
