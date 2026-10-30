import { Alert } from "react-native";
import { render, fireEvent, screen } from "@testing-library/react-native";
import LogIn, { isValidEmail, isValidPassword, } from "../logIn";
import { useRouter } from "expo-router";

jest.mock('expo-router',() =>({
  useRouter: jest.fn(),
}))

describe("LogIn (Login Screen)", () => {

  

  let alertSpy: jest.SpyInstance;

  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly", async () => {
    await render(<LogIn/>);
    expect(screen.getByLabelText("Imagen de logo expo"))
    expect(screen.getByText("Iniciar sesión:")).toBeTruthy();
    expect(screen.getByPlaceholderText("Correo electrónico")).toBeTruthy();
    expect(screen.getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(screen.getByText("¿Aun no tienes una cuenta?")).toBeTruthy();

  });

  it("shows alert when fields are empty", async () => {
    await render(<LogIn/>);
    await fireEvent.press(screen.getByText("Iniciar sesión"));
    expect(alertSpy).toHaveBeenCalledWith("Error", "Los campos están vacíos");
  });

  it("shows alert when only email is empty", async () => {
    await render(<LogIn/>);
    await fireEvent.changeText(
      screen.getByPlaceholderText("Contraseña"),
      "Password1!"
    );
    await fireEvent.press(screen.getByText("Iniciar sesión"));
    expect(alertSpy).toHaveBeenCalledWith("Error", "El correo está vacío");
  });

  it("shows alert when only password is empty", async () => {
    await render(<LogIn/>);
    await fireEvent.changeText(
      screen.getByPlaceholderText("Correo electrónico"),
      "test@example.com"
    );
    await fireEvent.press(screen.getByText("Iniciar sesión"));
    expect(alertSpy).toHaveBeenCalledWith("Error", "La contraseña está vacía");
  });

  it("has secure text entry for password field", async () => {
    await render(<LogIn/>);
    expect(screen.getByPlaceholderText("Contraseña").props.secureTextEntry).toBe(true);
  });

  it("has correct keyboard type for email field", async () => {
    await render(<LogIn/>);
    expect(screen.getByPlaceholderText("Correo electrónico").props.keyboardType).toBe(
      "email-address"
    );
  });

  describe("Email validation", () => {
    it("accepts valid email formats", () => {
      ["test@example.com", "user.name@domain.org", "a_b@mail.co.mx"].forEach((e) =>
        expect(isValidEmail(e)).toBe(true)
      );
    });

    it("rejects invalid email formats", () => {
      ["", "test", "test@", "@example.com", "test@example", "te st@example.com"].forEach(
        (e) => expect(isValidEmail(e)).toBe(false)
      );
    });
  });

  describe("Password validation", () => {
    it("accepts valid passwords", () => {
      ["Password1!", "Abcdef#h", "MiClave$2026"].forEach((p) =>
        expect(isValidPassword(p)).toBe(true)
      );
    });

    it("rejects passwords without uppercase", () => {
      expect(isValidPassword("password1!")).toBe(false);
    });

    it("rejects passwords without lowercase", () => {
      expect(isValidPassword("PASSWORD1!")).toBe(false);
    });

    it("rejects passwords without special characters", () => {
      expect(isValidPassword("Password123")).toBe(false);
    });

    it("rejects passwords shorter than 8 characters", () => {
      expect(isValidPassword("Pa1!")).toBe(false);
    });

    it("rejects passwords with only numbers and special characters", () => {
      expect(isValidPassword("12345678!@#")).toBe(false); 
    });
    
  });
  it("Navegar a la pantalla de registro", async () => {
    const mockPush = jest.fn();

    jest.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as any);

    await render(<LogIn />);

    await fireEvent.press(screen.getByText("Registrarse"));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/register",
    });
  });
});
