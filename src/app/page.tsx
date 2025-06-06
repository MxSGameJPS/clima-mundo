"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { fetchWeather } from "@/lib/fetchWeather";
import type { CardProps } from "@/types/card";
import Header from "@/components/Header";
import NewsFeed from "@/components/NewsFeed";
import styles from "./page.module.css";

export default function Home() {
  const [cardData, setCardData] = useState<CardProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(city: string) {
    setLoading(true);
    setError("");
    try {
      const weather = await fetchWeather(city);

      // Verificar se todos os dados necessários existem
      if (
        !weather ||
        !weather.location ||
        !weather.forecast ||
        !weather.forecast.forecastday ||
        !weather.forecast.forecastday[0]
      ) {
        throw new Error("Dados incompletos da API.");
      }

      const forecastDay = weather.forecast.forecastday[0];

      // Utilizando a data atual formatada no padrão brasileiro
      const hoje = new Date();
      const formattedDate = `${hoje.getDate().toString().padStart(2, "0")}/${(
        hoje.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${hoje.getFullYear()}`;

      setCardData({
        cidade: weather.location.name,
        data: formattedDate,
        resumo: forecastDay.day.condition.text,
        tempMin: forecastDay.day.mintemp_c,
        tempMax: forecastDay.day.maxtemp_c,
        chuva: `${forecastDay.day.totalprecip_mm}mm - ${forecastDay.day.daily_chance_of_rain}%`,
        vento: `${forecastDay.day.maxwind_kph}km/h`,
        umidade: `${forecastDay.day.avghumidity}%`,
        nascerSol: forecastDay.astro.sunrise,
        porSol: forecastDay.astro.sunset,
        arcoIris:
          forecastDay.day.daily_chance_of_rain > 30 && weather.current.uv > 3
            ? "Possibilidade de formação de arco-íris"
            : "Sem probabilidade de formação de arco-íris",
        periodos: [
          { label: "Madrugada", icon: "/icons/night.png" },
          { label: "Manhã", icon: "/icons/morning.png" },
          { label: "Tarde", icon: "/icons/afternoon.png" },
          { label: "Noite", icon: "/icons/night.png" },
        ],
        hourly: forecastDay.hour.map((h) => ({
          hour: `${h.time.split(" ")[1].slice(0, 2)}h`,
          temp: Math.round(h.temp_c),
          icon: h.condition.icon.replace(/^\//, "https://"),
        })),
      });
    } catch (err) {
      setCardData(null);
      setError(
        err instanceof Error
          ? err.message
          : "Cidade não encontrada ou erro na API."
      );
    } finally {
      setLoading(false);
    }
  }
  // Função para limpar os dados do cartão e voltar para a tela de notícias
  const handleVoltar = () => {
    setCardData(null);
    setError("");
  };

  return (
    <main className={styles.main}>
      <Header onSearch={handleSearch} />
      <div className={styles.container}>
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
          </div>
        )}
        {error && <div className={styles.errorMessage}>{error}</div>}{" "}
        {cardData && <Card {...cardData} onVoltar={handleVoltar} />}
        {!cardData && !loading && !error && <NewsFeed />}
      </div>
    </main>
  );
}
