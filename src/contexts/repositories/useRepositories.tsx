import { useCallback, useContext, useEffect } from "react";
import RepositoriesContext from "./context";
import { getRepositories } from "../../services/repositories";
import { Repository } from "../../models";

const useRepositories = () => {
  const { isFetching, setIsFetching, repositories, setRepositories } =
    useContext(RepositoriesContext);

  const updateLocalRepositories = useCallback((repositories: Repository[]) => {
    localStorage.setItem("repositories", JSON.stringify(repositories));
  }, []);

  useEffect(() => {
    if (repositories.length > 0) {
      updateLocalRepositories(repositories);
    }
  }, [repositories, updateLocalRepositories]);

  const fetchRepositories = useCallback(async () => {
    setIsFetching(true);

    let previousRepositories: Repository[] = [];
    if (localStorage.getItem("repositories")) {
      previousRepositories = JSON.parse(
        localStorage.getItem("repositories") || "[]"
      );
      setRepositories(previousRepositories);
    }

    try {
      const repositoriesData = await getRepositories(
        "created:2017-01-10",
        "stars",
        "desc"
      );

      const updatedRepositories = repositoriesData.items.map((item) => {
        const starred = previousRepositories.some(
          (repo) => repo.id === item.id && repo.starred
        );
        return { ...item, starred };
      });

      setRepositories(updatedRepositories);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false);
    }
  }, [setIsFetching, setRepositories]);

  const toggleStarRepository = useCallback(
    (id: number) => {
      const updatedRepositories = repositories.map((repository) => {
        if (repository.id === id) {
          return {
            ...repository,
            starred: !repository.starred,
          };
        }
        return repository;
      });

      setRepositories(updatedRepositories);
    },
    [repositories, setRepositories]
  );

  return {
    isFetching,
    fetchRepositories,
    toggleStarRepository,
    repositories,
  };
};

export default useRepositories;
