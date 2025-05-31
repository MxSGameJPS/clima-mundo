import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsFeed from "./index";

// Mock para a função fetchNews
jest.mock("@/lib/fetchNews", () => ({
  fetchNews: jest.fn(() =>
    Promise.resolve({
      status: "ok",
      totalResults: 2,
      articles: [
        {
          source: { id: "globo", name: "G1 - Globo" },
          author: "Redação G1",
          title: "Notícia de teste 1",
          description: "Descrição da notícia de teste 1",
          url: "https://g1.globo.com/teste1",
          urlToImage: "https://exemplo.com/imagem1.jpg",
          publishedAt: "2023-05-31T10:30:00Z",
          content: "Conteúdo da notícia de teste 1",
        },
        {
          source: { id: "folha", name: "Folha de São Paulo" },
          author: "Equipe Folha",
          title: "Notícia de teste 2",
          description: "Descrição da notícia de teste 2",
          url: "https://folha.uol.com.br/teste2",
          urlToImage: "https://exemplo.com/imagem2.jpg",
          publishedAt: "2023-05-30T14:20:00Z",
          content: "Conteúdo da notícia de teste 2",
        },
      ],
    })
  ),
}));

// Necessário para componentes que usam o hook useEffect
beforeEach(() => {
  jest.clearAllMocks();
});

describe("NewsFeed Component", () => {
  test("renderiza corretamente o título e os artigos", async () => {
    render(<NewsFeed />);

    // Verifica se o título do componente está presente
    expect(screen.getByText(/Notícias do Brasil/i)).toBeInTheDocument();

    // Verifica se os artigos são exibidos após o carregamento
    const title1 = await screen.findByText("Notícia de teste 1");
    const title2 = await screen.findByText("Notícia de teste 2");

    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });
  test("permite mudar a categoria de notícias", async () => {
    // Importa o módulo mockado no topo do arquivo, não precisa do require aqui
    const { fetchNews } = jest.requireMock("@/lib/fetchNews");
    render(<NewsFeed />);

    // Encontra e clica no botão de categoria "Política"
    const politicaButton = await screen.findByText("Política");
    fireEvent.click(politicaButton);

    // Verifica se a função fetchNews foi chamada com o parâmetro correto
    expect(fetchNews).toHaveBeenCalledWith("política");
  });
});
