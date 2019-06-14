// List of projects/orgs using your project for the users page.
const users = [
  // {
  //   caption: "Erik Pearson",
  //   // You will need to prepend the image path with your baseUrl
  //   // if it is not '/', like: '/test-site/img/image.jpg'.
  //   // image: '/img/undraw_open_source.svg',
  //   infoLink: "https://narrative.kbase.us#people/eapearson",
  //   pinned: true
  // }
];

const execSync = require("child_process").execSync;

function getBranch() {
  const cmd = "git rev-parse --abbrev-ref HEAD";
  const result = execSync(cmd);
  return result.toString().trim("\n");
}

const currentBranch = getBranch();

console.log("current branch is", currentBranch);

const siteConfig = {
  title: "KBase UI Documentation", // Title for your website.
  tagline: "A website for kbase-ui",
  url: "https://eapearson.github.io/kbase-ui-docs", // Your website URL
  baseUrl: "/kbase-ui-docs/", // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "kbase-ui-docs",
  organizationName: "eapearson",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "getting-started/index", label: "Docs" },
    // { doc: "doc4", label: "API" },
    { page: "help", label: "Help" },
    { blog: true, label: "Blog" }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/kbase_logo.png",
  footerIcon: "img/favicon.ico",
  favicon: "img/favicon.ico",

  /* Colors for website */
  colors: {
    primaryColor: "#895a87",
    secondaryColor: "#5f3e5e"
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} KBase `,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default"
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  gaTag: true,
  gaTrackingId: "UA-137652528-1"
};

module.exports = siteConfig;
