import React from "react";
import { render, screen } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import Detail from "../detail";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

describe("Detail Screen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders artist name, image, and id from search params", async () => {
    jest.mocked(useLocalSearchParams).mockReturnValue({
      id: "42",
      name: "Soda Stereo",
      image: "https://example.com/soda.jpg",
    });

    await render(<Detail />);

    expect(screen.getByTestId("detail-artist-name").props.children).toBe("Soda Stereo");
    expect(screen.getByTestId("detail-artist-id")).toBeTruthy();
    expect(screen.getByTestId("detail-artist-image").props.source).toEqual({
      uri: "https://example.com/soda.jpg",
    });
  });

  it("falls back to default image and name when params are missing", async () => {
    jest.mocked(useLocalSearchParams).mockReturnValue({});

    await render(<Detail />);

    expect(screen.getByTestId("detail-artist-name").props.children).toBe(
      "Artista desconocido"
    );
    expect(screen.queryByTestId("detail-artist-id")).toBeNull();
    expect(screen.getByTestId("detail-artist-image").props.source).toBeDefined();
  });
});
