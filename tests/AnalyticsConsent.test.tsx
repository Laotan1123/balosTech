import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnalyticsConsent from "@/components/AnalyticsConsent";

const originalPlausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

describe("AnalyticsConsent", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = "balostech.example";
    localStorage.clear();
    document.getElementById("balostech-plausible")?.remove();
  });

  afterEach(() => {
    if (originalPlausibleDomain === undefined) {
      delete process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    } else {
      process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = originalPlausibleDomain;
    }
    delete window.plausible;
  });

  it("loads Plausible only after the visitor opts in", async () => {
    render(<AnalyticsConsent />);

    expect(await screen.findByRole("region", { name: "Analytics preferences" })).toBeInTheDocument();
    expect(document.getElementById("balostech-plausible")).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "Allow analytics" }));

    await waitFor(() => {
      expect(document.getElementById("balostech-plausible")).toHaveAttribute(
        "src",
        "https://plausible.io/js/script.js"
      );
    });
    expect(document.getElementById("balostech-plausible")).toHaveAttribute("data-domain", "balostech.example");
    expect(localStorage.getItem("balostech-analytics-consent")).toBe("accepted");
  });

  it("does not load Plausible when the visitor declines", async () => {
    render(<AnalyticsConsent />);

    await userEvent.click(await screen.findByRole("button", { name: "No thanks" }));

    expect(document.getElementById("balostech-plausible")).toBeNull();
    expect(localStorage.getItem("balostech-analytics-consent")).toBe("declined");
  });
});
