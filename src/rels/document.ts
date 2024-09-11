import JSZip from "jszip";
import { SweepOptions } from "..";
import { getRelsPath } from "../utils/paths";
import { getFileJson } from "../utils/xml";
import { modifySlide } from "./document/slide";
import { modifyNotesMaster } from "./document/notesMaster";
import { modifyTableStyles } from "./document/tableStyles";
import { modifyTheme } from "./document/theme";
import { modifyViewProps } from "./document/viewProps";
import { modifySlideMaster } from "./document/slideMaster";
import { modifyPresProps } from "./document/presProps";
import { modifyHandoutMaster } from "./document/handoutMaster";
import { modifyAuthors } from "./document/authors";

async function todoOverwrite(zip: JSZip, path: string, options: SweepOptions) {
  throw new Error("TODO: Overwrite the file");
}

const relationshipTypes: Record<
  string,
  (
    zip: JSZip,
    referencingRelsPath: string,
    path: string,
    options: SweepOptions
  ) => Promise<void>
> = {
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide":
    modifySlide,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster":
    modifyNotesMaster,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles":
    modifyTableStyles,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme":
    modifyTheme,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps":
    modifyViewProps,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster":
    modifySlideMaster,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps":
    modifyPresProps,
  "http://schemas.microsoft.com/office/2018/10/relationships/authors":
    modifyAuthors,
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/handoutMaster":
    modifyHandoutMaster,
};

export async function modifyDocument(
  zip: JSZip,
  documentPath: string,
  options: SweepOptions
): Promise<void> {
  const relsPath = getRelsPath(documentPath);

  const rels = await getFileJson(zip, relsPath);

  const relationships: { Id: string; Type: string; Target: string }[] =
    rels.Relationships.Relationship.map((r: any) => r._attributes);

  for (const relationship of relationships) {
    const modifyFunction = relationshipTypes[relationship.Type];

    if (modifyFunction) {
      await modifyFunction(
        zip,
        relsPath,
        `ppt/${relationship.Target}`,
        options
      );
    }
  }
}
