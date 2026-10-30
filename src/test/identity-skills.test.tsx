import { describe, expect, it } from "vitest";

import { Route as IndexRoute, SKILLS } from "@/routes/skills";
import { Route as HomeRoute } from "@/routes/index";

type HeadRoute = {
  head: (ctx?: unknown) => { meta: Array<Record<string, string | undefined>> };
};

const metaText = (route: unknown) =>
  JSON.stringify((route as HeadRoute).head().meta);

describe("Portfolio identity", () => {
  it("names the pages after Govardhan P, not the old placeholder name", () => {
    expect(metaText(HomeRoute)).toContain("Govardhan P");
    expect(metaText(IndexRoute)).toContain("Govardhan P");
    expect(metaText(HomeRoute)).not.toContain("Gokul");
  });
});

describe("Skills page content", () => {
  it("lists every skill Govardhan asked to see", () => {
    const names = SKILLS.map((s) => s.n.toLowerCase());
    for (const want of ["python", "java", "html5", "css3", "javascript"]) {
      expect(names).toContain(want);
    }
  });

  it("keeps every proficiency level a real percentage", () => {
    for (const s of SKILLS) {
      expect(s.v).toBeGreaterThan(0);
      expect(s.v).toBeLessThanOrEqual(100);
    }
  });
});
