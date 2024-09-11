// import { sweep } from "./dist/index.js";
const { sweep } = require("./dist/index.js");

sweep("comments.pptx", "comments-swept.pptx", {
  remove: {
    core: {
      title: true,
      creator: true,
      lastMofiiedBy: true,
      revision: true,
      created: true,
      modified: true,
    },
    thumbnail: true,
    notes: true,
    comments: true,
    authors: true,
  },
});
