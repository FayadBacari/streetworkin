import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form, { type OneFormInputFieldDescription } from "./form";


// Reusable fake list of input fields used by several tests in this file.
const FAKE_LIST_OF_INPUT_FIELDS: OneFormInputFieldDescription[] = [
  {
    fieldInputName: "email",
    fieldVisibleLabel: "Email",
    fieldHtmlInputType: "email",
    optionalPlaceholderText: "you@example.com",
  },
  {
    fieldInputName: "password",
    fieldVisibleLabel: "Mot de passe",
    fieldHtmlInputType: "password",
    optionalPlaceholderText: "Your password",
  },
];


describe("Form", function () {
  it("should render the form title text passed in as a prop", function () {
    render(
      <Form
        formMainTitleText="Connexion"
        listOfInputFieldsToRender={FAKE_LIST_OF_INPUT_FIELDS}
        submitButtonLabelText="Se connecter"
      />,
    );
    expect(screen.getByRole("heading", { name: /connexion/i })).toBeInTheDocument();
  });

  it("should render one input field for each entry in the input fields list", function () {
    render(
      <Form
        formMainTitleText="Connexion"
        listOfInputFieldsToRender={FAKE_LIST_OF_INPUT_FIELDS}
        submitButtonLabelText="Se connecter"
      />,
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
  });

  it("should render the submit button with the label text passed as a prop", function () {
    render(
      <Form
        formMainTitleText="Connexion"
        listOfInputFieldsToRender={FAKE_LIST_OF_INPUT_FIELDS}
        submitButtonLabelText="Se connecter"
      />,
    );
    expect(screen.getByRole("button", { name: /se connecter/i })).toBeInTheDocument();
  });

  it("should update the input value when the user types into a field", async function () {
    const userInteractionSimulator = userEvent.setup();

    render(
      <Form
        formMainTitleText="Connexion"
        listOfInputFieldsToRender={FAKE_LIST_OF_INPUT_FIELDS}
        submitButtonLabelText="Se connecter"
      />,
    );

    const emailInputField = screen.getByLabelText(/email/i) as HTMLInputElement;
    await userInteractionSimulator.type(emailInputField, "test@streetworkin.com");
    expect(emailInputField.value).toBe("test@streetworkin.com");
  });

  it("should call the optional async submit handler with the entered values when submitted", async function () {
    const userInteractionSimulator = userEvent.setup();
    const mockAsyncSubmitHandlerFunction = vi.fn().mockResolvedValue(undefined);

    render(
      <Form
        formMainTitleText="Connexion"
        listOfInputFieldsToRender={FAKE_LIST_OF_INPUT_FIELDS}
        submitButtonLabelText="Se connecter"
        optionalAsyncSubmitHandler={mockAsyncSubmitHandlerFunction}
      />,
    );

    await userInteractionSimulator.type(screen.getByLabelText(/email/i), "test@streetworkin.com");
    await userInteractionSimulator.type(screen.getByLabelText(/mot de passe/i), "secret");
    await userInteractionSimulator.click(screen.getByRole("button", { name: /se connecter/i }));

    expect(mockAsyncSubmitHandlerFunction).toHaveBeenCalledTimes(1);
    expect(mockAsyncSubmitHandlerFunction).toHaveBeenCalledWith({
      email: "test@streetworkin.com",
      password: "secret",
    });
  });

  it("should render an optional footer link when one is provided in props", function () {
    render(
      <Form
        formMainTitleText="Connexion"
        listOfInputFieldsToRender={FAKE_LIST_OF_INPUT_FIELDS}
        submitButtonLabelText="Se connecter"
        optionalFooterLinkConfig={{
          linkLabelText: "Mot de passe oublié ?",
          linkDestinationUrl: "/forgot-password",
        }}
      />,
    );
    expect(screen.getByRole("link", { name: /mot de passe oublié/i })).toBeInTheDocument();
  });
});
