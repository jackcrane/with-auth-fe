import * as diff from "diff";

const AddedAndRemovedCharacters = (oldText, newText) => {
  const diffResult = diff.diffChars(oldText, newText);
  const added = [];
  const removed = [];
  diffResult.forEach((part) => {
    if (part.added) {
      added.push(...part.value.split(""));
    } else if (part.removed) {
      removed.push(...part.value.split(""));
    }
  });
  return { added, removed };
};

console.log(AddedAndRemovedCharacters("Test Event", "Paddlefest"));
