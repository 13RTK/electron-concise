import { BrowserWindow, dialog, IpcMainEvent } from 'electron';
import { readFile, writeFile } from 'node:fs/promises';
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

export async function updateFile(_event: IpcMainEvent, newContent: string) {
  if (!currentFilePath) {
    return null;
  }

  await writeFile(currentFilePath, newContent, 'utf-8');
}

export async function updateTitle(event: IpcMainEvent, isDirty: boolean) {
  if (!currentFilePath) {
    return;
  }

  const window = BrowserWindow.fromWebContents(event.sender);

  if (!window) {
    return dialog.showErrorBox('Error', 'window not exists!');
  }

  const title = window.getTitle();

  if (isDirty && !title.includes('not save')) {
    return window.setTitle(`${title} - not save`);
  }

  if (!isDirty && title.includes('not save')) {
    return window.setTitle(title.split('-')[0].trim());
  }
}
