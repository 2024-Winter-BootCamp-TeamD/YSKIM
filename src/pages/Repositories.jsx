import React, { useState } from "react";
import "./Pages.css";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

  const renderLanguageBar = (languages) => {
    const totalWidth = 100; // 막대 전체 길이 (px)
    const colors = ["#F7DF1E", "#E34F26", "#1572B6", "#4CAF50", "#FFC107"];
    const languageEntries = Object.entries(languages);

    return (
      <div className="language-bar-container" style={{ width: `${totalWidth}px` }}>
        {languageEntries.map(([language, percentage], index) => (
          <div
            key={language}
            className="language-bar-segment"
            style={{
              width: `${(percentage / 100) * totalWidth}px`,
              backgroundColor: colors[index % colors.length],
            }}
            title={`${language}: ${percentage}%`} // 툴팁 표시
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="repositories-container">
      <div className="repositories-section">
        <h3>Repositories</h3>
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
                <span className="organization-name">{repo.organization}</span>
                <span className="repository-name">{repo.repository}</span>
                <div className="repo-stats">
                  <span>Fork: {repo.fork}</span>
                  <span>Star: {repo.star}</span>
                  <span>Issue: {repo.issue}</span>
                  <span>Pull: {repo.pull}</span>
                </div>
                <div className="language-bar">{renderLanguageBar(repo.languages)}</div>
              </li>
            ))}
        </ul>
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          + ADD
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <ul className="repository-list">
              {repositories
                .filter((repo) => !repo.selected)
                .map((repo) => (
                  <li key={repo.id} className="repository-item">
                    <input
                      type="checkbox"
                      checked={selectedInModal.includes(repo.id)}
                      onChange={() => toggleModalSelection(repo.id)}
                    />
                    <img
                      src={repo.profileImage}
                      alt={`${repo.repository} profile`}
                      className="profile-image"
                    />
                    <span className="organization-name">{repo.organization}</span>
                    <span className="repository-name">{repo.repository}</span>
                    <div className="repo-stats">
                      <span>Fork: {repo.fork}</span>
                      <span>Star: {repo.star}</span>
                      <span>Issue: {repo.issue}</span>
                      <span>Pull: {repo.pull}</span>
                    </div>
                    <div className="language-graph">{renderLanguageBar(repo.languages)}</div>
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