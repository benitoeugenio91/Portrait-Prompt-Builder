import { Category } from './types';

export const DEMO_DATABASE: Category[] = [
  {
    id: "cat_eyes",
    title: {
      ua: "Очі",
      ru: "Глаза",
      en: "Eyes"
    },
    subcategories: [
      {
        id: "sub_color",
        title: {
          ua: "Колір райдужки",
          ru: "Цвет радужки",
          en: "Iris Color"
        },
        tags: [
          {
            id: "tag_emerald",
            label: { ua: "Смарагдово-зелений", ru: "Изумрудно-зеленый", en: "Emerald Green" },
            value: {
              ua: "смарагдово-зелена чарівна райдужка",
              ru: "изумрудно-зеленая радужка",
              en: "emerald green eyes"
            }
          },
          {
            id: "tag_blue",
            label: { ua: "Крижаний синій", ru: "Ледяной синий", en: "Ice Blue" },
            value: {
              ua: "крижані пронизливі блакитні очі",
              ru: "ледяные пронзительные голубые глаза",
              en: "piercing cold ice blue eyes"
            }
          }
        ]
      }
    ]
  },
  {
    id: "cat_lighting",
    title: {
      ua: "Освітлення",
      ru: "Освещение",
      en: "Lighting"
    },
    subcategories: [
      {
        id: "sub_light_type",
        title: {
          ua: "Тип світла",
          ru: "Тип света",
          en: "Light Type"
        },
        tags: [
          {
            id: "tag_cinematic",
            label: { ua: "Кінематографічне", ru: "Кинематографичное", en: "Cinematic lighting" },
            value: {
              ua: "драматичне кінематографічне освітлення з глибокими тінями",
              ru: "драматичное кинематографичное освещение с глубокими тенями",
              en: "dramatic cinematic lighting with deep moody shadows"
            }
          }
        ]
      }
    ]
  }
];
