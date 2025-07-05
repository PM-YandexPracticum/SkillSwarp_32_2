/// <reference types="vite/client" />
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
}


declare module '*.css' {
  const css: string;
  export default css;
}
declare module '*.tsx';
