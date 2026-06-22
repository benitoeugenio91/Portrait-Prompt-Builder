export type Language = 'ua' | 'ru' | 'en';

export interface Tag {
  id: string;
  label: {
    ua: string;
    ru: string;
    en: string;
  };
  value: {
    ua: string;
    ru: string;
    en: string;
  };
}

export interface SubCategory {
  id: string;
  title: {
    ua: string;
    ru: string;
    en: string;
  };
  tags: Tag[];
}

export interface Category {
  id: string;
  title: {
    ua: string;
    ru: string;
    en: string;
  };
  subcategories: SubCategory[];
}

export interface SavedPrompt {
  id: string;
  name: string;
  promptText: string;
  folderId: string | null; // null represents "General" or no folder
  createdAt: string;
  tagsCount: number;
}

export interface PromptFolder {
  id: string;
  name: string;
  createdAt: string;
}

export interface AppState {
  customDatabase: Category[];
  selectedTags: Array<{
    id: string;
    categoryId: string;
    subCategoryId: string;
    tag: Tag;
  }>;
  customText: string;
  interfaceLang: Language;
  outputLang: Language;
  savedPrompts: SavedPrompt[];
  folders: PromptFolder[];
}
