#!/usr/bin/env node
import createTsx from "./createAPI/createModule.mjs";
import createHook from "./createAPI/createHook.mjs";
import inquirer from "inquirer";

let fileNames = ["index"];
let moduleType = "renderModule";
let styleType = "";
// 选项列表
const options = [`renderModule`, `hook`, `quit`];

// 样式选项列表
const styleOptions = [`css`, `scss`, `less`, `tailwind`, `quit`];
//  获取用户选择的 类型模板
function promptStyle() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "请选择一个模块完成生成:",
        choices: styleOptions,
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "css":
          styleType = "css";
          break;
        case "less":
          styleType = "less";
          break;
        case "scss":
          styleType = "scss";
          break;
        case "tailwind":
          styleType = "tailwind";
          break;
        case "quit":
          process.exit(0);
      }
    })
    .then(() => {
      if (moduleType === "renderModule") {
        fileNames
          .filter((item) => item)
          .forEach((file) => {
            createTsx(file, styleType);
          });
        console.log("renderModule 模板生成成功生成成功");
      }
    });
}
//  获取用户选择的 样式模板
function promptModule() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "请选择一个模块完成生成:",
        choices: options,
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "renderModule":
          moduleType = "renderModule";
          promptStyle();
          break;
        case "hook":
          moduleType = "hook";
          break;
        case "quit":
          process.exit(0);
      }
    })
    .then(() => {
      if (moduleType === "hook") {
        fileNames
          .filter((item) => item)
          .forEach((file) => {
            createHook(file);
          });
        console.log("hook 模板生成成功生成成功");
      }
    });
}

// 询问用户输入内容
inquirer
  .prompt([
    {
      type: "input",
      name: "fileNames",
      message: "请输入您的文件名以逗号分隔:",
    },
  ])
  .then((answers) => {
    fileNames = answers.fileNames.split(",");
    promptModule();
  });
