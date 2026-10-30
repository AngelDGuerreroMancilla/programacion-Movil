import { Alert } from "react-native";
import { render, fireEvent, screen } from "@testing-library/react-native";
import Register from "../register";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("Register Screen (Práctica R4)", () => {
  let alertSpy: jest.SpyInstance;
  const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    mockPush.mockClear();
    mockBack.mockClear();

    jest.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: mockBack,
      canGoBack: jest.fn().mockReturnValue(true),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders all required fields and buttons", async () => {
    await render(<Register />);
    expect(screen.getByText("Registro")).toBeTruthy();
    expect(screen.getByPlaceholderText("Correo electrónico")).toBeTruthy();
    expect(screen.getByPlaceholderText("Nombre de usuario")).toBeTruthy();
    expect(screen.getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(screen.getByPlaceholderText("Confirmar contraseña")).toBeTruthy();
    expect(screen.getByText("Registrarse")).toBeTruthy();
    expect(screen.getByText("Atrás")).toBeTruthy();
  });

  it("has secure text entry for both password fields", async () => {
    await render(<Register />);
    expect(screen.getByPlaceholderText("Contraseña").props.secureTextEntry).toBe(true);
    expect(screen.getByPlaceholderText("Confirmar contraseña").props.secureTextEntry).toBe(true);
  });

  it("shows alert when fields are empty", async () => {
    await render(<Register />);
    await fireEvent.press(screen.getByText("Registrarse"));
    expect(alertSpy).toHaveBeenCalledWith("Error", "Los campos están vacíos");
  });

  it("shows alert when passwords do not match", async () => {
    await render(<Register />);
    await fireEvent.changeText(screen.getByPlaceholderText("Correo electrónico"), "user@test.com");
    await fireEvent.changeText(screen.getByPlaceholderText("Nombre de usuario"), "usuario1");
    await fireEvent.changeText(screen.getByPlaceholderText("Contraseña"), "Password1!");
    await fireEvent.changeText(screen.getByPlaceholderText("Confirmar contraseña"), "Password2@");
    await fireEvent.press(screen.getByText("Registrarse"));
    expect(alertSpy).toHaveBeenCalledWith("Error", "Los campos de contraseña deben coincidir");
  });

  it("shows alert when email format is invalid", async () => {
    await render(<Register />);
    await fireEvent.changeText(screen.getByPlaceholderText("Correo electrónico"), "correo-invalido");
    await fireEvent.changeText(screen.getByPlaceholderText("Nombre de usuario"), "usuario1");
    await fireEvent.changeText(screen.getByPlaceholderText("Contraseña"), "Password1!");
    await fireEvent.changeText(screen.getByPlaceholderText("Confirmar contraseña"), "Password1!");
    await fireEvent.press(screen.getByText("Registrarse"));
    expect(alertSpy).toHaveBeenCalledWith("Error", "Correo inválido");
  });

  it("shows alert when password is too weak", async () => {
    await render(<Register />);
    await fireEvent.changeText(screen.getByPlaceholderText("Correo electrónico"), "user@test.com");
    await fireEvent.changeText(screen.getByPlaceholderText("Nombre de usuario"), "usuario1");
    await fireEvent.changeText(screen.getByPlaceholderText("Contraseña"), "pass");
    await fireEvent.changeText(screen.getByPlaceholderText("Confirmar contraseña"), "pass");
    await fireEvent.press(screen.getByText("Registrarse"));
    expect(alertSpy).toHaveBeenCalledWith(
      "Error",
      "La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y 1 carácter especial"
    );
  });

  it("navigates to Index when all validations pass", async () => {
    await render(<Register />);
    await fireEvent.changeText(screen.getByPlaceholderText("Correo electrónico"), "user@test.com");
    await fireEvent.changeText(screen.getByPlaceholderText("Nombre de usuario"), "usuario1");
    await fireEvent.changeText(screen.getByPlaceholderText("Contraseña"), "Password1!");
    await fireEvent.changeText(screen.getByPlaceholderText("Confirmar contraseña"), "Password1!");
    await fireEvent.press(screen.getByText("Registrarse"));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/logIn",
    });
  });

  it("navigates back when Atrás is pressed", async () => {
    await render(<Register />);
    await fireEvent.press(screen.getByText("Atrás"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
