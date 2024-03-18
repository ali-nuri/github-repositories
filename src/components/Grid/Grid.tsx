import React, { useState, useMemo, useCallback } from 'react';
import GridFilterPanel from './GridFilterPanel';
import styles from './Grid.module.css';

type ItemComponentProps<T> = { item: T } & Record<string, unknown>;

interface DataGridProps<T> {
  data: T[];
  render: (props: ItemComponentProps<T>) => React.ReactNode;
  filters: (keyof T)[];
}

function Grid<T>({ data, render, filters = [] }: DataGridProps<T>) {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string | number | boolean;
  }>({});

  const handleFilterChange = useCallback(
    (filter: string, value: string | number | boolean) => {
      setSelectedFilters({
        ...selectedFilters,
        [filter]: value,
      });
    },
    [selectedFilters]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.entries(selectedFilters).every(([filterField, filterValue]) => {
        const itemValue = item[filterField as keyof T];
        const itemValueType = typeof itemValue;
        if (itemValueType === 'string') {
          return filterValue === '' || itemValue === filterValue;
        } else if (itemValueType === 'number' && filterValue !== undefined) {
          return filterValue === '' || itemValue === Number(filterValue);
        } else if (itemValueType === 'boolean') {
          return (
            filterValue === '' ||
            itemValue === (filterValue === 'true' ? true : false)
          );
        } else {
          return false;
        }
      })
    );
  }, [data, selectedFilters]);

  return (
    <div className={styles.grid}>
      <div className={styles.header}>
        <GridFilterPanel
          selectedFilters={selectedFilters}
          filters={filters}
          data={data}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div className={styles.body}>
        {filteredData.map((item, index) => render({ item, key: index }))}
      </div>
    </div>
  );
}

export default Grid;
