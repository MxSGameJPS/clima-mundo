"use client";

import { useState, useEffect } from "react";
import { fetchNews } from "@/lib/fetchNews";
import { NewsArticle } from "@/types/newsAPI";
import styles from "./NewsFeed.module.css";
import Image from "next/image";
import {
  FaNewspaper,
  FaExternalLinkAlt,
  FaClock,
  FaImage,
} from "react-icons/fa";

export default function NewsFeed() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("geral");

  const categories = [
    { id: "geral", label: "Geral" },
    { id: "política", label: "Política" },
    { id: "economia", label: "Economia" },
    { id: "saúde", label: "Saúde" },
    { id: "tecnologia", label: "Tecnologia" },
    { id: "esporte", label: "Esporte" },
    { id: "meio ambiente", label: "Meio Ambiente" },
  ];
  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError("");      try {
        const data = await fetchNews(category);

        if (!data || !data.articles || data.articles.length === 0) {
          throw new Error("Nenhuma notícia encontrada");
        } 
        
        // Garantimos que todos os artigos tenham pelo menos uma URL e título
        const validArticles = data.articles.filter(
          (article) => article.url && article.title
        );

        setNews(validArticles.slice(0, 12)); // Aumentado de 6 para 12 notícias
      } catch (err) {
        // Verificar mensagem de erro específica sobre a chave da API
        const errorMessage = err instanceof Error ? err.message : String(err);

        if (errorMessage.includes("Chave da API inválida")) {
          setError(
            "Sua chave da API de notícias expirou. Para usar esta funcionalidade, é necessário obter uma nova chave da NewsAPI."
          );
        } else {
          setError(
            "Não foi possível carregar as notícias. Tente novamente mais tarde."
          );
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category]);

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          <FaNewspaper className={styles.titleIcon} />
          Notícias pelo Mundo
        </h2>
        <div className={styles.errorMessage}>
          <p>{error}</p>{" "}
          {error.includes("chave") && (
            <p className={styles.apiHelp}>
              Para obter uma nova chave, visite{" "}
              <a
                href="https://open-platform.theguardian.com/access/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.apiLink}
              >
                open-platform.theguardian.com/access/
              </a>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaNewspaper className={styles.titleIcon} />
          Notícias pelo Mundo
        </h2>

        <div className={styles.categoryFilter}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryButton} ${
                category === cat.id ? styles.active : ""
              }`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {news.length === 0 ? (
        <p className={styles.noNews}>Nenhuma notícia disponível no momento.</p>
      ) : (
        <div className={styles.newsGrid}>
          {news.map((article, index) => (
            <div key={index} className={styles.newsCard}>
              {" "}
              {article.urlToImage && (
                <div className={styles.imageContainer}>
                  {" "}
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    className={styles.newsImage}
                    width={600}
                    height={400}
                    unoptimized
                  />
                </div>
              )}{" "}
              {!article.urlToImage && (
                <div className={styles.imageContainer}>
                  <div className={styles.placeholderImage}>
                    <FaImage size={40} color="#ccc" />
                    <p>Imagem não disponível</p>
                  </div>
                </div>
              )}
              <div className={styles.contentContainer}>
                <h3 className={styles.newsTitle}>{article.title}</h3>
                <p className={styles.newsSource}>
                  {article.source.name}
                  <span className={styles.newsDate}>
                    <FaClock className={styles.clockIcon} />
                    {formatDate(article.publishedAt)}
                  </span>
                </p>
                {article.description && (
                  <p className={styles.newsDescription}>
                    {article.description}
                  </p>
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readMore}
                >
                  Leia mais <FaExternalLinkAlt className={styles.linkIcon} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className={styles.attribution}>Notícias fornecidas por NewsAPI.org</p>
    </div>
  );
}
