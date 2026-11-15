import { dialog } from 'electron';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

let currentFilePath: string | null = null;

export async function openFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
  });

  if (canceled || filePaths.length === 0) {
    return null;
  }

  const filePath = filePaths[0];
  const fileContent = await readFile(filePath, 'utf-8');

  currentFilePath = filePath;

  return {
    filename: path.basename(filePath),
    content: fileContent,
  };
}

export async function getCurrentFileContent() {
  if (!currentFilePath) {
    return null;
  }

  const fileContent = await readFile(currentFilePath, 'utf-8');

  return {
    filename: path.basename(currentFilePath),
    content: fileContent,
  };
}
