import { render, screen } from "@testing-library/react";
import Modal from "../Modal";

test("renders modal when open", () => {
  render(<Modal open={true} />);
  const modalElement = screen.getByTestId("modal_container");
  expect(modalElement).toBeInTheDocument();
});

test("doesn't render modal when false", () => {
  render(<Modal open={false} />);
  const modalElement = screen.queryByText("Modal Title");
  expect(modalElement).not.toBeInTheDocument();
});
