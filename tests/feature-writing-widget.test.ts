import { describe, expect, it } from "bun:test";
import { transformPosts } from "../src/components/FeatureWritingWidget";
import type { SanityPost } from "../src/services/sanity";

const buildPost = (overrides: Partial<SanityPost> = {}): SanityPost => ({
	_id: overrides._id ?? "post-1",
	title: overrides.title ?? "Toolchain Audit Notes",
	slug: overrides.slug ?? "toolchain-audit-notes",
	publishedAt: overrides.publishedAt ?? new Date().toISOString(),
	summary:
		overrides.summary ??
		"Early findings from the automation lab while refining build speeds, bundle hygiene, and DX scripts with actionable steps for the next sprint.",
	category: overrides.category ?? "Article",
});

describe("transformPosts", () => {
	it("flags recent posts and preserves metadata", () => {
		const recent = buildPost();
		const older = buildPost({
			_id: "post-older",
			publishedAt: new Date("2024-01-01").toISOString(),
		});
		const [first, second] = transformPosts([recent, older]);

		expect(first.isNew).toBe(true);
		expect(second.isNew).toBe(false);
		expect(first.readTime).toMatch(/min read$/);
		expect(first.url).toContain(recent.slug);
	});

	it("truncates long excerpts to a mobile-friendly length", () => {
		const longSummary =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque pretium accumsan. Duis sagittis, magna ut consectetur ultricies, justo lectus viverra erat, sed posuere leo augue quis justo.";
		const [{ excerpt, readTime }] = transformPosts([buildPost({ summary: longSummary })]);

		expect(excerpt.endsWith("…")).toBe(true);
		expect(excerpt.length).toBeLessThanOrEqual(181);
		expect(readTime).toMatch(/min read$/);
	});
});
