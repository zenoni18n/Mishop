module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // .babelrc迁移过来↓↓，打包时候文件变少
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
// .babelrc 已删除
// {
//   "presets": [
//     [
//       // 官方es2015报错 Error: Cannot find module 'babel-preset-es2015' from
//       //解决方法 npm i @babel/preset-env -D  es2015改成@babel/preset-env
//       "@babel/preset-env",
//       {
//         "modules": false
//       }
//     ]
//   ],
//   "plugins": [
//     [
//       "component",
//       {
//         "libraryName": "element-ui",
//         "styleLibraryName": "theme-chalk"
//       }
//     ]
//   ]
// }
// 官方推荐用babel.config ，迁移过去，es2015有点老
