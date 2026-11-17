import { getMusicData } from "../api-client";

describe("getMusicData (api-client)", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("fetches top artists and maps id, name, and image", async () => {
    const mockResponse = {
      topartists: {
        artist: [
          {
            mbid: "mbid-1",
            name: "Rosalía",
            image: [{ "#text": "https://example.com/rosalia.jpg" }],
          },
          {
            mbid: "mbid-2",
            name: "C. Tangana",
            image: [{ "#text": "https://example.com/ctangana.jpg" }],
          },
        ],
      },
    };

    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    } as unknown as Response);

    const artists = await getMusicData();

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(artists).toEqual([
      {
        id: "mbid-1",
        name: "Rosalía",
        image: "https://example.com/rosalia.jpg",
      },
      {
        id: "mbid-2",
        name: "C. Tangana",
        image: "https://example.com/ctangana.jpg",
      },
    ]);
  });
});
