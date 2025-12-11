/**
 * Standardized spacing constants for consistent layout
 */
export const SPACING = {
  section: {
    py: "py-16 lg:py-20",
    pySmall: "py-12 lg:py-16",
    pyLarge: "py-20 lg:py-28",
  },
  container: {
    px: "px-4 sm:px-6 lg:px-8",
    maxWidth: "max-w-7xl",
  },
  gap: {
    small: "gap-3",
    medium: "gap-6 lg:gap-8",
    large: "gap-10 lg:gap-16",
    grid: "gap-6 lg:gap-8",
  },
  card: {
    padding: "p-6 lg:p-8",
    paddingLarge: "p-8 lg:p-12",
    paddingXL: "p-10 lg:p-14",
  },
} as const;

