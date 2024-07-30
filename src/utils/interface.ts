export type pluginType = {
  author: { firstName: string; lastName: string; id: string };
  user: { firstName: string; lastName: string; _id: string };
  category: string;
  createdAt: Date;
  description: any;
  instruction_visibility: string;
  name: string;
  updatedAt: Date;
  users: number;
  visibility: string;
  _id: string;
  preceeding_text: string;
  instruction: string;
  allow_user_interactions: boolean;
  popup_instruction: string;
  advanceSettings: {
    popup_instruction: string;
    allow_user_instructions: boolean;
    highlited_text_config: {
      min: string;
      max: string;
    };
    preceeding_text_config: {
      min: string;
      max: string;
    };
    preceeding_text: null;
  };
  installed: boolean;
};
