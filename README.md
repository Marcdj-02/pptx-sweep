# pptx-sweep

> ⚠ **Work in progress**, not ready for production use.

A utility to remove artifacts from PowerPoint files, such as comments, notes, and metadata.

## How to use

```typescript
import { pptxSweep } from "pptx-sweep";

const sourceFile = "powerpoint.pptx";
const targetFile = "powerpoint-swept.pptx";

await pptxSweep(sourceFile, targetFile, {
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
```

## Options

```typescript
type SweepOptions = {
  remove: {
    core: {
      title?: boolean;
      creator?: boolean;
      lastMofiiedBy?: boolean;
      revision?: boolean;
      created?: boolean;
      modified?: boolean;
    };
    thumbnail?: boolean;
    notes?: boolean;
    comments?: boolean;
    authors?: boolean;
  };
};
```

| Option                      | Description                                                       |
| --------------------------- | ----------------------------------------------------------------- |
| `remove.core.title`         | Remove the title of the presentation.                             |
| `remove.core.creator`       | Remove the name of the person who created the presentation.       |
| `remove.core.lastMofiiedBy` | Remove the name of the person who last modified the presentation. |
| `remove.core.revision`      | Remove the revision number.                                       |
| `remove.core.created`       | Remove the date and time the presentation was created.            |
| `remove.core.modified`      | Remove the date and time the presentation was last modified.      |
| `remove.thumbnail`          | Remove the thumbnail image.                                       |
| `remove.notes`              | Remove the (presenter) notes.                                     |
| `remove.comments`           | Remove the (modern) comments.                                     |
| `remove.authors`            | Remove the list of authors.                                       |
