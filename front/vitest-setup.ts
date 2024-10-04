import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

const mockedUseRouter = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => mockedUseRouter,
  usePathname: vi.fn().mockReturnValue("/some-route"),
}));