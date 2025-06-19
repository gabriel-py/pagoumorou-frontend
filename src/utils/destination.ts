type NominatimResult = {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
    address: {
      country_code: string;
      [key: string]: any;
    };
    boundingbox: [string, string, string, string];
};

export async function fetchBrazilianLocations(query: string): Promise<NominatimResult[]> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'PagouMorou/1.0 (gabrielgoncalves310503@gmail.com)',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const results: NominatimResult[] = await response.json();

      const brazilResults = results.filter((item) => item.address.country_code === "br");

      return brazilResults;
    } catch (error) {
      console.error("Erro ao buscar localizações:", error);
      return [];
    }
}
