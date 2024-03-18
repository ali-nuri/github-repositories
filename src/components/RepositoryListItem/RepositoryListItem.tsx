import { SyntheticEvent } from 'react';
import { Repository } from '../../models';
import styles from './RepositoryListItem.module.css';
import ButtonIcon from '../Button/ButtonIcon';

const RepositoryListItem: React.FC<{
  item: Repository;
  onStarClick: (id: number) => void;
}> = ({ item, onStarClick }) => {
  return (
    <div className={styles.listItem}>
      <div className={styles.header}>
        <h3 className={styles.title}>{item.name}</h3>
        <ButtonIcon
          onClick={(e: SyntheticEvent) => {
            e.preventDefault();
            onStarClick(item.id);
          }}
          title={item.starred ? 'Starred' : 'Star'}
          iconUrl={
            item.starred ? '/assets/star-filled.svg' : '/assets/star.svg'
          }
        />
      </div>
      <div className={styles.body}>
        <p className={styles.description}>{item.description}</p>
        <span className={styles.urlContainer}>
          <i className={styles.githubIcon}></i>
          <a className={styles.url} href={item.html_url} target="_blank">
            {item.html_url}
          </a>
        </span>
      </div>
      <div className={styles.footer}>
        {item.language && (
          <span className={styles.footerItem}>
            <p className={styles.footerText}>{item.language}</p>
          </span>
        )}
        <span className={styles.footerItem}>
          <i className={styles.starIcon}></i>
          <p className={styles.footerText}>{item.stargazers_count}</p>
        </span>
        <span className={styles.footerItem}>
          <i className={styles.forkIcon}></i>
          <p className={styles.footerText}>{item.forks_count}</p>
        </span>
      </div>
    </div>
  );
};

export default RepositoryListItem;
