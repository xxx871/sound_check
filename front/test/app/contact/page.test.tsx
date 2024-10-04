import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from '@/app/contact/page';


describe('Contact', () => {
  test('Contact component renders correctly', () => {
    render(<Contact />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });
});
