"use client";

import styles from "./Card.module.css";
import type { CardProps } from "@/types/card";
import {
  WiSunrise,
  WiSunset,
  WiRain,
  WiThermometer,
  WiRaindrop,
  WiStrongWind,
  WiHumidity,
  WiDaySunny,
  WiDayCloudy,
  WiNightClear,
  WiNightAltCloudy,
} from "react-icons/wi";
import { MdLocationOn, MdArrowBack } from "react-icons/md";
import Image from "next/image";

export default function Card({
  cidade,
  data,
  resumo,
  tempMin,
  tempMax,
  chuva,
  vento,
  umidade,
  nascerSol,
  porSol,
  arcoIris,
  periodos,
  hourly,
  onVoltar,
}: CardProps) {
  return (
    <div className={styles.card}>
      <button onClick={onVoltar} className={styles.backButton}>
        <MdArrowBack size={20} />
        <span>Voltar às notícias</span>
      </button>
      <div className={styles.header}>
        <span className={styles.title}>
          <b>
            Previsão para Hoje {data} em {cidade}
          </b>
          <MdLocationOn size={20} color="#073fda" />
        </span>
      </div>
      <div className={styles.resumo}>{resumo}</div>
      <div className={styles.periodos}>
        {periodos.map((p) => (
          <div key={p.label} className={styles.periodo}>
            {p.label === "Madrugada" && <WiNightClear size={32} />}
            {p.label === "Manhã" && <WiDaySunny size={32} />}
            {p.label === "Tarde" && <WiDayCloudy size={32} />}
            {p.label === "Noite" && <WiNightAltCloudy size={32} />}
            <span>{p.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.infoGrid}>
        <div>
          <WiThermometer size={24} className={styles.infoIcon} />
          Temperatura <br />
          <b>
            {tempMin}°C - {tempMax}°C
          </b>
        </div>
        <div>
          <WiRaindrop size={24} className={styles.infoIcon} />
          Chuva <br />
          <b>{chuva}</b>
        </div>
        <div>
          <WiStrongWind size={24} className={styles.infoIcon} />
          Vento <br />
          <b>{vento}</b>
        </div>
        <div>
          <WiHumidity size={24} className={styles.infoIcon} />
          Umidade <br />
          <b>{umidade}</b>
        </div>
        <div>
          <WiSunrise size={24} className={styles.infoIcon} />
          Nascer do Sol <br />
          <b>{nascerSol}</b>
        </div>
        <div>
          <WiSunset size={24} className={styles.infoIcon} />
          Por do Sol <br />
          <b>{porSol}</b>
        </div>{" "}
        <div>
          <WiRain size={24} className={styles.infoIcon} />
          Arco-íris <br />
          <b>{arcoIris}</b>
        </div>
      </div>
      <div className={styles.chartTitle}>
        Clima e previsão do tempo hora a hora
      </div>
      <div className={styles.hourlyChart}>
        {hourly.map((h) => (
          <div key={h.hour} className={styles.hourBlock}>
            <span className={styles.hourTemp}>{h.temp}°C</span>{" "}
            <Image
              src={h.icon}
              alt={`Clima às ${h.hour}`}
              className={styles.hourIcon}
              width={40}
              height={40}
              unoptimized // As imagens são do servidor da API e são pequenas
            />
            <span className={styles.hourLabel}>{h.hour}</span>
          </div>
        ))}
      </div>
      <div className={styles.tabs}>
        <button className={styles.active}>{cidade}</button>
      </div>
    </div>
  );
}
