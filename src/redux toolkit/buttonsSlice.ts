import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PERMISSION_CODES } from 'src/constants/enums/permission';

interface ButtonProps {
  id: string;
  className?: string;
  action?: PERMISSION_CODES;
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  icon?: React.ReactNode;
  onClick?: () => void;
  children: string;
}

interface ButtonsState {
  buttons: ButtonProps[];
}

const initialState: ButtonsState = {
  buttons: [],
};
export type { ButtonProps };

const buttonsSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    addButton: (state, action: PayloadAction<ButtonProps>) => {
      state.buttons.push(action.payload);
    },
    removeButton: (state, action: PayloadAction<string>) => {
      state.buttons = state.buttons.filter(
        button => button.id !== action.payload,
      );
    },
    resetButton: state => {
      state.buttons = [];
    },
  },
});

export const { addButton, removeButton, resetButton } = buttonsSlice.actions;

export default buttonsSlice.reducer;
