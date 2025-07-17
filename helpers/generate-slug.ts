import slugify from "slugify";

export function GenerateSlug(value: string) {
  const slug = slugify(value);
  return slug;
}

// function handleGenerateSlug() {
//   const slugValue = form.getValues("name");
//   const slug = slugify(slugValue);
//   form.setValue("slug", testSlug, { shouldValidate: true });
// }
