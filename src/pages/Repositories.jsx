import React, { useState } from "react";
import "./Pages.css";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

// 테스트용 데이터. 실제 데이터로 교체 필요.
const initialRepositories = [
  {
    id: 1,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "YSKIM",
    profileImage: "https://github.com/Nekerworld.png", // 깃허브 프로필 이미지 URL
    selected: false,
  },
  {
    id: 2,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "wonjin",
    profileImage: "https://github.com/wonjinjang.png",
    selected: false,
  },
  {
    id: 3,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "Gyuri_Kim",
    profileImage: "https://github.com/gyuri224.png",
    selected: false,
  },
  {
    id: 4,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "EinKim",
    profileImage: "https://github.com/einhn.png",
    selected: false,
  },
  {
    id: 5,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "Todolist",
    profileImage: "https://github.com/RYUJEONGHUN.png",
    selected: false,
  },
  {
    id: 6,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "gitApitest",
    profileImage: "https://github.com/Lauiee.png",
    selected: false,
  },
  {
    id: 7,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "review-Backend",
    profileImage: "https://github.com/Lauiee.png",
    selected: false,
  },
  {
    id: 8,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "YoongHyun-Lee",
    profileImage: "https://github.com/fostacion.png",
    selected: false,
  },
  {
    id: 9,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "demo-repository",
    profileImage: "https://github.com/Nekerworld.png",
    selected: false,
  },
];

function Repositories() {
  const [repositories, setRepositories] = useState(initialRepositories);

  const toggleSelection = (id) => {
    setRepositories((prevRepos) =>
      prevRepos.map((repo) =>
        repo.id === id ? { ...repo, selected: !repo.selected } : repo
      )
    );
  };

  return (
    <div className="repositories-container">
      <div className="repositories-column">
        <h3>Unselected</h3>
        <ul>
          {repositories
            .filter((repo) => !repo.selected)
            .map((repo) => (
              <li key={repo.id} className="repository-item">
                <img
                  src={repo.profileImage}
                  alt={`${repo.repository} profile`}
                  className="profile-image"
                />
                <div className="repo-details">
                  <span className="organization-name">{repo.organization}</span>
                  <span className="repository-name">{repo.repository}</span>
                  </div>
                <IoIosArrowForward
                  className="toggle-icon"
                  onClick={() => toggleSelection(repo.id)}
                  style={{cursor: "pointer"}}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="repositories-column">
        <h3>Selected</h3>
        <ul>
          {repositories
            .filter((repo) => repo.selected)
            .map((repo) => (
              <li key={repo.id} className="repository-item">
                <img
                  src={repo.profileImage}
                  alt={`${repo.repository} profile`}
                  className="profile-image"
                />
                <div className="repo-details">
                  <span className="organization-name">{repo.organization}</span>
                  <span className="repository-name">{repo.repository}</span>
                  </div>
                  <MdOutlineCancel
                  className="toggle-icon"
                  onClick={() => toggleSelection(repo.id)}
                  style={{cursor: "pointer"}}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Repositories;