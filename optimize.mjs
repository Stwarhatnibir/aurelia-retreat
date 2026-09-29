import sharp from "sharp";
import { readdirSync, mkdirSync } from "fs";

const input = "originals";
const output = "public/images";
mkdirSync(output, { recursive: true });

const widthFor = (file) => {
  if (file.startsWith("hero")) return 2000;
  if (file.startsWith("about")) return 1100;
  if (file.startsWith("room")) return 900;
  if (file === "gallery1.jpg") return 1400; // the large one
  return 900;
};

for (const file of readdirSync(input)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = file.replace(/\.(jpe?g|png)$/i, ".webp");

  await sharp(`${input}/${file}`)
    .resize({ width: widthFor(file), withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(`${output}/${name}`);

  console.log("Done:", name);
}
