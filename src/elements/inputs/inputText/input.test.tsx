import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Input from "./input";

const onChange = jest.fn();

describe("Input component", () => {
  it("renders input component", () => {
    render(<Input message="input" name="genres" inputType="radio" value="value" onChange={onChange} />);
    expect(screen.getByText(/input/i)).toBeInTheDocument();
  });

  it("renders without message", () => {
    render(
      <Input
        message="input"
        name="genres"
        inputType="radio"
        value="value"
        onChange={onChange}
        inputPlaceHolder="search"
      />
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("onChange works", () => {
    render(
      <Input
        message="input"
        name="genres"
        inputType="radio"
        value="value"
        onChange={onChange}
        inputPlaceHolder="library"
      />
    );
    userEvent.type(screen.getByPlaceholderText(/library/i), "React");
    expect(onChange).toHaveBeenCalled();
  });
});
