import React, { useState } from "react";
import "./Pages.css";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

// 테스트용 데이터. 실제 데이터로 교체 필요.
const initialRepositories = [
  {
    id: 1,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "YSKIM",
    profileImage: "https://github.com/Nekerworld.png", // 깃허브 프로필 이미지 URL
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { JavaScript: 70, HTML: 20, CSS: 10 },
    selected: false,
  },
  {
    id: 2,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "wonjin",
    profileImage: "https://github.com/wonjinjang.png",
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { Python: 50, Java: 30, Go: 20 },
    selected: false,
  },
  {
    id: 3,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "Gyuri_Kim",
    profileImage: "https://github.com/gyuri224.png",
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { Python: 50, Java: 30, Go: 20 },
    selected: false,
  },
  {
    id: 4,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "EinKim",
    profileImage: "https://github.com/einhn.png",
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { Python: 50, Java: 30, Go: 20 },
    selected: false,
  },
  {
    id: 5,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "Todolist",
    profileImage: "https://github.com/RYUJEONGHUN.png",
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { Python: 50, Java: 30, Go: 20 },
    selected: false,
  },
  {
    id: 6,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "gitApitest",
    profileImage: "https://github.com/Lauiee.png",
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { Python: 50, Java: 30, Go: 20 },
    selected: false,
  },
  {
    id: 7,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "review-Backend",
    profileImage: "https://github.com/Lauiee.png",
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { Python: 50, Java: 30, Go: 20 },
    selected: false,
  },
  {
    id: 8,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "YoongHyun-Lee",
    profileImage: "https://github.com/fostacion.png",
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { Python: 50, Java: 30, Go: 20 },
    selected: false,
  },
  {
    id: 9,
    organization: "2024-Winter-BootCamp-TeamD",
    repository: "demo-repository",
    profileImage: "https://github.com/Nekerworld.png",
    fork: 0,
    star: 0,
    issue: 0,
    pull: 0,
    languages: { Python: 50, Java: 30, Go: 20 },
    selected: false,
  },
];

function Repositories() {
  const [repositories, setRepositories] = useState(initialRepositories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInModal, setSelectedInModal] = useState([]);

  const toggleModalSelection = (id) => {
    setSelectedInModal((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((repoId) => repoId !== id)
        : [...prevSelected, id]
    );
  };

  const handleApply = () => {
    setRepositories((prevRepos) =>
      prevRepos.map((repo) =>
        selectedInModal.includes(repo.id) ? { ...repo, selected: true } : repo
      )
    );
    setSelectedInModal([]);
    setIsModalOpen(false);
  };

  const renderLanguages = (languages) => {
    return Object.entries(languages).map(([language, percentage]) => (
      <span key={language} className="language-item">
        {language}: {percentage}%
      </span>
    ));
  };

  return (
    <div className="repositories-container">
      {/* Selected Section */}
      <div className="repositories-section">
        <h3>Selected Repositories</h3>
        <ul className="repository-list">
          {repositories
            .filter((repo) => repo.selected)
            .map((repo) => (
              <li key={repo.id} className="repository-item">
                <span
                  className="toggle-button"
                  onClick={() => toggleModalSelection(repo.id)}
                >
                  ✖
                </span>
                <img
                  src={repo.profileImage}
                  alt={`${repo.repository} profile`}
                  className="profile-image"
                />
                <div className="repo-details">
                  <span className="organization-name">{repo.organization}</span>
                  <span className="repository-name">{repo.repository}</span>
                  <div className="repo-stats">
                    <span>Fork: {repo.fork}</span>
                    <span>Star: {repo.star}</span>
                    <span>Issue: {repo.issue}</span>
                    <span>Pull: {repo.pull}</span>
                  </div>
                  <div className="language-stats">{renderLanguages(repo.languages)}</div>
                </div>
              </li>
            ))}
        </ul>
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          + ADD
        </button>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Unselected Repositories</h3>
            <ul className="repository-list">
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
                      <div className="repo-stats">
                        <span>Fork: {repo.fork}</span>
                        <span>Star: {repo.star}</span>
                        <span>Issue: {repo.issue}</span>
                        <span>Pull: {repo.pull}</span>
                      </div>
                      <div className="language-stats">{renderLanguages(repo.languages)}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedInModal.includes(repo.id)}
                      onChange={() => toggleModalSelection(repo.id)}
                    />
                  </li>
                ))}
            </ul>
            <button className="apply-button" onClick={handleApply}>
              적용
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Repositories;
