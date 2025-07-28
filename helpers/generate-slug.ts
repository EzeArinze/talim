import slugify from "slugify";

export function GenerateSlug(value: string) {
  const slug = slugify(value);
  return slug;
}
