import { SyntheticEvent } from "react";
import styles from "./ButtonIcon.module.css";
interface ButtonIconProps {
  title: string;
  iconUrl: string;
  onClick?: (e: SyntheticEvent) => void;
}

const ButtonIcon = ({ title, iconUrl, onClick }: ButtonIconProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <i
        className={styles.icon}
        style={{ backgroundImage: `url(${iconUrl})` }}
      />
      {title}
    </button>
  );
};

export default ButtonIcon;
