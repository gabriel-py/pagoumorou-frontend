// declaration.d.ts
declare module "*.scss";
declare module "*.png";

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
