declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  import type React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const source: string;
  export default source;
}
