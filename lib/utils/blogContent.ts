export const BLOG_HEADING_LEVELS = ['h1', 'h2', 'h3'] as const;
export const BLOG_IMAGE_POSITIONS = ['before', 'after'] as const;
export const BLOG_SECTION_LAYOUTS = ['stacked', 'image-left', 'image-right'] as const;

export type BlogHeadingLevel = (typeof BLOG_HEADING_LEVELS)[number];
export type BlogImagePosition = (typeof BLOG_IMAGE_POSITIONS)[number];
export type BlogSectionLayout = (typeof BLOG_SECTION_LAYOUTS)[number];

export interface BlogSection {
  id: string;
  heading: string;
  headingLevel: BlogHeadingLevel;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imagePosition: BlogImagePosition;
  layout: BlogSectionLayout;
}

export class BlogContentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BlogContentValidationError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeString(
  value: unknown,
  fieldName: string,
  { trim = false }: { trim?: boolean } = {}
): string {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') {
    throw new BlogContentValidationError(`${fieldName} must be a string`);
  }
  return trim ? value.trim() : value;
}

/**
 * Convert untrusted request data into the exact shape stored by the blog model.
 * Missing optional fields get stable defaults; malformed arrays and enum values
 * are rejected so files cannot be mapped to the wrong section.
 */
export function normalizeBlogSections(value: unknown): BlogSection[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    throw new BlogContentValidationError('sections must be an array');
  }

  const seenIds = new Set<string>();

  return value.map((rawSection, index) => {
    if (!isRecord(rawSection)) {
      throw new BlogContentValidationError(`sections[${index}] must be an object`);
    }

    const id = normalizeString(rawSection.id, `sections[${index}].id`, { trim: true });
    if (!id) {
      throw new BlogContentValidationError(`sections[${index}].id is required`);
    }
    if (seenIds.has(id)) {
      throw new BlogContentValidationError(`sections contains duplicate id "${id}"`);
    }
    seenIds.add(id);

    const rawHeadingLevel = rawSection.headingLevel ?? 'h2';
    if (
      typeof rawHeadingLevel !== 'string' ||
      !BLOG_HEADING_LEVELS.includes(rawHeadingLevel as BlogHeadingLevel)
    ) {
      throw new BlogContentValidationError(
        `sections[${index}].headingLevel must be h1, h2, or h3`
      );
    }

    const rawImagePosition = rawSection.imagePosition ?? 'after';
    if (
      typeof rawImagePosition !== 'string' ||
      !BLOG_IMAGE_POSITIONS.includes(rawImagePosition as BlogImagePosition)
    ) {
      throw new BlogContentValidationError(
        `sections[${index}].imagePosition must be before or after`
      );
    }

    const rawLayout = rawSection.layout ?? 'stacked';
    if (
      typeof rawLayout !== 'string' ||
      !BLOG_SECTION_LAYOUTS.includes(rawLayout as BlogSectionLayout)
    ) {
      throw new BlogContentValidationError(
        `sections[${index}].layout must be stacked, image-left, or image-right`
      );
    }

    return {
      id,
      heading: normalizeString(rawSection.heading, `sections[${index}].heading`),
      headingLevel: rawHeadingLevel as BlogHeadingLevel,
      description: normalizeString(
        rawSection.description,
        `sections[${index}].description`
      ),
      image: normalizeString(rawSection.image, `sections[${index}].image`, { trim: true }),
      imageAlt: normalizeString(rawSection.imageAlt, `sections[${index}].imageAlt`),
      imageCaption: normalizeString(
        rawSection.imageCaption,
        `sections[${index}].imageCaption`
      ),
      imagePosition: rawImagePosition as BlogImagePosition,
      layout: rawLayout as BlogSectionLayout,
    };
  });
}

/** Extract image sources from legacy rich-text HTML without requiring a DOM. */
export function extractBlogContentImageUrls(content: unknown): string[] {
  if (typeof content !== 'string' || !content) return [];

  const urls: string[] = [];
  const imageSourcePattern =
    /<img\b[^>]*?\s+src\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;

  let match: RegExpExecArray | null;
  while ((match = imageSourcePattern.exec(content)) !== null) {
    const url = (match[1] || match[2] || match[3] || '').trim();
    if (url) urls.push(url.replace(/&amp;/g, '&'));
  }

  return [...new Set(urls)];
}

/** Collect every image reference owned by a blog, including legacy inline HTML. */
export function collectBlogImageUrls(blog: {
  image?: unknown;
  sections?: unknown;
  content?: unknown;
}): string[] {
  const urls: string[] = [];

  if (typeof blog.image === 'string' && blog.image.trim()) {
    urls.push(blog.image.trim());
  }

  if (Array.isArray(blog.sections)) {
    for (const section of blog.sections) {
      if (!isRecord(section)) continue;
      if (typeof section.image === 'string' && section.image.trim()) {
        urls.push(section.image.trim());
      }
    }
  }

  urls.push(...extractBlogContentImageUrls(blog.content));
  return [...new Set(urls)];
}
