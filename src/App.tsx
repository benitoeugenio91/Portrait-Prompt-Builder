import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Search,
  Globe,
  X,
  ChevronDown,
  ChevronUp,
  Sliders,
  Bookmark,
  Trash2,
  FolderPlus,
  Folder,
  FolderOpen,
  Plus,
  Edit2,
  Download,
  Upload,
  Database,
  Briefcase,
  Layers,
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { DEMO_DATABASE } from './tags';
import { Language, Tag, Category, SubCategory, SavedPrompt, PromptFolder, AppState } from './types';

const LOCAL_STORAGE_KEY = 'portrait_prompt_builder_user_db_v3';

const TRANSLATIONS = {
  ua: {
    title: "Portrait Prompt Studio",
    subtitle: "Професійний офлайн-серед інструмент проектування промптів з власним конструктором бази",
    // Секції
    workspaceTab: "Робоче Студіо",
    architectTab: "Конструктор Бази",
    savedTab: "Збережені Промпти",
    // Загальні
    interfaceLang: "Мова інтерфейсу",
    outputLang: "Мова готового промпту",
    resetBtn: "Очистити все",
    resetConfirm: "Очищення повністю видалить усі ваші створені категорії, теги, збережені промпти та теки. Бажаєте видалити все і почати з нуля?",
    loadDemo: "Завантажити демо-шаблон",
    demoLoaded: "Завантажено демонстраційний шаблон бази тегів!",
    // Студіо
    clearTagsBtn: "Очистити збірку",
    copyBtn: "Скопіювати промпт",
    copiedToast: "Промпт успішно скопійовано!",
    customPlaceholder: "Додайте власні унікальні деталі або фінальний опис мистецького твору...",
    searchPlaceholder: "Пошук по створеній вами базі тегів...",
    noTagsSelected: "Складова вашого промпту порожня. База пуста, або теги не вибрано. Створіть власні теги в Конструкторі Бази та виберіть їх тут, або додайте вільний опис.",
    selectPlaceholder: "— обрати —",
    numChars: "Символів",
    selectedCount: "Обрано елементів",
    searchSection: "Результати пошуку",
    noSearchResults: "Збігів у створеній базі не знайдено",
    activePills: "Поточні складові промпту",
    customTextLabel: "Вільний опис (довільний текст)",
    pwaReady: "Система працює автономно на вашому пристрої.",
    savePromptBtn: "Зберегти промпт",
    savePromptTitle: "Зберегти готовий промпт",
    promptNamePlaceholder: "Введіть назву промпту (наприклад: Кібер Панк портрет)",
    selectFolder: "Виберіть теку",
    noFolder: "Без папки (Загальне)",
    saveBtn: "Зберегти",
    cancelBtn: "Скасувати",
    promptSaved: "Промпт збережено успішно!",
    // Конструктор Бази
    databaseArchitect: "Управління вашою базою даних",
    addCategory: "Створити Категорію",
    editCategory: "Редагувати Категорію",
    categoryTitleUa: "Назва категорії (UA)",
    categoryTitleRu: "Назва категорії (RU)",
    categoryTitleEn: "Назва категорії (EN)",
    addSubcategory: "Додати підкатегорію",
    editSubcategory: "Редагувати підкатегорію",
    subcategoryTitleUa: "Назва підкатегорії (UA)",
    subcategoryTitleRu: "Назва підкатегорії (RU)",
    subcategoryTitleEn: "Назва підкатегорії (EN)",
    addTag: "Створити тег",
    editTag: "Редагувати тег",
    tagLabelUa: "Назва тегу в меню [UA]",
    tagLabelRu: "Назва тегу в меню [RU]",
    tagLabelEn: "Назва тегу в меню [EN]",
    tagValueUa: "Значення тегу в промпті [UA]",
    tagValueRu: "Значення тегу в промпті [RU]",
    tagValueEn: "Значення тегу в промпті [EN]",
    emptyDbWarning: "Ваша база повністю порожня. Ви вільні створювати будь-яку структуру з нуля або завантажити стартовий демо-шаблон для тестування!",
    exportDb: "Експорт бази (JSON)",
    importDb: "Імпорт бази",
    deleteCategoryConfirm: "Ви дійсно хочете видалити цю категорію та ВСЕ всередині неї?",
    deleteSubcategoryConfirm: "Ви дійсно хочете видалити цю підкатегорію та її теги?",
    deleteTagConfirm: "Видалити цей тег?",
    actionsLabel: "Дії",
    // Збережені промпти
    savedPromptsHeader: "Бібліотека збережених промптів",
    createFolderBtn: "Створити папку",
    folderNamePlaceholder: "Назва папки...",
    folderCreated: "Теку створено!",
    customFolders: "Ваші папки / проекти",
    allPrompts: "Усі збережені промпти",
    noSavedPrompts: "У вас немає збережених промптів у цій папці. Зберіть промпт в Студії та натисніть кнопку збереження!",
    promptCopied: "Промпт скопійовано з бібліотеки!",
    deletePromptConfirm: "Видалити цей промпт?",
    tagAddedAlert: "Цей тег вже додано у вашу збірку!",
    copySuccessTitle: "Успішно скопійовано!",
    loadToWorkspace: "Завантажити в Студію",
    loadedToWorkspaceToast: "Промпт завантажено в Робоче Студіо!",
    deletePrompt: "Видалити промпт"
  },
  ru: {
    title: "Portrait Prompt Studio",
    subtitle: "Профессиональный автономный инструмент проектирования промптов с конструктором базы",
    workspaceTab: "Рабочее Студио",
    architectTab: "Конструктор Базы",
    savedTab: "Сохраненные Промпты",
    interfaceLang: "Язык интерфейса",
    outputLang: "Язык готового промпта",
    resetBtn: "Очистить всё",
    resetConfirm: "Очистка полностью удалит все ваши созданные категории, теги, сохраненные промпты и папки. Желаете продолжить с чистого листа?",
    loadDemo: "Загрузить демо-шаблон",
    demoLoaded: "Загружен демонстрационный шаблон базы тегов!",
    clearTagsBtn: "Очистить сборку",
    copyBtn: "Скопировать промпт",
    copiedToast: "Промпт успешно скопирован!",
    customPlaceholder: "Добавьте собственные уникальные детали или финальное описание художественной работы...",
    searchPlaceholder: "Поиск по созданной вами базе тегов...",
    noTagsSelected: "Сборка пуста. Создайте собственные теги в Конструкторе Базы и выберите их здесь, либо впишите свободный текст.",
    selectPlaceholder: "— выбрать —",
    numChars: "Символов",
    selectedCount: "Выбрано элементов",
    searchSection: "Результаты поиска",
    noSearchResults: "Совпадений в вашей базе не найдено",
    activePills: "Текущие составляющие промпта",
    customTextLabel: "Свободное описание (произвольный текст)",
    pwaReady: "Система работает автономно на вашем устройстве.",
    savePromptBtn: "Сохранить промпт",
    savePromptTitle: "Сохранить готовый промпт",
    promptNamePlaceholder: "Введите название промпта (например: Киберпанк портрет)",
    selectFolder: "Выберите папку",
    noFolder: "Без папки (Общее)",
    saveBtn: "Сохранить",
    cancelBtn: "Отмена",
    promptSaved: "Промпт успешно сохранен!",
    databaseArchitect: "Управление вашей базой данных",
    addCategory: "Создать Категорию",
    editCategory: "Редактировать Категорию",
    categoryTitleUa: "Название категории (UA)",
    categoryTitleRu: "Название категории (RU)",
    categoryTitleEn: "Название категории (EN)",
    addSubcategory: "Добавить подкатегорию",
    editSubcategory: "Редактировать подкатегорию",
    subcategoryTitleUa: "Название подкатегории (UA)",
    subcategoryTitleRu: "Название подкатегории (RU)",
    subcategoryTitleEn: "Название подкатегории (EN)",
    addTag: "Создать тег",
    editTag: "Редактировать тег",
    tagLabelUa: "Название тега в меню [UA]",
    tagLabelRu: "Название тега в меню [RU]",
    tagLabelEn: "Название тега в меню [EN]",
    tagValueUa: "Значение тега в промпте [UA]",
    tagValueRu: "Значение тега в промпте [RU]",
    tagValueEn: "Значение @тега в промпте [EN]",
    emptyDbWarning: "Ваша база полностью пуста. Вы вольны создавать любую структуру с нуля или воспользоваться демо-шаблоном!",
    exportDb: "Экспорт базы (JSON)",
    importDb: "Импорт базы",
    deleteCategoryConfirm: "Вы действительно хотите удалить эту категорию и ВСЁ внутри неё?",
    deleteSubcategoryConfirm: "Вы действительно хотите удалить эту подкатегорию и её теги?",
    deleteTagConfirm: "Удалить этот тег?",
    actionsLabel: "Действия",
    savedPromptsHeader: "Библиотека сохраненных промптов",
    createFolderBtn: "Создать папку",
    folderNamePlaceholder: "Название папки...",
    folderCreated: "Папка создана!",
    customFolders: "Ваши папки / проекты",
    allPrompts: "Все сохраненные промпты",
    noSavedPrompts: "У вас нет сохраненных промптов в этой папке. Соберите промпт в Студии и нажмите кнопку сохранения для записи!",
    promptCopied: "Промпт скопирован из библиотеки!",
    deletePromptConfirm: "Удалить этот промпт?",
    tagAddedAlert: "Этот тег уже добавлен в вашу сборку!",
    copySuccessTitle: "Успешно скопировано!",
    loadToWorkspace: "Загрузить в Студию",
    loadedToWorkspaceToast: "Промпт загружен в Рабочее Студио!",
    deletePrompt: "Удалить промпт"
  },
  en: {
    title: "Portrait Prompt Studio",
    subtitle: "Professional offline-first prompt design studio with a custom database builder",
    workspaceTab: "Workspace Studio",
    architectTab: "Database Architect",
    savedTab: "Saved Library",
    interfaceLang: "Interface Language",
    outputLang: "Output Prompt Language",
    resetBtn: "Reset Workspaces",
    resetConfirm: "Clearing everything will completely wipe all custom categories, folders, tags, and saved library prompts. Do you wish to proceed?",
    loadDemo: "Load Starter Demo-Template",
    demoLoaded: "Starter base template successfully loaded!",
    clearTagsBtn: "Clear active tags",
    copyBtn: "Copy Prompt",
    copiedToast: "Prompt copied to clipboard!",
    customPlaceholder: "Write specific custom artistic details, subject context, or finishing aesthetics...",
    searchPlaceholder: "Search through your custom tag database...",
    noTagsSelected: "Your active workspace list is empty. Create your own tags in the Database Architect tab, or type a custom freeform description.",
    selectPlaceholder: "— select —",
    numChars: "Characters",
    selectedCount: "Selected variables",
    searchSection: "Search Results",
    noSearchResults: "No tags matched your query",
    activePills: "Active Workspace Elements",
    customTextLabel: "Freeform description (custom text)",
    pwaReady: "Application runs offline & standalone on your device.",
    savePromptBtn: "Save this finished prompt",
    savePromptTitle: "Save Finished Prompt",
    promptNamePlaceholder: "Enter prompt name (e.g., Cyberpunk cinematic portrait)",
    selectFolder: "Select directory",
    noFolder: "Generic (Unsorted)",
    saveBtn: "Save Prompt",
    cancelBtn: "Cancel",
    promptSaved: "Prompt saved to library!",
    databaseArchitect: "Manage database categories & tags",
    addCategory: "Create Category",
    editCategory: "Edit Category",
    categoryTitleUa: "Category title (UA)",
    categoryTitleRu: "Category title (RU)",
    categoryTitleEn: "Category title (EN)",
    addSubcategory: "Add Subcategory",
    editSubcategory: "Edit Subcategory",
    subcategoryTitleUa: "Subcategory title (UA)",
    subcategoryTitleRu: "Subcategory title (RU)",
    subcategoryTitleEn: "Subcategory title (EN)",
    addTag: "Create dynamic tag",
    editTag: "Edit dynamic tag",
    tagLabelUa: "Menu Label [UA]",
    tagLabelRu: "Menu Label [RU]",
    tagLabelEn: "Menu Label [EN]",
    tagValueUa: "Prompt insertion [UA]",
    tagValueRu: "Prompt insertion [RU]",
    tagValueEn: "Prompt insertion [EN]",
    emptyDbWarning: "Your custom database is completely empty. Feel free to build your own hierarchy or load the demo template instantly!",
    exportDb: "Export Database (JSON)",
    importDb: "Import Database Schema",
    deleteCategoryConfirm: "Are you sure you want to permanently delete this Category and ALL corresponding items?",
    deleteSubcategoryConfirm: "Are you sure you want to delete this subcategory and its tags?",
    deleteTagConfirm: "Delete this tag?",
    actionsLabel: "Actions",
    savedPromptsHeader: "Saved prompt collection library",
    createFolderBtn: "Create Folder",
    folderNamePlaceholder: "Folder name...",
    folderCreated: "Folder created successfully!",
    customFolders: "Project Directories",
    allPrompts: "All Saved Presets",
    noSavedPrompts: "No saved prompts found in this folder. Head to Workspace Studio and click 'Save this finished prompt' to keep record!",
    promptCopied: "Prompt copied from directory storage!",
    deletePromptConfirm: "Remove this prompt permanently from your vault?",
    tagAddedAlert: "Tag has already been added to active list!",
    copySuccessTitle: "Successful!",
    loadToWorkspace: "Load to Workspace",
    loadedToWorkspaceToast: "Prompt loaded into Workspace Studio!",
    deletePrompt: "Delete prompt"
  }
};

const CATEGORY_CHIP_COLORS = [
  { border: 'border-l-[#c8a882]', bg: 'bg-[#c8a882]/10', text: 'text-[#c8a882]', bgSolid: 'bg-[#c8a882]' },
  { border: 'border-l-[#a78bfa]', bg: 'bg-[#a78bfa]/10', text: 'text-[#a78bfa]', bgSolid: 'bg-[#a78bfa]' },
  { border: 'border-l-[#34d399]', bg: 'bg-[#34d399]/10', text: 'text-[#34d399]', bgSolid: 'bg-[#34d399]' },
  { border: 'border-l-[#60a5fa]', bg: 'bg-[#60a5fa]/10', text: 'text-[#60a5fa]', bgSolid: 'bg-[#60a5fa]' },
  { border: 'border-l-[#fbbf24]', bg: 'bg-[#fbbf24]/10', text: 'text-[#fbbf24]', bgSolid: 'bg-[#fbbf24]' },
  { border: 'border-l-[#f472b6]', bg: 'bg-[#f472b6]/10', text: 'text-[#f472b6]', bgSolid: 'bg-[#f472b6]' },
  { border: 'border-l-[#fb7185]', bg: 'bg-[#fb7185]/10', text: 'text-[#fb7185]', bgSolid: 'bg-[#fb7185]' },
  { border: 'border-l-[#c084fc]', bg: 'bg-[#c084fc]/10', text: 'text-[#c084fc]', bgSolid: 'bg-[#c084fc]' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'workspace' | 'architect' | 'saved'>('workspace');

  // --- Core Application State persistent ---
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Fallback checks for upgraded fields
        return {
          customDatabase: parsed.customDatabase || [],
          selectedTags: parsed.selectedTags || [],
          customText: parsed.customText || "",
          interfaceLang: parsed.interfaceLang || "ua",
          outputLang: parsed.outputLang || "en",
          savedPrompts: parsed.savedPrompts || [],
          folders: parsed.folders || []
        };
      }
    } catch (e) {
      console.error("Failed to parse local database state", e);
    }
    return {
      customDatabase: [], // Pure zero-state start
      selectedTags: [],
      customText: "",
      interfaceLang: "ua",
      outputLang: "en",
      savedPrompts: [],
      folders: []
    };
  });

  // UI interaction controllers
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedFolderFilter, setSelectedFolderFilter] = useState<string | null>(null);

  // Modals controller states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [targetCategoryForSub, setTargetCategoryForSub] = useState<string | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<SubCategory | null>(null);

  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [targetCategoryForTag, setTargetCategoryForTag] = useState<string | null>(null);
  const [targetSubcategoryForTag, setTargetSubcategoryForTag] = useState<string | null>(null);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const [isSavePromptModalOpen, setIsSavePromptModalOpen] = useState(false);
  const [newPromptName, setNewPromptName] = useState("");
  const [selectedFolderForPrompt, setSelectedFolderForPrompt] = useState<string>("");

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentLang = state.interfaceLang;
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ua;

  // Custom alert/toast timeout auto clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Set default active accordion when database loaded
  useEffect(() => {
    if (state.customDatabase.length > 0 && !activeAccordion) {
      setActiveAccordion(state.customDatabase[0].id);
    }
  }, [state.customDatabase]);

  // Compute color schemes dynamically
  const categoryColorsMap = useMemo(() => {
    const map: { [id: string]: typeof CATEGORY_CHIP_COLORS[0] } = {};
    state.customDatabase.forEach((cat, index) => {
      map[cat.id] = CATEGORY_CHIP_COLORS[index % CATEGORY_CHIP_COLORS.length];
    });
    return map;
  }, [state.customDatabase]);

  const selectedTagIdsSet = useMemo(() => {
    return new Set(state.selectedTags.map(item => item.id));
  }, [state.selectedTags]);

  const activeCategorySummary = useMemo(() => {
    const summary: { [key: string]: number } = {};
    state.selectedTags.forEach(item => {
      summary[item.categoryId] = (summary[item.categoryId] || 0) + 1;
    });
    return summary;
  }, [state.selectedTags]);

  // Compiled output string
  const compiledPrompt = useMemo(() => {
    const parts = state.selectedTags.map(item => item.tag.value[state.outputLang]);
    if (state.customText.trim()) {
      parts.push(state.customText.trim());
    }
    return parts.join(', ');
  }, [state.selectedTags, state.customText, state.outputLang]);

  // Live search matched tags
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const matches: Array<{
      tag: Tag;
      categoryId: string;
      subCategoryId: string;
      categoryTitle: string;
      subCategoryTitle: string;
    }> = [];

    state.customDatabase.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.tags.forEach(tag => {
          const inUa = tag.label.ua.toLowerCase().includes(query) || tag.value.ua.toLowerCase().includes(query);
          const inRu = tag.label.ru.toLowerCase().includes(query) || tag.value.ru.toLowerCase().includes(query);
          const inEn = tag.label.en.toLowerCase().includes(query) || tag.value.en.toLowerCase().includes(query);

          if (inUa || inRu || inEn) {
            matches.push({
              tag,
              categoryId: category.id,
              subCategoryId: subcategory.id,
              categoryTitle: category.title[currentLang],
              subCategoryTitle: subcategory.title[currentLang],
            });
          }
        });
      });
    });
    return matches;
  }, [searchQuery, state.customDatabase, currentLang]);

  // --- HANDLERS: WORKSPACE OPERATION ---
  const handleAddTagToAssembled = (tag: Tag, categoryId: string, subCategoryId: string) => {
    if (selectedTagIdsSet.has(tag.id)) {
      setToastMessage(t.tagAddedAlert);
      return;
    }
    setState(prev => ({
      ...prev,
      selectedTags: [
        ...prev.selectedTags,
        {
          id: tag.id,
          categoryId,
          subCategoryId,
          tag,
        }
      ]
    }));
  };

  const handleRemoveTagFromAssembled = (tagId: string) => {
    setState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.filter(item => item.id !== tagId)
    }));
  };

  const handleClearSelectedTags = () => {
    setState(prev => ({ ...prev, selectedTags: [] }));
  };

  const handleCopyToClipboard = async (textToCopy: string, customMessage?: string) => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedState(true);
      setToastMessage(customMessage || t.copiedToast);
      setTimeout(() => setCopiedState(false), 2000);
    } catch (e) {
      console.error("Could not copy prompt text", e);
    }
  };

  const handleResetAll = () => {
    if (window.confirm(t.resetConfirm)) {
      setState({
        customDatabase: [],
        selectedTags: [],
        customText: "",
        interfaceLang: currentLang,
        outputLang: "en",
        savedPrompts: [],
        folders: []
      });
      setSearchQuery("");
      setActiveAccordion(null);
      setSelectedFolderFilter(null);
    }
  };

  const handleLoadDemoDatabase = () => {
    setState(prev => ({
      ...prev,
      customDatabase: DEMO_DATABASE,
      selectedTags: []
    }));
    setActiveAccordion(DEMO_DATABASE[0]?.id || null);
    setToastMessage(t.demoLoaded);
  };

  // --- HANDLERS: DATABASE ARCHITECT (CATEGORY, SUBCATEGORY, TAG) ---
  const handleSaveCategory = (titleUa: string, titleRu: string, titleEn: string) => {
    if (editingCategory) {
      // Edit mode
      setState(prev => ({
        ...prev,
        customDatabase: prev.customDatabase.map(cat => cat.id === editingCategory.id ? {
          ...cat,
          title: { ua: titleUa, ru: titleRu, en: titleEn }
        } : cat)
      }));
    } else {
      // Add mode
      const newCat: Category = {
        id: `cat_${Date.now()}`,
        title: { ua: titleUa, ru: titleRu, en: titleEn },
        subcategories: []
      };
      setState(prev => ({
        ...prev,
        customDatabase: [...prev.customDatabase, newCat]
      }));
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm(t.deleteCategoryConfirm)) {
      setState(prev => ({
        ...prev,
        customDatabase: prev.customDatabase.filter(cat => cat.id !== id),
        selectedTags: prev.selectedTags.filter(tag => tag.categoryId !== id)
      }));
      if (activeAccordion === id) setActiveAccordion(null);
    }
  };

  const handleSaveSubcategory = (titleUa: string, titleRu: string, titleEn: string) => {
    if (!targetCategoryForSub) return;
    if (editingSubcategory) {
      // Edit Mode
      setState(prev => ({
        ...prev,
        customDatabase: prev.customDatabase.map(cat => cat.id === targetCategoryForSub ? {
          ...cat,
          subcategories: cat.subcategories.map(sub => sub.id === editingSubcategory.id ? {
            ...sub,
            title: { ua: titleUa, ru: titleRu, en: titleEn }
          } : sub)
        } : cat)
      }));
    } else {
      // Add Mode
      const newSub: SubCategory = {
        id: `sub_${Date.now()}`,
        title: { ua: titleUa, ru: titleRu, en: titleEn },
        tags: []
      };
      setState(prev => ({
        ...prev,
        customDatabase: prev.customDatabase.map(cat => cat.id === targetCategoryForSub ? {
          ...cat,
          subcategories: [...cat.subcategories, newSub]
        } : cat)
      }));
    }
    setIsSubcategoryModalOpen(false);
    setTargetCategoryForSub(null);
    setEditingSubcategory(null);
  };

  const handleDeleteSubcategory = (catId: string, subId: string) => {
    if (window.confirm(t.deleteSubcategoryConfirm)) {
      setState(prev => ({
        ...prev,
        customDatabase: prev.customDatabase.map(cat => cat.id === catId ? {
          ...cat,
          subcategories: cat.subcategories.filter(sub => sub.id !== subId)
        } : cat),
        selectedTags: prev.selectedTags.filter(tag => tag.subCategoryId !== subId)
      }));
    }
  };

  const handleSaveTag = (
    lblUa: string, lblRu: string, lblEn: string,
    valUa: string, valRu: string, valEn: string
  ) => {
    if (!targetCategoryForTag || !targetSubcategoryForTag) return;
    if (editingTag) {
      // Edit Mode
      setState(prev => ({
        ...prev,
        customDatabase: prev.customDatabase.map(cat => cat.id === targetCategoryForTag ? {
          ...cat,
          subcategories: cat.subcategories.map(sub => sub.id === targetSubcategoryForTag ? {
            ...sub,
            tags: sub.tags.map(t => t.id === editingTag.id ? {
              ...t,
              label: { ua: lblUa, ru: lblRu, en: lblEn },
              value: { ua: valUa, ru: valRu, en: valEn }
            } : t)
          } : sub)
        } : cat),
        // Update tags mapped inside active assembled workspace tags as well
        selectedTags: prev.selectedTags.map(item => item.id === editingTag.id ? {
          ...item,
          tag: {
            ...item.tag,
            label: { ua: lblUa, ru: lblRu, en: lblEn },
            value: { ua: valUa, ru: valRu, en: valEn }
          }
        } : item)
      }));
    } else {
      // Add Mode
      const newTag: Tag = {
        id: `tag_${Date.now()}`,
        label: { ua: lblUa, ru: lblRu, en: lblEn },
        value: { ua: valUa, ru: valRu, en: valEn }
      };
      setState(prev => ({
        ...prev,
        customDatabase: prev.customDatabase.map(cat => cat.id === targetCategoryForTag ? {
          ...cat,
          subcategories: cat.subcategories.map(sub => sub.id === targetSubcategoryForTag ? {
            ...sub,
            tags: [...sub.tags, newTag]
          } : sub)
        } : cat)
      }));
    }
    setIsTagModalOpen(false);
    setTargetCategoryForTag(null);
    setTargetSubcategoryForTag(null);
    setEditingTag(null);
  };

  const handleDeleteTag = (catId: string, subId: string, tagId: string) => {
    if (window.confirm(t.deleteTagConfirm)) {
      setState(prev => ({
        ...prev,
        customDatabase: prev.customDatabase.map(cat => cat.id === catId ? {
          ...cat,
          subcategories: cat.subcategories.map(sub => sub.id === subId ? {
            ...sub,
            tags: sub.tags.filter(t => t.id !== tagId)
          } : sub)
        } : cat),
        selectedTags: prev.selectedTags.filter(tag => tag.id !== tagId)
      }));
    }
  };

  // --- HANDLERS: SAVING FINISHED PROMPTS & DIRECTORIES ---
  const handleOpenSavePromptModal = () => {
    if (!compiledPrompt) return;
    setNewPromptName("");
    // Default select first folder or unsorted option
    setSelectedFolderForPrompt(state.folders[0]?.id || "");
    setIsSavePromptModalOpen(true);
  };

  const handleCreatePromptSave = () => {
    const freshPromptName = newPromptName.trim() || `Prompt ${new Date().toLocaleDateString()}`;
    const savedItem: SavedPrompt = {
      id: `prompt_${Date.now()}`,
      name: freshPromptName,
      promptText: compiledPrompt,
      folderId: selectedFolderForPrompt || null,
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tagsCount: state.selectedTags.length
    };

    setState(prev => ({
      ...prev,
      savedPrompts: [savedItem, ...prev.savedPrompts]
    }));
    setIsSavePromptModalOpen(false);
    setToastMessage(t.promptSaved);
  };

  const handleLoadPromptToWorkspace = (prompt: SavedPrompt) => {
    // Overrides active tags schema, loading text exactly
    setState(prev => ({
      ...prev,
      selectedTags: [], // Clear structural tags to match raw textual input
      customText: prompt.promptText
    }));
    setActiveTab('workspace');
    setToastMessage(t.loadedToWorkspaceToast);
  };

  const handleDeleteSavedPrompt = (id: string) => {
    if (window.confirm(t.deletePromptConfirm)) {
      setState(prev => ({
        ...prev,
        savedPrompts: prev.savedPrompts.filter(p => p.id !== id)
      }));
    }
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const folder: PromptFolder = {
      id: `folder_${Date.now()}`,
      name: newFolderName,
      createdAt: new Date().toLocaleDateString()
    };
    setState(prev => ({
      ...prev,
      folders: [...prev.folders, folder]
    }));
    setNewFolderName("");
    setIsFolderModalOpen(false);
    setToastMessage(t.folderCreated);
  };

  const handleDeleteFolder = (folderId: string) => {
    if (window.confirm("Вилучити цю теку? Збережені промпти всередині будуть переміщені в розряд 'Загальні'.")) {
      setState(prev => ({
        ...prev,
        folders: prev.folders.filter(f => f.id !== folderId),
        savedPrompts: prev.savedPrompts.map(p => p.folderId === folderId ? { ...p, folderId: null } : p)
      }));
      if (selectedFolderFilter === folderId) {
        setSelectedFolderFilter(null);
      }
    }
  };

  // --- DATA INTEROPERABILITY: IMPORT & EXPORT JSON ---
  const handleExportDatabase = () => {
    try {
      const dataStr = JSON.stringify(state.customDatabase, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `portrait_studio_database_${Date.now()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      setToastMessage("Базу експортовано!");
    } catch (e) {
      console.error(e);
      setToastMessage("Помилка експорту!");
    }
  };

  const handleImportDatabaseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImportDatabaseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = event.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const parsed = JSON.parse(result);
          if (Array.isArray(parsed)) {
            // Basic validation on layout schema
            setState(prev => ({
              ...prev,
              customDatabase: parsed,
              selectedTags: [] // Clear active workspace to avoid mapping conflicts
            }));
            setActiveAccordion(parsed[0]?.id || null);
            setToastMessage("Базу успішно імпортовано!");
          } else {
            setToastMessage("Невірний формат JSON бази!");
          }
        }
      } catch (err) {
        console.error(err);
        setToastMessage("Помилка при читанні файлу!");
      }
    };
    fileReader.readAsText(files[0]);
    // Clear input state to allow re-trigger same file
    event.target.value = '';
  };

  // Computed counters to render in Saved Prompts Tabs
  const filteredSavedPrompts = useMemo(() => {
    if (selectedFolderFilter === null) {
      return state.savedPrompts;
    }
    return state.savedPrompts.filter(p => p.folderId === selectedFolderFilter);
  }, [state.savedPrompts, selectedFolderFilter]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e8e8e8] selection:bg-[#c8a882] selection:text-black font-sans antialiased relative overflow-x-hidden flex flex-col justify-between" id="root-layout">
      
      {/* Dynamic top elegant line */}
      <div className="h-1 bg-gradient-to-r from-[#2a1b15] via-[#c8a882] to-[#2a1b15] w-full" />

      {/* Toast Notification Pop-up */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/3 right-1/3 sm:left-1/2 sm:-translate-x-1/2 z-50 bg-[#141414] border border-[#c8a882]/80 px-6 py-4 rounded-xl shadow-[0_10px_30px_rgba(200,168,130,0.25)] flex items-center justify-center gap-3 backdrop-blur-md"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#c8a882] animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- App Core Container --- */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-grow flex flex-col">
        
        {/* --- Header Dashboard Banner --- */}
        <header className="border-b border-neutral-900 pb-6 mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6" id="header">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#c8a882] to-[#ffebcc] p-[1.5px]">
                <div className="w-full h-full bg-[#0d0d0d] rounded flex items-center justify-center text-[#c8a882]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase font-sans">
                {t.title}
              </h1>
            </div>
            <p className="text-xs text-neutral-500 font-medium tracking-wide max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* General Workspace Global Actions (Languages Select, Master Clean state) */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Interface Lang switcher */}
            <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-900 p-1.5 rounded-lg">
              <Globe className="w-3.5 h-3.5 text-neutral-500 ml-1.5" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 mr-1 hidden md:inline">
                {t.interfaceLang}:
              </span>
              <div className="flex gap-1">
                {(['ua', 'ru', 'en'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setState(prev => ({ ...prev, interfaceLang: lang }))}
                    className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-all uppercase ${
                      state.interfaceLang === lang
                        ? 'bg-[#c8a882] text-[#0d0d0d]'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency full wipe */}
            <button
              onClick={handleResetAll}
              className="flex items-center gap-1.5 px-3 py-2 border border-neutral-900 hover:border-[#fb7185]/30 bg-neutral-950 hover:bg-[#fb7185]/10 text-[11px] font-bold uppercase tracking-wider text-neutral-400 hover:text-[#fb7185] rounded-lg transition-all"
              title={t.resetBtn}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetBtn}</span>
            </button>
          </div>
        </header>

        {/* --- MAIN TABS NAVIGATOR PANEL --- */}
        <nav className="flex space-x-1.5 bg-neutral-950/60 p-1 rounded-xl border border-neutral-900 max-w-2xl mb-8">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`flex-1 py-3 px-3 rounded-lg flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'workspace'
                ? 'bg-[#c8a882]/10 border border-[#c8a882]/30 text-[#eeddc5]'
                : 'text-neutral-400 hover:text-[#e8e8e8] hover:bg-neutral-900/40'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#c8a882]" />
            <span>{t.workspaceTab}</span>
            {state.selectedTags.length > 0 && (
              <span className="bg-[#c8a882] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {state.selectedTags.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('architect')}
            className={`flex-1 py-3 px-3 rounded-lg flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'architect'
                ? 'bg-[#c8a882]/10 border border-[#c8a882]/30 text-[#eeddc5]'
                : 'text-neutral-400 hover:text-[#e8e8e8] hover:bg-neutral-900/40'
            }`}
          >
            <Database className="w-4 h-4 text-[#c8a882]" />
            <span>{t.architectTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-3 px-3 rounded-lg flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'saved'
                ? 'bg-[#c8a882]/10 border border-[#c8a882]/30 text-[#eeddc5]'
                : 'text-neutral-400 hover:text-[#e8e8e8] hover:bg-neutral-900/40'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-[#c8a882]" />
            <span>{t.savedTab}</span>
            {state.savedPrompts.length > 0 && (
              <span className="bg-neutral-800 text-neutral-300 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {state.savedPrompts.length}
              </span>
            )}
          </button>
        </nav>

        {/* --- TAB CONTENT AREA --- */}
        <div className="flex-grow">
          
          {/* ==================== TAB 1: WORKSPACE ==================== */}
          {activeTab === 'workspace' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column Builder Selector Controls (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Search tags and input indicators */}
                <div className="bg-[#121212] p-4 rounded-xl border border-neutral-900">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] pl-10 pr-9 py-2.5 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none transition-all font-medium"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-neutral-900 text-neutral-400 hover:text-white transition-all"
                      >
                        <X className="w-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories structure browser */}
                <div className="bg-[#121212] rounded-xl border border-neutral-900 overflow-hidden min-h-[300px] flex flex-col">
                  
                  {state.customDatabase.length === 0 ? (
                    <div className="p-8 text-center flex-grow flex flex-col items-center justify-center gap-6">
                      <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-600">
                        <Database className="w-7 h-7" />
                      </div>
                      <div className="space-y-2 max-w-sm">
                        <p className="text-sm font-bold text-neutral-300">
                          {t.emptyDbWarning}
                        </p>
                        <p className="text-xs text-neutral-500">
                          Для безперешкодної кастомізації додайте свій перший набір тегів або підвантажте стартовий макет за один клік!
                        </p>
                      </div>

                      <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
                        <button
                          onClick={handleLoadDemoDatabase}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#c8a882] text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#ffd6a1] transition-all"
                        >
                          <Database className="w-4 h-4 text-black" />
                          <span>{t.loadDemo}</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('architect')}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
                        >
                          <span>Перейти до Конструктора</span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                        </button>
                      </div>
                    </div>
                  ) : searchQuery.trim() ? (
                    // Search layout triggered
                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-2 text-xs font-bold tracking-wider text-neutral-500 uppercase">
                        <span>{t.searchSection}</span>
                        <span className="bg-neutral-900 px-2.5 py-0.5 rounded text-[10px] text-neutral-300">
                          {searchResults.length}
                        </span>
                      </div>

                      {searchResults.length === 0 ? (
                        <div className="text-center py-12 text-neutral-500 text-sm italic">
                          {t.noSearchResults}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
                          {searchResults.map(({ tag, categoryId, categoryTitle, subCategoryTitle }, idx) => {
                            const isAdded = selectedTagIdsSet.has(tag.id);
                            const scheme = categoryColorsMap[categoryId] || { border: 'border-l-neutral-700', bg: 'bg-neutral-900', text: 'text-neutral-400' };
                            return (
                              <button
                                key={`${tag.id}-${idx}`}
                                onClick={() => !isAdded && handleAddTagToAssembled(tag, categoryId, 'search')}
                                className={`flex items-center justify-between p-3 rounded-lg border border-neutral-900 transition-all text-left w-full ${
                                  isAdded
                                    ? 'bg-neutral-950/40 opacity-40 cursor-not-allowed'
                                    : 'bg-[#080808] hover:bg-neutral-950 hover:border-neutral-800 cursor-pointer'
                                }`}
                              >
                                <div className="space-y-1.5 pr-3">
                                  <div className="flex flex-wrap gap-1.5 items-center">
                                    <span className={`text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-sm ${scheme.bg} ${scheme.text}`}>
                                      {categoryTitle}
                                    </span>
                                    <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500">
                                      {subCategoryTitle}
                                    </span>
                                  </div>
                                  <p className="text-xs sm:text-sm font-semibold text-white">
                                    {tag.label[currentLang] || tag.label.en}
                                  </p>
                                  <p className="text-[11px] text-neutral-500 italic line-clamp-1">
                                    {tag.value[state.outputLang]}
                                  </p>
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md transition-all ${
                                  isAdded ? 'text-neutral-600 bg-neutral-900' : 'text-[#c8a882] bg-[#c8a882]/10 border border-[#c8a882]/20'
                                }`}>
                                  {isAdded ? '✓' : '+'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular Accordions Tree rendering
                    <div className="divide-y divide-neutral-900 max-h-[650px] overflow-y-auto">
                      {state.customDatabase.map((category) => {
                        const isOpen = activeAccordion === category.id;
                        const itemsCount = activeCategorySummary[category.id] || 0;
                        const colors = categoryColorsMap[category.id] || { border: 'border-l-neutral-700', bg: 'bg-neutral-900', text: 'text-neutral-400' };

                        return (
                          <div key={category.id} className={`transition-colors ${isOpen ? 'bg-[#141414]/50' : ''}`}>
                            <button
                              onClick={() => setActiveAccordion(isOpen ? null : category.id)}
                              className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-900/30 transition-all focus:outline-none"
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-1.5 h-6 rounded-full transition-colors ${isOpen ? 'bg-[#c8a882]' : 'bg-neutral-900'}`} />
                                <div className="space-y-0.5">
                                  <h3 className={`text-xs uppercase font-bold tracking-widest transition-all ${isOpen ? 'text-[#c8a882]' : 'text-neutral-300'}`}>
                                    {category.title[currentLang] || category.title.en}
                                  </h3>
                                  {itemsCount > 0 && (
                                    <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                                      <span className="inline-block w-1 h-1 rounded-full bg-[#34d399] animate-pulse" />
                                      {t.selectedCount}: <span className="text-[#34d399] font-bold">{itemsCount}</span>
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {itemsCount > 0 && (
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-neutral-850 ${colors.bg} ${colors.text}`}>
                                    {itemsCount}
                                  </span>
                                )}
                                {isOpen ? (
                                  <ChevronUp className="w-4 h-4 text-neutral-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                                )}
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                  className="border-t border-neutral-950 bg-black/20 overflow-hidden"
                                >
                                  <div className="p-4 space-y-4">
                                    {category.subcategories.length === 0 ? (
                                      <div className="text-center py-4 text-xs text-neutral-650 italic">
                                        Немає заведених підкатегорій. Створіть їх в архітекторі!
                                      </div>
                                    ) : (
                                      category.subcategories.map((sub) => {
                                        const alreadySelected = state.selectedTags.find(
                                          item => item.categoryId === category.id && item.subCategoryId === sub.id
                                        );

                                        return (
                                          <div key={sub.id} className="flex flex-col gap-1.5 p-2 rounded-lg border border-neutral-900 bg-neutral-950/40">
                                            <div className="flex items-center justify-between">
                                              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                                {sub.title[currentLang] || sub.title.en}
                                              </label>
                                              {alreadySelected && (
                                                <button
                                                  onClick={() => handleRemoveTagFromAssembled(alreadySelected.id)}
                                                  className="text-[10px] text-[#fb7185] hover:underline font-bold tracking-tight uppercase flex items-center gap-1"
                                                >
                                                  <X className="w-2.5 h-2.5" />
                                                  <span>{alreadySelected.tag.label[currentLang] || alreadySelected.tag.label.en}</span>
                                                </button>
                                              )}
                                            </div>

                                            <div className="relative">
                                              <select
                                                onChange={(e) => {
                                                  const tagVal = e.target.value;
                                                  if (!tagVal) return;
                                                  const tagObj = sub.tags.find(t => t.id === tagVal);
                                                  if (tagObj) {
                                                    handleAddTagToAssembled(tagObj, category.id, sub.id);
                                                  }
                                                  e.target.value = "";
                                                }}
                                                value={alreadySelected ? alreadySelected.id : ""}
                                                className={`w-full bg-[#121212] border text-xs rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all cursor-pointer font-medium text-white ${
                                                  alreadySelected ? 'border-[#c8a882]/40 text-[#c8a882]' : 'border-neutral-900 hover:border-neutral-850'
                                                }`}
                                              >
                                                <option value="">{t.selectPlaceholder}</option>
                                                {sub.tags.map(tag => (
                                                  <option key={tag.id} value={tag.id} className="bg-[#121212] text-[#e8e8e8]">
                                                    {tag.label[currentLang] || tag.label.en} — ({tag.value[state.outputLang]} )
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                          </div>
                                        );
                                      })
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Prompt Output Panel (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                <div className="bg-[#121212] rounded-xl border border-neutral-900 p-5 md:p-6 flex flex-col gap-6">
                  
                  {/* Selected items header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 border-b border-neutral-950 pb-4">
                    <div className="space-y-0.5">
                      <h2 className="text-xs font-serif uppercase tracking-widest font-black text-white flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-[#c8a882]" />
                        {t.activePills}
                      </h2>
                      <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
                        {t.selectedCount}: <span className="text-white font-bold">{state.selectedTags.length}</span>
                      </p>
                    </div>

                    {/* Output Language Picker */}
                    <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-900 p-1.5 rounded-lg text-xs">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-500 ml-1">
                        {t.outputLang}:
                      </span>
                      <div className="flex gap-0.5">
                        {(['ua', 'ru', 'en'] as Language[]).map(lang => (
                          <button
                            key={lang}
                            onClick={() => setState(prev => ({ ...prev, outputLang: lang }))}
                            className={`px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase transition-all ${
                              state.outputLang === lang
                                ? 'bg-[#c8a882]/20 text-[#eeddc5] border border-[#c8a882]/40'
                                : 'text-neutral-400 hover:text-white border border-transparent'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pills content catalog */}
                  <div className="min-h-[120px] flex flex-wrap gap-2.5 p-3 rounded-lg bg-[#080808] border border-neutral-900/60 items-start content-start">
                    {state.selectedTags.length === 0 ? (
                      <div className="text-neutral-500 text-xs italic py-8 px-4 text-center w-full">
                        {t.noTagsSelected}
                      </div>
                    ) : (
                      <AnimatePresence>
                        {state.selectedTags.map((item) => {
                          const categoryObj = state.customDatabase.find(c => c.id === item.categoryId);
                          const categoryTitle = categoryObj ? (categoryObj.title[currentLang] || categoryObj.title.en) : "";
                          const colors = categoryColorsMap[item.categoryId] || { border: 'border-l-neutral-700', bg: 'bg-[#121212]', text: 'text-neutral-400' };
                          
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={`flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-[#121212] border border-neutral-900 rounded-md text-xs font-medium text-white border-l-4 ${colors.border} transition-all`}
                            >
                              <div className="flex flex-col leading-tight">
                                {categoryTitle && (
                                  <span className="text-[9px] uppercase tracking-widest text-[#c8a882] font-semibold">
                                    {categoryTitle}
                                  </span>
                                )}
                                <span className="font-bold text-[#fafafa] text-xs">
                                  {item.tag.label[currentLang] || item.tag.label.en}
                                </span>
                                <span className="text-[10px] text-neutral-500 italic">
                                  {item.tag.value[state.outputLang]}
                                </span>
                              </div>
                              <button
                                onClick={() => handleRemoveTagFromAssembled(item.id)}
                                className="bg-neutral-900 hover:bg-neutral-850 hover:text-[#fb7185] text-neutral-400 rounded p-1 transition-all"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Free-form extra descriptions text area */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <Bookmark className="w-3.5 h-3.5 text-[#c8a882]" />
                      {t.customTextLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={state.customText}
                      onChange={(e) => setState(prev => ({ ...prev, customText: e.target.value }))}
                      placeholder={t.customPlaceholder}
                      className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] focus:outline-none rounded-lg p-3 text-sm text-[#e8e8e8] placeholder-neutral-500 transition-all font-medium resize-none"
                    />
                  </div>

                  {/* Technical Code Console Prompt Container */}
                  <div className="flex flex-col gap-2 relative">
                    <div className="relative group">
                      {/* Floating Language flag */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 bg-neutral-950 border border-neutral-900 text-[9px] font-bold tracking-widest text-[#eeddc5] uppercase rounded-sm">
                        <Globe className="w-2.5 h-2.5 text-[#c8a882]" />
                        {state.outputLang}
                      </div>

                      <div className="w-full min-h-[140px] max-h-[220px] overflow-y-auto bg-[#040404] px-5 py-6 rounded-lg border border-neutral-900 font-mono text-xs sm:text-sm leading-relaxed text-[#c8a882] break-words shadow-inner select-all pt-11">
                        {compiledPrompt ? (
                          compiledPrompt
                        ) : (
                          <span className="text-neutral-700 block italic text-xs select-none">
                            &lt; empty prompt / порожній рядок / пустая строка &gt;
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Operational row under console screen */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                      <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                        {t.numChars}: <span className="text-[#c8a882] font-mono font-bold">{compiledPrompt.length}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Clear dynamic list action */}
                        {state.selectedTags.length > 0 && (
                          <button
                            onClick={handleClearSelectedTags}
                            className="flex items-center gap-1.5 px-3 py-2 border border-neutral-900 hover:border-neutral-800 bg-[#080808] rounded-lg text-xs font-semibold tracking-wider uppercase text-neutral-400 hover:text-[#fb7185] transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{t.clearTagsBtn}</span>
                          </button>
                        )}

                        {/* Save to shelf trigger */}
                        <button
                          onClick={handleOpenSavePromptModal}
                          disabled={!compiledPrompt}
                          className={`flex items-center gap-1.5 px-4.5 py-2 border border-neutral-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            compiledPrompt
                              ? 'bg-neutral-950 hover:bg-neutral-900 hover:border-[#c8a882]/40 text-neutral-200 cursor-pointer'
                              : 'text-neutral-600 bg-neutral-950 border-neutral-900 cursor-not-allowed'
                          }`}
                        >
                          <FolderPlus className="w-3.5 h-3.5 text-[#c8a882]" />
                          <span>{t.savePromptBtn}</span>
                        </button>

                        {/* Master Copy button */}
                        <button
                          onClick={() => handleCopyToClipboard(compiledPrompt)}
                          disabled={!compiledPrompt}
                          className={`flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-extrabold uppercase tracking-widest transition-all rounded-lg ${
                            compiledPrompt
                              ? 'bg-[#c8a882] hover:bg-[#ebd4b7] text-[#0d0d0d] shadow-lg shadow-[#c8a882]/10 cursor-pointer active:scale-95'
                              : 'bg-neutral-900 text-neutral-500 cursor-not-allowed border border-neutral-900'
                          }`}
                        >
                          {copiedState ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-black animate-pulse" />
                              <span>Скопійовано!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-black" />
                              <span>{t.copyBtn}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ==================== TAB 2: DATABASE ARCHITECT ==================== */}
          {activeTab === 'architect' && (
            <div className="space-y-6">
              
              {/* Top architecture bar with quick control actions */}
              <div className="bg-[#121212] p-5 rounded-xl border border-neutral-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                <div className="space-y-1">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[#c8a882] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#c8a882]" />
                    {t.databaseArchitect}
                  </h2>
                  <p className="text-xs text-neutral-400 font-medium">
                    Створюйте, редагуйте та групуйте свої власні теги. Все зберігається прямо на вашому девайсі!
                  </p>
                </div>

                {/* Database Interop Panel (Import / Export / Wipe) */}
                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Real load template */}
                  {state.customDatabase.length === 0 && (
                    <button
                      onClick={handleLoadDemoDatabase}
                      className="flex items-center gap-2 px-4 py-2 border border-[#c8a882]/40 hover:border-[#c8a882]/60 bg-[#c8a882]/10 hover:bg-[#c8a882]/20 text-[11px] font-bold uppercase tracking-wider text-[#eeddc5] rounded-lg transition-all"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>{t.loadDemo}</span>
                    </button>
                  )}

                  {/* Export action */}
                  <button
                    onClick={handleExportDatabase}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 border border-neutral-900 hover:border-neutral-800 bg-neutral-950 text-xs font-bold uppercase tracking-wider text-neutral-300 rounded-lg transition-all"
                    title={t.exportDb}
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Експорт бази (JSON)</span>
                  </button>

                  {/* Real file import action trigger */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportDatabaseFile}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={handleImportDatabaseClick}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 border border-neutral-900 hover:border-neutral-800 bg-neutral-950 text-xs font-bold uppercase tracking-wider text-neutral-300 rounded-lg transition-all"
                    title={t.importDb}
                  >
                    <Upload className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{t.importDb}</span>
                  </button>

                  {/* Create category trigger */}
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setIsCategoryModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#c8a882] hover:bg-[#eeddc5] text-black text-xs font-extrabold uppercase tracking-widest rounded-lg cursor-pointer transition-all active:scale-95 shadow-md shadow-[#c8a882]/5"
                  >
                    <Plus className="w-4 h-4 text-black" />
                    <span>{t.addCategory}</span>
                  </button>

                </div>

              </div>

              {/* Infinite Database Structure Browser list */}
              {state.customDatabase.length === 0 ? (
                <div className="bg-[#121212]/40 rounded-xl border border-neutral-900/60 p-12 text-center flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-full text-neutral-500">
                    <Layers className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5 max-w-md">
                    <p className="text-sm font-bold text-neutral-300">База даних абсолютно порожня.</p>
                    <p className="text-xs text-neutral-500">
                      Конструктор дозволяє налаштовувати назви та вставки мовами UA/RU/EN у реальному часі. Натисніть кнопку <b>Створити Категорію</b>, щоб почати проектування!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {state.customDatabase.map((category) => {
                    const colors = categoryColorsMap[category.id] || { border: 'border-l-neutral-700', bg: 'bg-[#121212]', text: 'text-neutral-400', bgSolid: 'bg-neutral-800' };

                    return (
                      <div key={category.id} className="bg-[#121212] border border-neutral-900 rounded-xl overflow-hidden hover:border-neutral-850 transition-all shadow-lg shadow-black/30">
                        
                        {/* Section Header */}
                        <div className="px-5 py-4 bg-neutral-950/80 border-b border-neutral-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className={`w-3 h-3 rounded-full ${colors.bgSolid}`} />
                            <div>
                              <h3 className="text-sm font-serif font-black uppercase text-white tracking-widest">
                                {category.title[currentLang] || category.title.en}
                              </h3>
                              
                              {/* Multilingual subtitle previews */}
                              <p className="text-[10px] text-neutral-500 font-mono">
                                [ua: {category.title.ua || '—'}] • [ru: {category.title.ru || '—'}] • [en: {category.title.en || '—'}]
                              </p>
                            </div>
                          </div>

                          {/* Category action operations */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingCategory(category);
                                setIsCategoryModalOpen(true);
                              }}
                              className="p-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-[#eeddc5] border border-neutral-850 rounded transition-all"
                              title="Редагувати категорію"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setTargetCategoryForSub(category.id);
                                setEditingSubcategory(null);
                                setIsSubcategoryModalOpen(true);
                              }}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#c8a882]/10 hover:bg-[#c8a882]/20 border border-[#c8a882]/30 hover:border-[#c8a882]/50 text-[10px] font-bold uppercase text-[#eeddc5] rounded transition-all"
                            >
                              <Plus className="w-3 h-3" />
                              <span>{t.addSubcategory}</span>
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1.5 bg-neutral-900 hover:bg-[#fb7185]/10 text-neutral-500 hover:text-[#fb7185] border border-neutral-850 hover:border-[#fb7185]/20 rounded transition-all"
                              title="Видалити категорію"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* List subcategories inside this category */}
                        <div className="p-5 space-y-6">
                          {category.subcategories.length === 0 ? (
                            <div className="text-center py-6 text-xs text-neutral-500 italic bg-neutral-950/20 rounded-lg border border-dashed border-neutral-900 p-2">
                              Немає підкатегорій в даному розділі. Натисніть кнопку + Додати підкатегорію!
                            </div>
                          ) : (
                            category.subcategories.map((subcategory) => {
                              return (
                                <div key={subcategory.id} className="border border-neutral-900 bg-neutral-950/40 rounded-lg overflow-hidden p-4 space-y-4">
                                  
                                  {/* Subcategory title banner */}
                                  <div className="flex items-center justify-between border-b border-neutral-900pb-2 pb-2">
                                    <div>
                                      <h4 className="text-xs font-black uppercase text-neutral-300 tracking-wider">
                                        {subcategory.title[currentLang] || subcategory.title.en}
                                      </h4>
                                      <p className="text-[10px] text-neutral-500 font-mono">
                                        [ua: {subcategory.title.ua || '—'}] • [ru: {subcategory.title.ru || '—'}] • [en: {subcategory.title.en || '—'}]
                                      </p>
                                    </div>

                                    {/* Sub category action headers */}
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={() => {
                                          setTargetCategoryForSub(category.id);
                                          setEditingSubcategory(subcategory);
                                          setIsSubcategoryModalOpen(true);
                                        }}
                                        className="p-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-450 hover:text-[#eeddc5] text-xs rounded transition-all"
                                        title="Редагувати розділ"
                                      >
                                        <Edit2 className="w-3 h-3" />
                                      </button>
                                      
                                      <button
                                        onClick={() => {
                                          setTargetCategoryForTag(category.id);
                                          setTargetSubcategoryForTag(subcategory.id);
                                          setEditingTag(null);
                                          setIsTagModalOpen(true);
                                        }}
                                        className="flex items-center gap-1 px-2.5 py-1 bg-[#c8a882]/10 hover:bg-[#c8a882]/20 text-[9px] font-extrabold uppercase rounded text-[#eeddc5] border border-[#c8a882]/30"
                                      >
                                        <Plus className="w-2.5 h-2.5" />
                                        <span>{t.addTag}</span>
                                      </button>

                                      <button
                                        onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                                        className="p-1 bg-neutral-900 hover:bg-[#fb7185]/10 text-neutral-500 hover:text-[#fb7185] rounded transition-all"
                                        title="Видалити розділ"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Tags content representation */}
                                  {subcategory.tags.length === 0 ? (
                                    <div className="text-center py-4 text-xs text-neutral-600 italic bg-black/10 rounded-md">
                                      Тут порожньо. Створіть перший тег для даного списку через кнопку Створити тег!
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                      {subcategory.tags.map((tag) => {
                                        return (
                                          <div key={tag.id} className="bg-neutral-900 border border-neutral-850 rounded-lg p-3.5 space-y-2 hover:border-neutral-800 transition-all flex flex-col justify-between">
                                            
                                            <div className="space-y-1">
                                              {/* Title representation */}
                                              <p className="text-xs font-bold text-white leading-tight">
                                                {tag.label[currentLang] || tag.label.en}
                                              </p>
                                              
                                              {/* Translation tooltip label menu */}
                                              <p className="text-[10px] text-neutral-500 font-medium">
                                                Label: {tag.label.ua} (UA) • {tag.label.en} (EN)
                                              </p>

                                              {/* Value insertion representation */}
                                              <div className="bg-black/45 p-1.5 rounded text-[10px] sm:text-xs font-mono text-neutral-400 break-words leading-tight">
                                                Value: <span className="text-[#c8a882]">{tag.value[state.outputLang]}</span>
                                              </div>
                                              <p className="text-[9px] text-neutral-600 font-mono">
                                                [Val UA: {tag.value.ua}] • [Val EN: {tag.value.en}]
                                              </p>
                                            </div>

                                            {/* Tag specific controllers */}
                                            <div className="flex items-center justify-end gap-1 border-t border-neutral-900/40 pt-2 mt-1">
                                              <button
                                                onClick={() => {
                                                  setTargetCategoryForTag(category.id);
                                                  setTargetSubcategoryForTag(subcategory.id);
                                                  setEditingTag(tag);
                                                  setIsTagModalOpen(true);
                                                }}
                                                className="p-1 text-[10px] font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-all uppercase flex items-center gap-1"
                                                title="Редагувати тег"
                                              >
                                                <Edit2 className="w-2.5 h-2.5" />
                                                <span>Змінити</span>
                                              </button>
                                              <button
                                                onClick={() => handleDeleteTag(category.id, subcategory.id, tag.id)}
                                                className="p-1 px-2 text-[10px] font-bold text-neutral-500 hover:text-[#fb7185] hover:bg-neutral-950 rounded transition-all uppercase flex items-center gap-1"
                                                title="Вилучити"
                                              >
                                                <Trash2 className="w-2.5 h-2.5" />
                                              </button>
                                            </div>

                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                </div>
                              );
                            })
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* ==================== TAB 3: SAVED WORKBENCH VAULT ==================== */}
          {activeTab === 'saved' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Folders Management Panel Left (4 cols) */}
              <div className="lg:col-span-4 bg-[#121212] rounded-xl border border-neutral-900 p-5 flex flex-col gap-4">
                
                <div className="flex items-center justify-between border-b border-neutral-950 pb-3">
                  <h3 className="text-xs font-serif uppercase tracking-widest font-black text-white flex items-center gap-2">
                    <Folder className="w-4 h-4 text-[#c8a882]" />
                    {t.customFolders}
                  </h3>
                  
                  {/* Create folder trigger */}
                  <button
                    onClick={() => setIsFolderModalOpen(true)}
                    className="p-1.5 bg-[#c8a882]/10 hover:bg-[#c8a882]/25 border border-[#c8a882]/30 rounded-lg text-xs font-bold text-[#eeddc5] transition-all"
                    title={t.createFolderBtn}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Categories selector tree folder lists */}
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setSelectedFolderFilter(null)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-left ${
                      selectedFolderFilter === null
                        ? 'bg-[#c8a882]/15 text-[#eeddc5] border border-[#c8a882]/20'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <ClipboardList className="w-4 h-4 text-neutral-400" />
                      {t.allPrompts}
                    </span>
                    <span className="bg-[#121212] px-2 py-0.5 rounded text-[10px] text-neutral-500 font-mono">
                      {state.savedPrompts.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedFolderFilter('unsorted')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-left ${
                      selectedFolderFilter === 'unsorted'
                        ? 'bg-[#c8a882]/15 text-[#eeddc5] border border-[#c8a882]/20'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Folder className="w-4 h-4 text-neutral-500" />
                      {t.noFolder}
                    </span>
                    <span className="bg-[#121212] px-2 py-0.5 rounded text-[10px] text-neutral-500 font-mono">
                      {state.savedPrompts.filter(p => !p.folderId).length}
                    </span>
                  </button>

                  {/* Dynamic user directories */}
                  {state.folders.map(folder => {
                    const count = state.savedPrompts.filter(p => p.folderId === folder.id).length;
                    return (
                      <div
                        key={folder.id}
                        className={`flex items-center justify-between rounded-lg transition-all border ${
                          selectedFolderFilter === folder.id
                            ? 'bg-[#c8a882]/15 text-[#eeddc5] border-[#c8a882]/20'
                            : 'text-neutral-400 border-transparent hover:text-white hover:bg-neutral-950'
                        }`}
                      >
                        <button
                          onClick={() => setSelectedFolderFilter(folder.id)}
                          className="flex-grow flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-left overflow-hidden"
                        >
                          <Folder className="w-4 h-4 text-[#c8a882]" />
                          <span className="truncate">{folder.name}</span>
                        </button>
                        
                        <div className="flex items-center gap-1.5 pr-2">
                          <span className="bg-neutral-950 px-2 py-0.5 rounded text-[10px] text-neutral-500 font-mono">
                            {count}
                          </span>
                          <button
                            onClick={() => handleDeleteFolder(folder.id)}
                            className="p-1 hover:text-[#fb7185] transition-all"
                            title="Вилучити теку"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Saved Prompts shelf list Right (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                <div className="bg-[#121212] rounded-xl border border-neutral-900 p-5 md:p-6">
                  
                  <div className="border-b border-neutral-950 pb-3 mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-serif uppercase tracking-widest font-black text-white">
                        {t.savedPromptsHeader}
                      </h2>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        Показується: {filteredSavedPrompts.length} промптів
                      </p>
                    </div>
                  </div>

                  {/* List cards prompts filtered */}
                  {filteredSavedPrompts.length === 0 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center gap-4 text-neutral-500">
                      <div className="w-12 h-12 bg-neutral-950 border border-neutral-900 rounded-full flex items-center justify-center text-neutral-600">
                        <FolderOpen className="w-6 h-6" />
                      </div>
                      <p className="text-xs sm:text-sm italic font-medium max-w-sm px-6">
                        {t.noSavedPrompts}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredSavedPrompts.map((prompt) => {
                        const targetFolder = state.folders.find(f => f.id === prompt.folderId);
                        return (
                          <div key={prompt.id} className="p-4 rounded-xl border border-neutral-900 bg-[#080808] hover:border-neutral-800 transition-all space-y-3.5 shadow-md">
                            
                            {/* Headline container */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-neutral-950 pb-2">
                              <div className="space-y-0.5">
                                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                                  {prompt.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                                    {prompt.createdAt}
                                  </span>
                                  {targetFolder && (
                                    <span className="bg-[#c8a882]/10 border border-[#c8a882]/20 text-[#c8a882] px-1.5 py-0.5 rounded text-[8px] uppercase tracking-widest font-bold">
                                      {targetFolder.name}
                                    </span>
                                  )}
                                  {prompt.tagsCount > 0 && (
                                    <span className="bg-neutral-900 text-neutral-400 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-widest font-bold">
                                      {prompt.tagsCount} tags
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Save operations */}
                              <div className="flex items-center gap-2">
                                
                                {/* Load to Workspace */}
                                <button
                                  onClick={() => handleLoadPromptToWorkspace(prompt)}
                                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 hover:border-neutral-750 border border-neutral-850 text-[10px] font-semibold text-neutral-200 uppercase rounded-md transition-all active:scale-95"
                                  title={t.loadToWorkspace}
                                >
                                  <Briefcase className="w-3.5 h-3.5 text-[#c8a882]" />
                                  <span>{t.loadToWorkspace}</span>
                                </button>

                                {/* Copy to Clipboard */}
                                <button
                                  onClick={() => handleCopyToClipboard(prompt.promptText, "Промпт скопійовано з бібліотеки!")}
                                  className="p-1 px-2.5 bg-neutral-900 hover:bg-[#c8a882]/1 w-full text-neutral-200 hover:text-[#c8a882] border border-neutral-850 hover:border-[#c8a882]/40 rounded-md text-[10px] font-semibold uppercase flex items-center justify-center gap-1.5 transition-all"
                                  title="Копіювати текст"
                                >
                                  <Copy className="w-3.5 h-3.5 text-neutral-450" />
                                  <span>Копіювати</span>
                                </button>

                                {/* Delete permanent */}
                                <button
                                  onClick={() => handleDeleteSavedPrompt(prompt.id)}
                                  className="p-1.5 bg-neutral-900 hover:bg-[#fb7185]/10 text-neutral-550 hover:text-[#fb7185] rounded-md border border-neutral-850 hover:border-[#fb7185]/25 transition-all"
                                  title={t.deletePrompt}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                              </div>
                            </div>

                            {/* Raw content text */}
                            <div className="w-full bg-[#040404] p-3.5 rounded-lg border border-neutral-900/40 font-mono text-xs text-[#c8a882] break-words leading-relaxed select-all">
                              {prompt.promptText}
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* --- Footer Signature panel --- */}
      <footer className="border-t border-neutral-950 bg-neutral-950/20 py-6 text-center text-xs text-neutral-600 block mt-12 w-full flex-shrink-0" id="footer-layout">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#34d399]/70 border border-[#34d399] animate-pulse" />
            <p className="font-semibold text-neutral-400">
              {t.pwaReady}
            </p>
          </div>
          <p className="font-medium tracking-wide">
            ✦ Portrait Prompt Builder & Custom Database Architect workbench.
          </p>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* ==================== MODALS CONFIGURATORS POPUPS ======================== */}
      {/* ========================================================================= */}

      {/* 1. Modal: EDIT/CREATE CATEGORY */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-neutral-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-md"
            >
              <div className="px-5 py-4 bg-neutral-950 border-b border-neutral-900 flex items-center justify-between">
                <h3 className="text-xs uppercase font-serif tracking-widest font-black text-[#eeddc5]">
                  {editingCategory ? t.editCategory : t.addCategory}
                </h3>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="text-neutral-500 hover:text-white transition-all hover:bg-neutral-900 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  handleSaveCategory(
                    fd.get('titleUa') as string,
                    fd.get('titleRu') as string,
                    fd.get('titleEn') as string
                  );
                }}
                className="p-5 space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.categoryTitleUa}
                  </label>
                  <input
                    type="text"
                    name="titleUa"
                    required
                    defaultValue={editingCategory?.title.ua || ''}
                    placeholder="напр., Освітлення"
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.categoryTitleRu}
                  </label>
                  <input
                    type="text"
                    name="titleRu"
                    required
                    defaultValue={editingCategory?.title.ru || ''}
                    placeholder="напр., Освещение"
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.categoryTitleEn}
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    required
                    defaultValue={editingCategory?.title.en || ''}
                    placeholder="e.g., Lighting"
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-950">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-xs font-bold uppercase text-neutral-400 rounded-lg transition-all"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#c8a882] hover:bg-[#eeddc5] text-black text-xs font-black uppercase tracking-widest rounded-lg transition-all"
                  >
                    {t.saveBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Modal: EDIT/CREATE SUBCATEGORY */}
      <AnimatePresence>
        {isSubcategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-neutral-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-md"
            >
              <div className="px-5 py-4 bg-neutral-950 border-b border-neutral-900 flex items-center justify-between">
                <h3 className="text-xs uppercase font-serif tracking-widest font-black text-[#eeddc5]">
                  {editingSubcategory ? t.editSubcategory : t.addSubcategory}
                </h3>
                <button
                  onClick={() => setIsSubcategoryModalOpen(false)}
                  className="text-neutral-500 hover:text-white transition-all hover:bg-neutral-900 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  handleSaveSubcategory(
                    fd.get('subUa') as string,
                    fd.get('subRu') as string,
                    fd.get('subEn') as string
                  );
                }}
                className="p-5 space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.subcategoryTitleUa}
                  </label>
                  <input
                    type="text"
                    name="subUa"
                    required
                    defaultValue={editingSubcategory?.title.ua || ''}
                    placeholder="напр., Колір очей"
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.subcategoryTitleRu}
                  </label>
                  <input
                    type="text"
                    name="subRu"
                    required
                    defaultValue={editingSubcategory?.title.ru || ''}
                    placeholder="напр., Цвет глаз"
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.subcategoryTitleEn}
                  </label>
                  <input
                    type="text"
                    name="subEn"
                    required
                    defaultValue={editingSubcategory?.title.en || ''}
                    placeholder="e.g., Eye Color"
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-950">
                  <button
                    type="button"
                    onClick={() => setIsSubcategoryModalOpen(false)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-xs font-bold uppercase text-neutral-400 rounded-lg transition-all"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#c8a882] hover:bg-[#eeddc5] text-black text-xs font-black uppercase tracking-widest rounded-lg transition-all"
                  >
                    {t.saveBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Modal: EDIT/CREATE TAG (WITH ALL MULTILINGUAL ATTRIBUTES) */}
      <AnimatePresence>
        {isTagModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-neutral-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-xl"
            >
              <div className="px-5 py-4 bg-neutral-950 border-b border-neutral-900 flex items-center justify-between">
                <h3 className="text-xs uppercase font-serif tracking-widest font-black text-[#eeddc5]">
                  {editingTag ? t.editTag : t.addTag}
                </h3>
                <button
                  onClick={() => setIsTagModalOpen(false)}
                  className="text-neutral-500 hover:text-white transition-all hover:bg-neutral-900 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  handleSaveTag(
                    fd.get('labelUa') as string,
                    fd.get('labelRu') as string,
                    fd.get('labelEn') as string,
                    fd.get('valueUa') as string,
                    fd.get('valueRu') as string,
                    fd.get('valueEn') as string
                  );
                }}
                className="p-5 space-y-4"
              >
                
                {/* Visual Label Section */}
                <div className="border border-neutral-950 p-4 rounded-xl space-y-4.5 bg-neutral-950/60 leading-normal">
                  <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#eeddc5]">
                     Назви тегу в меню спрощеного вибору
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">
                        {t.tagLabelUa}
                      </label>
                      <input
                        type="text"
                        name="labelUa"
                        required
                        defaultValue={editingTag?.label.ua || ''}
                        placeholder="Крижане синє"
                        className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">
                        {t.tagLabelRu}
                      </label>
                      <input
                        type="text"
                        name="labelRu"
                        required
                        defaultValue={editingTag?.label.ru || ''}
                        placeholder="Ледяное синее"
                        className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">
                        {t.tagLabelEn}
                      </label>
                      <input
                        type="text"
                        name="labelEn"
                        required
                        defaultValue={editingTag?.label.en || ''}
                        placeholder="Ice Blue"
                        className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882]"
                      />
                    </div>
                  </div>
                </div>

                {/* Prompt insertion variables input context */}
                <div className="border border-neutral-950 p-4 rounded-xl space-y-4.5 bg-neutral-950/60 leading-normal">
                  <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#eeddc5]">
                     Значення, яке безпосередньо вбудовується у фінальний промпт
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">
                        {t.tagValueUa}
                      </label>
                      <textarea
                        rows={2}
                        name="valueUa"
                        required
                        defaultValue={editingTag?.value.ua || ''}
                        placeholder="крижані кришталеві пронизливі блакитні очі"
                        className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">
                        {t.tagValueRu}
                      </label>
                      <textarea
                        rows={2}
                        name="valueRu"
                        required
                        defaultValue={editingTag?.value.ru || ''}
                        placeholder="ледяные кристальные пронзительные голубые глаза"
                        className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">
                        {t.tagValueEn}
                      </label>
                      <textarea
                        rows={2}
                        name="valueEn"
                        required
                        defaultValue={editingTag?.value.en || ''}
                        placeholder="piercing cold glowing ice blue eyes"
                        className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-950">
                  <button
                    type="button"
                    onClick={() => setIsTagModalOpen(false)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-xs font-bold uppercase text-neutral-400 rounded-lg transition-all"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#c8a882] hover:bg-[#eeddc5] text-black text-xs font-black uppercase tracking-widest rounded-lg transition-all"
                  >
                    {t.saveBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Modal: SAVE PROMPT TO DIRECTORY VAULT */}
      <AnimatePresence>
        {isSavePromptModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-neutral-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-md"
            >
              <div className="px-5 py-4 bg-neutral-950 border-b border-neutral-900 flex items-center justify-between">
                <h3 className="text-xs uppercase font-serif tracking-widest font-black text-[#eeddc5]">
                  {t.savePromptTitle}
                </h3>
                <button
                  onClick={() => setIsSavePromptModalOpen(false)}
                  className="text-neutral-500 hover:text-white transition-all hover:bg-neutral-900 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Назва збереженого промпту
                  </label>
                  <input
                    type="text"
                    value={newPromptName}
                    onChange={(e) => setNewPromptName(e.target.value)}
                    placeholder={t.promptNamePlaceholder}
                    required
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.selectFolder}
                  </label>
                  <select
                    value={selectedFolderForPrompt}
                    onChange={(e) => setSelectedFolderForPrompt(e.target.value)}
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                  >
                    <option value="">{t.noFolder}</option>
                    {state.folders.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-950">
                  <button
                    onClick={() => setIsSavePromptModalOpen(false)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-xs font-bold uppercase text-neutral-400 rounded-lg transition-all"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    onClick={handleCreatePromptSave}
                    className="px-5 py-2 bg-[#c8a882] hover:bg-[#eeddc5] text-black text-xs font-black uppercase tracking-widest rounded-lg transition-all"
                  >
                    {t.saveBtn}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Modal: CREATE FOLDER */}
      <AnimatePresence>
        {isFolderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-neutral-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-md"
            >
              <div className="px-5 py-4 bg-neutral-950 border-b border-neutral-900 flex items-center justify-between">
                <h3 className="text-xs uppercase font-serif tracking-widest font-black text-[#eeddc5]">
                  {t.createFolderBtn}
                </h3>
                <button
                  onClick={() => setIsFolderModalOpen(false)}
                  className="text-neutral-500 hover:text-white transition-all hover:bg-neutral-900 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Назва нової теки / проекту
                  </label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder={t.folderNamePlaceholder}
                    required
                    className="w-full bg-[#080808] border border-neutral-900 hover:border-neutral-850 focus:border-[#c8a882] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c8a882] transition-all"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-950">
                  <button
                    onClick={() => setIsFolderModalOpen(false)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-xs font-bold uppercase text-neutral-400 rounded-lg transition-all"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    onClick={handleCreateFolder}
                    className="px-5 py-2 bg-[#c8a882] hover:bg-[#eeddc5] text-black text-xs font-black uppercase tracking-widest rounded-lg transition-all"
                  >
                    {t.saveBtn}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
