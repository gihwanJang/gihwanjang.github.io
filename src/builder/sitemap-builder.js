// require('babel-register');

// const router = require('./route.tsx').default;
// const Sitemap = require('../').default;

// (
// 	new Sitemap(router)
// 		.build('https://gihwanjang.github.io/pages')
// 		.save('./sitemap.xml')
// );

require("babel-register")({
    presets: ["es2015", "react"],
  });
  
  const router = require("./route").default; // sitemapRoutes 파일이 있는 경로입니다.
  const Sitemap = require("@snaddyvitch-dispenser/react-router-sitemap").default;
  
  function generateSitemap() {
    return new Sitemap(router)
    .build('https://gihwanjang.github.io/pages')
      .save("./public/sitemap.xml"); // sitemap.xml 파일이 생성될 위치입니다.
  }
  
generateSitemap();