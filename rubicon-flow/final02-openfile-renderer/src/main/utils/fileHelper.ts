import { dialog } from 'electron';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function openFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
  });

  if (canceled || filePaths.length === 0) {
    return null;
  }

  const filePath = filePaths[0];
  const fileContent = await readFile(filePath, 'utf-8');

  console.log(filePath, fileContent);

  return {
    filename: path.basename(filePath),
    content: fileContent,
  };
}
