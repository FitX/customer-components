export const getMarkdownDocsTranslationBlock = (contentGer: string, contentEn: string) => {
  if (!contentEn || !contentEn) return contentEn || contentGer;
  return `
<details open>
<summary>de</summary>
${contentGer}
</details>
<details>
<summary>en</summary>
${contentEn}
</details>
  `;
};
