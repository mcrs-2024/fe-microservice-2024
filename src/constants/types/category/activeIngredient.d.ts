export type TActiveIngredient = {
  id: string | null;
  interactionGroupId: string | null;
  drugActiveIngredientCode01: string | null;
  drugActiveIngredientName01: string | null;
  drugActiveIngredientCode02: string | null;
  drugActiveIngredientName02: string | null;
  levelCode: string | null;
  levelName: string | null;
  interactiveLaunch: string | null;
  mechanismConsequence: string | null;
  handlingManagement: string | null;
  referenceSource: string | null;
};

export type TGroupActiveIngredient = {
  id: string | null;
  interactionGroupCode: string | null;
  interactionGroupName: string | null;
  descripton: string | null;
  seqNum: string | null;
};

export type TActiveIngredientFields = keyof TActiveIngredient;

export type ActiveIngredientModalType = 'add' | 'edit' | 'view';

export type TFilterActiveIngredient = {
  interactionGroupId: string | null;
  levelName: string | null;
  ingredientCode01: string | null;
  ingredientName01: string | null;
  ingredientCode02: string | null;
  ingredientName02: string | null;
  levelCode: string | null;
};
