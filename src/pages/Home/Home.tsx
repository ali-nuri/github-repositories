import { useEffect } from 'react';
import Grid from '../../components/Grid/Grid';
import useRepositories from '../../contexts/repositories/useRepositories';
import RepositoryListComponent from '../../components/RepositoryListItem';

const Home = () => {
  const { repositories, fetchRepositories, toggleStarRepository, isFetching } =
    useRepositories();

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  return isFetching ? (
    <p>Loading...</p>
  ) : (
    <Grid
      data={repositories}
      render={(props) => (
        <RepositoryListComponent
          {...props}
          onStarClick={toggleStarRepository}
        />
      )}
      filters={['language', 'starred']}
    />
  );
};

export default Home;
