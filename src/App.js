import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    try {
      loadRepos();
    } catch (error) {
      console.log('Error: ', error);
    }

  }, []);

  async function loadRepos() {
    const resp = await api.get('repositories');
    setRepositories([...resp.data]);
  }

  async function handleAddRepository() {
    const aTime = Date.now();
    const aNewRepository = {
      url: `http://github.com/atotallynewrepo${aTime}`,
      title: `A Totally new repository ${aTime}`,
      techs: ['Nodejs', 'React', 'React Native']
    };

    const persistedNewRepo = await api.post('repositories', aNewRepository);

    setRepositories([...repositories, persistedNewRepo.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const reposFiltered = repositories.filter(repo => repo.id !== id);

      setRepositories([...reposFiltered]);

    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
