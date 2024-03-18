import Select from '../../Select';
import styles from './GridFilterPanel.module.css';

function GridFilterPanel<T>({
  filters,
  data,
  handleFilterChange,
  selectedFilters,
}: {
  filters: (keyof T)[];
  data: T[];
  handleFilterChange: (
    filter: string,
    value: string | number | boolean
  ) => void;
  selectedFilters: { [key: string]: string | number | boolean };
}) {
  const getNonEmptyFilterValues = (filter: keyof T): string[] => {
    return [
      ...new Set(data.map((item) => item[filter]?.toString() ?? '')),
    ].filter((value) => value !== '');
  };

  return (
    <div role="filterPanel" className={styles.filtersPanel}>
      {filters.map((filter) => (
        <Select
          key={filter.toString()}
          value={selectedFilters[filter]?.toString() ?? ''}
          label={filter.toString()}
          options={getNonEmptyFilterValues(filter)}
          onChange={(e) =>
            handleFilterChange(filter.toString(), e.target.value)
          }
        />
      ))}
    </div>
  );
}

export default GridFilterPanel;
