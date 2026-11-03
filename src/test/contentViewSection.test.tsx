import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ContentViewSection from "@/components/admin/ContentViewSection";

const fixtures = [
  "/product/dishwasher/feature/1",
  "/product/cooking/feature/1",
  "/subscription",
  "/subscription",
].map(path => ({ store_id: "GSB", store_name: "강서본점", path, created_at: new Date().toISOString() }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({ select: () => ({ or: () => ({ order: () => ({
      range: async () => ({ data: fixtures, error: null }),
    }) }) }) }),
  },
}));

describe("content view filters and totals", () => {
  it("merges aliases and counts subscription records in the selected product", async () => {
    render(<ContentViewSection />);
    await waitFor(() => expect(screen.getAllByRole("row")).toHaveLength(3));
    const rows = screen.getAllByRole("row").slice(1);
    expect(rows.map(row => row.querySelector("td:last-child")?.textContent)).toEqual(["2", "2"]);
    const productSelect = screen.getAllByRole("combobox").find(select =>
      select.querySelector('option[value="subscription"]'),
    );
    if (!productSelect) throw new Error("Product filter missing");
    fireEvent.change(productSelect, { target: { value: "subscription" } });
    await waitFor(() => expect(screen.getAllByRole("row")).toHaveLength(2));
    expect(screen.getAllByRole("row")[1].querySelector("td:last-child")?.textContent).toBe("2");
    fireEvent.change(productSelect, { target: { value: "cooking" } });
    expect(screen.getAllByRole("row")[1].querySelector("td:last-child")?.textContent).toBe("2");
  });
});