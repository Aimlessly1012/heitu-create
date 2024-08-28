import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { toCamelCase, toPascalCase } from "../utils/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileTsName = "index.tsx";
const fileDName = "interface.d.ts";

function createTsx(folderName, styleType) {
  // 创建文件夹
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Folder '${folderName}' created.`);
  } else {
    console.log(`Folder '${folderName}' already exists.`);
  }
  // 生成 大驼峰 名称
  const capName = toPascalCase(folderName);
  // 生成 小驼峰 名称
  const camelName = toCamelCase(folderName);

  // tsx
  // tsx 文件模板读取
  const templateTsxPath = path.join(
    __dirname,
    "../templates/module.template.tsx"
  );
  // tsx 文件内容
  const templateTsxContent = fs.readFileSync(templateTsxPath, "utf8");
  // tsx 内容生成
  const resultTsxContent = templateTsxContent
    .replace(/\$\{capName\}/g, capName)
    .replace(/\$\{camelName\}/g, camelName)
    .replace(/\$\{styleType\}/g, styleType);
  // 生成 .tsx 文件路径
  const fileTsPath = path.join(folderName, fileTsName);
  fs.writeFileSync(fileTsPath, resultTsxContent);

  // style
  // 根据样式类型 生成  样式文件名
  if (!!styleType && styleType !== "tailwind") {
    // 样式 文件模板读取
    const templateStylePath = path.join(__dirname, "../templates/style.module");
    // 样式 文件内容
    const templateStyleContent = fs.readFileSync(templateStylePath, "utf8");
    // 样式 内容生成
    const resultStyleContent = templateStyleContent.replace(
      /\$\{camelName\}/g,
      camelName
    );
    // 生成 样式 文件路径
    const fileStylePath = path.join(folderName, `style.module.${styleType}`);
    fs.writeFileSync(fileStylePath, resultStyleContent);
  }

  // interface

  // interface 文件模板读取
  const templateInterfacePath = path.join(
    __dirname,
    "../templates/interface.d.ts"
  );
  // interface 文件内容
  const templateInterfaceContent = fs.readFileSync(
    templateInterfacePath,
    "utf8"
  );
  // interface 内容生成
  const resultInterfaceContent = templateInterfaceContent.replace(
    /\$\{capName\}/g,
    capName
  );
  // 生成 .interface 文件路径
  const fileInterfacePath = path.join(folderName, fileDName);
  fs.writeFileSync(fileInterfacePath, resultInterfaceContent);
}

export default createTsx;
