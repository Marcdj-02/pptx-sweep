import JSZip from "jszip";
import { xml2json } from "xml-js";

export async function getFileJson(zip: JSZip, filePath: string) {
  const xml = await zip.file(filePath)?.async("string");
  if (!xml) {
    throw new Error(`File not found: ${filePath}`);
  }

  return JSON.parse(xml2json(xml, { compact: true, spaces: 4 }));
}
