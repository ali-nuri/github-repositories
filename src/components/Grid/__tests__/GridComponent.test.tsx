import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Grid from '../Grid';
import { mockRepositories } from './data';
import { Repository } from '../../../models';

describe('Grid component', () => {
  const renderComponent = (
    props?: Partial<React.ComponentProps<typeof Grid>>
  ) => {
    return render(
      <Grid<Repository>
        data={
          props?.data ||
          new Array(mockRepositories.length).fill(mockRepositories)
        }
        render={({ item, ...rest }) => <div {...rest}>{item.name}</div>}
        filters={['language', 'starred']}
        {...props}
      />
    );
  };

  it('renders without crashing', () => {
    renderComponent({
      data: mockRepositories,
    });
    expect(screen.getByText('TranslucentTB')).toBeInTheDocument();
    expect(screen.getByText('awesome-github-wechat-weapp')).toBeInTheDocument();
  });

  it('filters data based on selected filters', () => {
    renderComponent({
      data: mockRepositories,
    });

    fireEvent.change(screen.getByLabelText('language'), {
      target: { value: 'C++' },
    });
    expect(screen.getByText('TranslucentTB')).toBeInTheDocument();
    expect(() => screen.getByText('awesome-github-wechat-weapp')).toThrow();

    fireEvent.change(screen.getByLabelText('language'), {
      target: { value: '' },
    });
    expect(screen.getByText('TranslucentTB')).toBeInTheDocument();
    expect(screen.getByText('awesome-github-wechat-weapp')).toBeInTheDocument();
  });
});
