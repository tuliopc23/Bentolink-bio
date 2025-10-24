declare module "bun:test" {
	type TestCallback = () => void | Promise<void>;

	export function describe(name: string, callback: TestCallback): void;
	export function it(name: string, callback: TestCallback): void;
	export function expect<T>(value: T): {
		toContain(expected: unknown): void;
		toBe(expected: unknown): void;
		toMatch(expected: string | RegExp): void;
		toBeLessThanOrEqual(expected: number): void;
	};
}
