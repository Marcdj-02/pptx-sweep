import JSZip from "jszip";
import { SweepOptions } from "../..";
import { addRelativePath, getRelsPath } from "../../utils/paths";
import { getFileJson } from "../../utils/xml";
import { modifyNotesSlide } from "./slide/notesSlide";
import { modifyComments } from "./slide/comments";

async function todoOverwrite(
  zip: JSZip,
  referencingRelsPath: string,
  path: string,
  options: SweepOptions
) {
  throw new Error("TODO: Overwrite the file");
}

const relationshipTypes: Record<
  string,
  | ((
      zip: JSZip,
      referencingRelsPath: string,
      path: string,
      options: SweepOptions
    ) => Promise<void>)
  | undefined
> = {
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
    undefined,
  "http://schemas.microsoft.com/office/2018/10/relationships/comments":
    modifyComments,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide":
    modifyNotesSlide,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout":
    undefined,
};

export async function modifySlide(
  zip: JSZip,
  referencingRelsPath: string,
  slidePath: string,
  options: SweepOptions
): Promise<void> {
  const relsPath = getRelsPath(slidePath);

  const rels = await getFileJson(zip, relsPath);

  const relationships: { Id: string; Type: string; Target: string }[] =
    Array.isArray(rels.Relationships.Relationship)
      ? rels.Relationships.Relationship.map((r: any) => r._attributes)
      : [rels.Relationships.Relationship._attributes];

  for (const relationship of relationships) {
    const modifyFunction = relationshipTypes[relationship.Type];

    if (modifyFunction) {
      await modifyFunction(
        zip,
        relsPath,
        addRelativePath(slidePath, relationship.Target),
        options
      );
    }
  }

  if (options.remove?.comments) {
    const slideContent = await zip.file(slidePath)?.async("string");
    if (!slideContent) {
      throw new Error(`File not found: ${slidePath}`);
    }

    const updatedSlideContent = slideContent.replace(
      /<p188:commentRel[^>]*?\/>/,
      ""
    );

    zip.file(slidePath, updatedSlideContent);
  }
}
