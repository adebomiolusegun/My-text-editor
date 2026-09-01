import type { Block } from "@Types/types";
import { downloadFile } from "./downloadFile";

export function exportAsJson(blocks: Block[], title = "document") {
  const payload = {
    title,
    exportedAt: new Date().toISOString(),
    blocks,
  };

  downloadFile(
    JSON.stringify(payload, null, 2),
    `${title}.json`,
    "application/json",
  );
}
