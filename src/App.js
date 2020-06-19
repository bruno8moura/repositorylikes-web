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
    // TODO
  }

  async function handleRemoveRepository(id) {
      // TODO
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
