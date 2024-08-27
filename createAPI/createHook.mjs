import path from "path";
import fs from "fs";
import { toPascalCase } from "../utils/index.mjs";

const fileTsName = "index.tsx";
const fileDName = "interface.d.ts";

function createHook(folderName) {
  const capName = toPascalCase(folderName);
  const tsFileContent = `
  
  import React from 'react';
  import { Use${capName} } from './interface.d.ts';

  const use${capName}: Use${capName} = (props) => {
    return [];
  };

  export default  use${capName};
  `;
  const dFileContent = `
  export interface Use${capName} {
  }
  `;

  // 创建文件夹
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Folder '${folderName}' created.`);
  } else {
    console.log(`Folder '${folderName}' already exists.`);
  }
  // 生成 .ts 文件
  const fileTsPath = path.join(folderName, fileTsName);
  const fileDPath = path.join(folderName, fileDName);
  fs.writeFileSync(fileTsPath, tsFileContent);
  fs.writeFileSync(fileDPath, dFileContent);
}
export default createHook;
