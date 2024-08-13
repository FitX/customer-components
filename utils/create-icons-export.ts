import fs from 'fs';
import path from 'path';

/* const moduleStrings = import.meta.glob('@/assets/icons/*.svg', {
  // query: '?raw',
  import: 'default',
  eager: true,
}); */

/**
 * Converts a kebab-case string to CamelCase.
 */
const toCamelCase = (str: string) => {
  return str
    .split('-') // Split by hyphens
    .map((word, index) =>
      index === 0
        ? word // Leave the first word in lowercase
        : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the first letter of subsequent words
    )
    .join(''); // Join words without separators
};

const iconsDir = path.join('src', 'assets', `icons`);
const outputFilePath = path.join('src', 'components', `icons`, 'index.ts');
/**
 * Usage: npx tsx ./utils//create-icons-export.ts
 */
const generateExports = () => {
  const files = fs.readdirSync(iconsDir);
  const svgFiles = files.filter(file => path.extname(file) === '.svg');
  const exports = svgFiles.map(file => {
    const fileName = path.basename(file, '.svg');
    const iconName = `Icon${toCamelCase(fileName).charAt(0).toUpperCase() + toCamelCase(fileName).slice(1)}`;
    return `export { default as ${iconName} } from '@/assets/icons/${file}';`;
  });
  fs.writeFileSync(outputFilePath, exports.join('\n') + '\n', 'utf8');
  console.log(`Export statements have been written to ${outputFilePath}`);
}

generateExports();
