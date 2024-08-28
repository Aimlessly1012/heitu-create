import React from 'react';
import STYLES from './style.module.${styleType}';
import { ${capName}Props } from './interface.d.ts';

const ${capName}: React.FC<${capName}Props> = (props) => {
  return <div className={STYLES.${camelName}Layout}>${capName}</div>;
};

export default ${capName};