import path from "path";
import fs from "fs";
import { toCamelCase, toPascalCase } from "../utils/index.mjs";

const fileTsName = "index.tsx";
const fileDName = "interface.d.ts";
let fileScssName = "style.module";

function createTsx(folderName, styleType) {
  const capName = toPascalCase(folderName);
  if (!!styleType && styleType !== "tailwind") {
    fileScssName = `${fileScssName}.${styleType}`;
  }
  const camelName = toCamelCase(folderName);
  const tsFileContent = `
  import React from 'react';
  ${
    !!styleType && styleType !== "tailwind"
      ? `import STYLES from './style.module.${styleType}';`
      : ""
  }
  import { ${capName}Props } from './interface.d.ts';

  const ${capName}: React.FC<${capName}Props> = (props) => {
    return <div className={STYLES.${camelName}Layout}>${capName}</div>;
  };

  export default ${capName};
  `;
  const scssFileContent = `.${camelName}Layout{}`;
  const dFileContent = `
  export interface ${capName}Props {
  }
  `;

  // 创建文件夹
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Folder '${folderName}' created.`);
  } else {
    console.log(`Folder '${folderName}' already exists.`);
  }
  // 生成 .tsx 文件
  const fileTsPath = path.join(folderName, fileTsName);
  const fileDPath = path.join(folderName, fileDName);
  fs.writeFileSync(fileTsPath, tsFileContent);
  fs.writeFileSync(fileDPath, dFileContent);
  if (!!styleType && styleType !== "tailwind") {
    const fileScssPath = path.join(folderName, fileScssName);
    fs.writeFileSync(fileScssPath, scssFileContent);
  }
}

export default createTsx;
