import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "../Pagination";

describe("Pagination", () => {
  it("does not render when totalPages is 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders page numbers correctly", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onPageChange when page number is clicked", () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("2"));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("disables Prev button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
    );

    expect(screen.getByText("Prev")).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={() => {}} />
    );

    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("navigates using Prev and Next", () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("Prev"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
