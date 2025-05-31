import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./index";

// Mock para os dados de clima
const mockWeatherData = {
  location: {
    name: "São Paulo",
    region: "São Paulo",
    country: "Brazil",
    localtime: "2023-05-31 14:30",
  },
  current: {
    temp_c: 25,
    condition: {
      text: "Ensolarado",
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    },
    feelslike_c: 26,
    humidity: 60,
    wind_kph: 10,
    wind_dir: "N",
    pressure_mb: 1012,
    precip_mm: 0,
    cloud: 10,
    uv: 6,
  },
  forecast: {
    forecastday: [
      {
        date: "2023-05-31",
        day: {
          maxtemp_c: 28,
          mintemp_c: 18,
          totalprecip_mm: 0,
          avghumidity: 65,
          daily_chance_of_rain: 10,
        },
        astro: {
          sunrise: "06:45 AM",
          sunset: "05:30 PM",
        },
        hour: [
          {
            time: "2023-05-31 00:00",
            temp_c: 20,
            condition: {
              text: "Parcialmente nublado",
              icon: "//cdn.weatherapi.com/weather/64x64/night/116.png",
            },
          },
          // Adicione mais horas conforme necessário para o teste
        ],
      },
    ],
  },
};

describe("Card Component", () => {
  test("renderiza corretamente os dados do clima", () => {
    render(<Card weatherData={mockWeatherData} />);

    // Verifica se o nome da cidade está sendo exibido
    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument();

    // Verifica se a temperatura atual está sendo exibida
    expect(screen.getByText(/25°C/i)).toBeInTheDocument();

    // Verifica se a condição climática está sendo exibida
    expect(screen.getByText(/Ensolarado/i)).toBeInTheDocument();

    // Verifica se as temperaturas máxima e mínima estão sendo exibidas
    expect(screen.getByText(/28°C/i)).toBeInTheDocument();
    expect(screen.getByText(/18°C/i)).toBeInTheDocument();
  });

  test("renderiza informações de umidade e vento", () => {
    render(<Card weatherData={mockWeatherData} />);

    // Verifica se a umidade está sendo exibida
    expect(screen.getByText(/60%/i)).toBeInTheDocument();

    // Verifica se a velocidade do vento está sendo exibida
    expect(screen.getByText(/10 km\/h/i)).toBeInTheDocument();
  });
});
