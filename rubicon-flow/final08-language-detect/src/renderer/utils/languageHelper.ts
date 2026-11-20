import * as monaco from 'monaco-editor';

type ExtensionEntry = {
  id: string;
  extension: string;
};

let extensionEntries: ExtensionEntry[] | null = null;

function getExtensions() {
  if (extensionEntries) {
    return;
  }

  extensionEntries = monaco.languages.getLanguages().flatMap((language) =>
    (language.extensions ?? []).map((extension) => ({
      id: language.id,
      extension: extension.toLowerCase(),
    })),
  );

  return extensionEntries;
}

export function inferLanguage(filename: string) {
  const lowerFilename = filename.toLowerCase();

  const matchByName = monaco.languages
    .getLanguages()
    .find((language) =>
      language.filenames?.some(
        (filename) => filename.toLowerCase() === lowerFilename,
      ),
    );

  if (matchByName) {
    return matchByName.id;
  }

  const matchByExtension = getExtensions()?.find((extension) =>
    lowerFilename.endsWith(extension.extension),
  );

  return matchByExtension?.id ?? 'plaintext';
}
