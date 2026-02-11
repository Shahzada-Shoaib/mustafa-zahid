/**
 * Standardized spacing constants for consistent layout
 */
export const SPACING = {
  section: {
    py: "py-8 sm:py-12 lg:py-16 xl:py-20",
    pySmall: "py-6 sm:py-8 lg:py-12 xl:py-16",
    pyLarge: "py-12 sm:py-16 lg:py-20 xl:py-28",
  },
  container: {
    px: "px-4 sm:px-6 lg:px-8 xl:px-12",
    maxWidth: "max-w-7xl",
  },
  gap: {
    small: "gap-3 sm:gap-4",
    medium: "gap-4 sm:gap-6 lg:gap-8",
    large: "gap-6 sm:gap-8 lg:gap-10 xl:gap-16",
    grid: "gap-4 sm:gap-6 lg:gap-8",
  },
  card: {
    padding: "p-4 sm:p-6 lg:p-8",
    paddingLarge: "p-6 sm:p-8 lg:p-12",
    paddingXL: "p-8 sm:p-10 lg:p-14",
  },
} as const;

