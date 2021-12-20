import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagItem, TagState } from '@/interface/layout/tagsView.interface';

const initialState: TagState = {
  activeTagId: '',
  tags: []
};

const tagsViewSlice = createSlice({
  name: 'tagsView',
  initialState,
  reducers: {
    setActiveTag(state, action: PayloadAction<string>) {
      state.activeTagId = action.payload;
    },
    addTag(state, action: PayloadAction<TagItem>) {
      if (!state.tags.find(tag => tag.id === action.payload.id)) {
        state.tags.push(action.payload);
      }

      state.activeTagId = action.payload.id;
    },
    removeTag(state, action: PayloadAction<string>) {
      const targetKey = action.payload;
      // dashboard cloud't be closed
      if (targetKey === state.tags[0].id) {
        return;
      }

      const activeTagId = state.activeTagId;
      const currentIndex = state.tags.findIndex(n => n.id === targetKey);
      const lastIndex = currentIndex - 1;
      state.tags.splice(currentIndex, 1);

      if (state.tags.length && activeTagId === targetKey) {
        if (lastIndex >= 0) {
          state.activeTagId = state.tags[lastIndex].id;
        } else {
          state.activeTagId = state.tags[0].id;
        }
      }
      console.log('state', state.activeTagId);
    },
    removeAllTag(state) {
      state.activeTagId = state.tags[0].id;
      state.tags = [state.tags[0]];
    },
    removeOtherTag(state) {
      const activeTag = state.tags.find(tag => tag.id === state.activeTagId);
      const activeIsDashboard = activeTag!.id === state.tags[0].id;

      state.tags = activeIsDashboard ? [state.tags[0]] : [state.tags[0], activeTag!];
    }
  }
});

export const { setActiveTag, addTag, removeTag, removeAllTag, removeOtherTag } = tagsViewSlice.actions;

export default tagsViewSlice.reducer;
