import webpack from "@nativescript/webpack";

export default (env) => {
  webpack.init(env);
  return webpack.resolveConfig();
};