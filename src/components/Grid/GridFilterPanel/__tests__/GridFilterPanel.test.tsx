import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GridFilterPanel from '../GridFilterPanel';
import '@testing-library/jest-dom';
import { mockRepositories } from './data';
import { Repository } from '../../../../models';

describe('GridFilterPanel', () => {
  const mockHandleFilterChange = jest.fn();

  beforeEach(() => {
    mockHandleFilterChange.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <GridFilterPanel
        filters={[]}
        data={[]}
        handleFilterChange={mockHandleFilterChange}
        selectedFilters={{}}
      />
    );
    expect(screen.getByRole('filterPanel')).toBeInTheDocument();
  });

  it('calls handleFilterChange on select change', async () => {
    const filters: (keyof Repository)[] = ['language'];
    const data = mockRepositories;
    render(
      <GridFilterPanel
        filters={filters}
        data={data}
        handleFilterChange={mockHandleFilterChange}
        selectedFilters={{}}
      />
    );

    const select = screen.getByLabelText('language');
    await userEvent.selectOptions(select, 'C++');

    expect(mockHandleFilterChange).toHaveBeenCalledWith('language', 'C++');
  });

  it('renders selectedFilters correctly', () => {
    const filters: (keyof Repository)[] = ['language'];
    const data = mockRepositories;
    const selectedFilters = { language: 'C++' };
    render(
      <GridFilterPanel
        filters={filters}
        data={data}
        handleFilterChange={mockHandleFilterChange}
        selectedFilters={selectedFilters}
      />
    );

    expect(screen.getByLabelText('language')).toHaveValue('C++');
  });
});
