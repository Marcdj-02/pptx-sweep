export function getRelsPath(path: string) {
  const parts = path.split("/");

  parts.splice(parts.length - 1, 0, "_rels");

  const fileName = parts[parts.length - 1] + ".rels";

  parts[parts.length - 1] = fileName;

  return parts.join("/");
}

export function addRelativePath(basePath: string, relativePath: string) {
  // Split the base path into segments and remove the last segment (the file itself)
  const baseParts = basePath.split("/").slice(0, -1);

  // Split the relative path into segments
  const relativeParts = relativePath.split("/");

  // Process the relative path
  for (let part of relativeParts) {
    if (part === "..") {
      // Move up one directory
      baseParts.pop();
    } else {
      // Add the new directory/file part
      baseParts.push(part);
    }
  }

  // Join and return the final path
  return baseParts.join("/");
}
