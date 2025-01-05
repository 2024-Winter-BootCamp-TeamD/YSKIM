import React, { useState } from "react";

const repoData = [
  { id: 1, name: "Repo 1", enabled: false },
  { id: 2, name: "Repo 2", enabled: true },
  { id: 3, name: "Repo 3", enabled: false },
];

function Repositories() {
  const [repositories, setRepositories] = useState(repoData);

  const toggleRepo = (id) => {
    setRepositories((prev) =>
      prev.map((repo) =>
        repo.id === id ? { ...repo, enabled: !repo.enabled } : repo
      )
    );
  };

  return (
    <div>
      <h2>Repositories</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <label>
              <input
                type="checkbox"
                checked={repo.enabled}
                onChange={() => toggleRepo(repo.id)}
              />
              {repo.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Repositories;