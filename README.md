ds-rewriter
===========

[DysonShell](https://www.npmjs.com/package/dysonshell) 的 rewriter 模块。在 build 过程中将静态文件改名为带 md5（前 8 位）的文件名，此模块会根据生成的原文件名与新文件名的对应表（rev.json）修改字符串内容。

```
var dsRewriter = require('ds-rewriter');
```

`dsRewriter(revMap, contents, noMediaQueries)`:

* `revMap` 对应新文件名的 map object，key 为旧文件名，value 为新文件名
* `contents` 需要替换的字符串
* `noMediaQueries` 是否替换为无 media query 的版本，针对 IE8，值为 true 的话替换结果中 `*.css` 文件名会改为 `*.nmq.css`，dysenshell 框架约定在 build 阶段将 css 文件中的 media query 按固定大小来做 postcss 编译。

## License
MIT
