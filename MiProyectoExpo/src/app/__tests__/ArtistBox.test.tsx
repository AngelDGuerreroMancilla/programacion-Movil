import React from "react";
import { render, screen } from "@testing-library/react-native";
import ArtistBox from "../components/ArtistBox";
import { Artist } from "../types/artist";

describe("ArtistBox", () => {
  const mockArtist: Artist = {
    id: 1,
    name: "Bad Bunny",
    image: "https://example.com/artist.jpg",
  };

  it("renders artist name and image", async () => {
    await render(<ArtistBox artist={mockArtist} />);

    expect(screen.getByText("Bad Bunny")).toBeTruthy();
    const image = screen.getByTestId("artist-image");
    expect(image.props.source).toEqual({ uri: "https://example.com/artist.jpg" });
  });
});
