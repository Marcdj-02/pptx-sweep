import JSZip from "jszip";
import { SweepOptions } from "..";

export async function modifyExtendedProperties(
  zip: JSZip,
  extendedPath: string,
  options: SweepOptions
): Promise<void> {
  let extended = await zip.file(extendedPath)?.async("string");
  if (!extended) {
    throw new Error(`File not found: ${extendedPath}`);
  }

  if (options.remove?.notes) {
    extended = extended.replace(/<Notes>\d+?<\/Notes>/, "<Notes>0</Notes>");
  }

  if (options.remove?.totalTime) {
    extended = extended.replace(/<TotalTime>\d+?<\/TotalTime>/, "");
  }

  zip.file(extendedPath, extended);
}
