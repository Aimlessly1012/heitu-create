import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { toPascalCase, toCamelCase } from "../utils/index.mjs";

const fileTsName = "index.tsx";
const fileDName = "interface.d.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createHook(folderName) {

  folderName = folderName.startsWith("use")
    ? folderName
    : `use${toPascalCase(folderName)}`;

  // 创建文件夹
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Folder '${folderName}' created.`);
  } else {
    console.log(`Folder'${folderName}' already exists.`);
  }
  // 生成 大驼峰 名称
  const capName = toPascalCase(folderName);

  // ts
  // ts 文件模板读取
  const templateTsPath = path.join(__dirname, "../templates/hook.template.ts");
  // tsx 文件内容
  const templateTsContent = fs.readFileSync(templateTsPath, "utf8");
  // tsx 内容生成
  const resultTsContent = templateTsContent.replace(
    /\$\{capName\}/g,
    folderName
  );
  // 生成 .tsx 文件路径
  const fileTsPath = path.join(folderName, fileTsName);
  fs.writeFileSync(fileTsPath, resultTsContent);

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
export default createHook;
