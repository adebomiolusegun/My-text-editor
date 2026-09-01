import type { Block } from "@Types/types";

export interface BlockGroup {
  listType: Block["listType"];
  items: Block[];
}

function groupBlocks(blocks: Block[]): BlockGroup[] {
  const groups: BlockGroup[] = [];

  for (const block of blocks) {
    if (!block.listType) continue;

    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.listType === block.listType) {
      lastGroup.items.push(block);
    } else {
      groups.push({
        listType: block.listType,
        items: [block],
      });
    }
  }

  return groups;
}

export { groupBlocks };
