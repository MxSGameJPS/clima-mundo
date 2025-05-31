import { NewsApiResponse, GuardianResponse, NewsArticle } from "../types/newsAPI";

// API Key do The Guardian (gratuita)
const GUARDIAN_API_KEY = "aa3cd418-b61c-4b5d-9d96-979413d356c6";

// Função para mapear as categorias em português para os parâmetros da API do Guardian
const mapCategoryToApiParam = (category: string): string => {
  const categoryMap: Record<string, string> = {
    política: "politics",
    economia: "business",
    saúde: "health",
    tecnologia: "technology",
    esporte: "sport",
    "meio ambiente: ": "environment",
    geral: "news",
  };

  return categoryMap[category] || "news";
};

export const fetchNews = async (
  category?: string
): Promise<NewsApiResponse> => {
  // Configura os parâmetros da API com base na categoria
  const section =
    category && category !== "geral"
      ? mapCategoryToApiParam(category)
      : "world";

  // Parâmetros para a API do Guardian
  const params = new URLSearchParams({
    "api-key": GUARDIAN_API_KEY,
    section: section,
    "show-fields": "headline,trailText,thumbnail,byline", // Campos adicionais que queremos receber
    "page-size": "12", // Número de artigos a serem retornados
    "order-by": "newest", // Ordenar por mais recentes
  });

  // Utiliza a API do The Guardian
  const res = await fetch(
    `https://content.guardianapis.com/search?${params.toString()}`,
    {
      // Importante: define uma próxima recarga a cada 10 minutos
      next: { revalidate: 600 },
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    // Tratamento específico para erro de chave inválida
    if (
      errorData.code === "apiKeyInvalid" ||
      errorData.code === "apiKeyExhausted"
    ) {
      console.error(
        "Problema com a chave da API de notícias:",
        errorData.message
      );
      throw new Error(
        "Chave da API inválida ou excedeu o limite. Por favor, verifique sua conta NewsAPI."
      );
    }
    throw new Error(
      `Erro na resposta da API: ${errorData.message || res.status}`
    );
  }
  const guardianData: GuardianResponse = await res.json();

  // Se não houver resultados, lança um erro
  if (
    !guardianData.response ||
    !guardianData.response.results ||
    guardianData.response.results.length === 0
  ) {
    throw new Error("Nenhuma notícia encontrada");
  }

  // Converte os dados do formato Guardian para o formato que nossa aplicação espera
  const articles: NewsArticle[] = guardianData.response.results.map((item) => ({
    source: {
      id: item.sectionId,
      name: item.sectionName,
    },
    author: item.fields?.byline || null,
    title: item.webTitle,
    description: item.fields?.trailText || null,
    url: item.webUrl,
    urlToImage: item.fields?.thumbnail || null,
    publishedAt: item.webPublicationDate,
    content: item.fields?.trailText || null,
  }));

  const newsApiResponse: NewsApiResponse = {
    status: "ok",
    totalResults: guardianData.response.total,
    articles,
  };

  return newsApiResponse;
};
