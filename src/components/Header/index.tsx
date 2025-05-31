"use client";

import { useState } from "react";
import styles from "./header.module.css";
import { WiDaySunny, WiCloud } from "react-icons/wi";
import { MdOutlineArticle, MdFavorite, MdSearch } from "react-icons/md";

export default function Header({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [menuOpen] = useState(false);
  const [city, setCity] = useState("Porto Alegre");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    onSearch(city);
    setLoading(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menu"
        >
          <span />
          <span />
          <span />
        </button> */}
        <span className={styles.logoTextLetra}>C</span>
        <span className={styles.logoText}>lima</span>
        <span className={styles.logoTextLetra}>M</span>
        <span className={styles.logoText}>undo</span>
        {menuOpen && (
          <nav className={styles.menu}>
            <button>
              <WiDaySunny size={50} color="#f0d800" /> Previsão
            </button>
            <button>
              <WiCloud size={50} color="#0010f0" /> Clima
            </button>
            <button>
              <MdOutlineArticle size={50} color="#02b698" /> Notícias
            </button>
            <button>
              <MdFavorite size={50} color="#ff0000" /> Favoritos
            </button>
          </nav>
        )}
      </div>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque por uma cidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" aria-label="Buscar">
          <MdSearch size={20} />
        </button>
      </form>
      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
    </header>
  );
}
