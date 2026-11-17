import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import Home from "../home";
import { getMusicData } from "../api-client";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../api-client", () => ({
  getMusicData: jest.fn(),
}));

describe("Home Screen", () => {
  beforeEach(() => {
    jest.mocked(useRouter).mockReturnValue({
      push: jest.fn(),
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and renders artists on mount", async () => {
    jest.mocked(getMusicData).mockResolvedValue([
      { id: 1, name: "Shakira", image: "https://example.com/shakira.jpg" },
      { id: 2, name: "Juanes", image: "https://example.com/juanes.jpg" },
    ]);

    await render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Shakira")).toBeTruthy();
      expect(screen.getByText("Juanes")).toBeTruthy();
    });
    expect(getMusicData).toHaveBeenCalledTimes(1);
  });
});
