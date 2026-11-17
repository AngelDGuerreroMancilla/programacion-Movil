import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import ArtistList from "../components/ArtistList";
import { Artist } from "../types/artist";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("ArtistList", () => {
  const mockPush = jest.fn();

  const artists: Artist[] = [
    { id: 1, name: "Artista Uno", image: "https://example.com/1.jpg" },
    { id: 2, name: "Artista Dos", image: "https://example.com/2.jpg" },
  ];

  beforeEach(() => {
    mockPush.mockClear();
    jest.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as any);
  });

  it("renders all artists in the list", async () => {
    await render(<ArtistList artists={artists} />);

    expect(screen.getByText("Artista Uno")).toBeTruthy();
    expect(screen.getByText("Artista Dos")).toBeTruthy();
  });

  it("navigates to detail with artist params when pressed", async () => {
    await render(<ArtistList artists={artists} />);

    await fireEvent.press(screen.getByTestId("artist-box-Artista Uno"));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/detail",
      params: {
        id: 1,
        name: "Artista Uno",
        image: "https://example.com/1.jpg",
      },
    });
  });
});
