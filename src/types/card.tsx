export interface HourlyData {
  hour: string;
  temp: number;
  icon: string;
}

export interface CardProps {
  cidade: string;
  data: string;
  resumo: string;
  tempMin: number;
  tempMax: number;
  chuva: string;
  vento: string;
  umidade: string;
  nascerSol: string;
  porSol: string;
  arcoIris: string;
  periodos: { label: string; icon: string }[];
  hourly: HourlyData[];
  onVoltar?: () => void; // Função opcional para voltar à tela de notícias
}
