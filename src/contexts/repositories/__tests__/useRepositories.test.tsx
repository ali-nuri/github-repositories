import { renderHook, act, waitFor } from '@testing-library/react';
import { getRepositories } from '../../../services/repositories';
import useRepositories from '../useRepositories';
import RepositoriesProvider from '../RepositoriesProvider';
import { Repositories } from '../../../models';

jest.mock('../../../services/repositories');

describe('useRepositories', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetches repositories and sets state correctly', async () => {
    const repositoriesData: Repositories = {
      total_count: 2,
      incomplete_results: false,
      items: [
        {
          id: 78483432,
          name: 'TranslucentTB',
          description:
            'A lightweight utility that makes the Windows taskbar translucent/transparent.',
          html_url: 'https://github.com/TranslucentTB/TranslucentTB',
          stargazers_count: 13947,
          language: 'C++',
          forks_count: 1063,
        },
        {
          id: 78544867,
          name: 'awesome-github-wechat-weapp',
          html_url: 'https://github.com/opendigg/awesome-github-wechat-weapp',
          stargazers_count: 8668,
          language: 'JavaScript',
          forks_count: 1826,
        },
      ],
    };

    (
      getRepositories as jest.MockedFunction<typeof getRepositories>
    ).mockResolvedValueOnce(repositoriesData);

    const { result } = renderHook(() => useRepositories(), {
      wrapper: RepositoriesProvider, // Using the RepositoriesProvider component as the wrapper
    });

    expect(result.current.isFetching).toBe(false);
    expect(result.current.repositories).toEqual([]);

    await act(async () => {
      result.current.fetchRepositories();
    });

    await waitFor(() => {
      expect(getRepositories).toHaveBeenCalledTimes(1);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.repositories).toEqual(
        repositoriesData.items.map((item) => ({ ...item, starred: false }))
      );
    });
  });
});
