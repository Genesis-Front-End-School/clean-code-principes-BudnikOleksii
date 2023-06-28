import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { ICourse, ICourseResponse, ILesson } from '../../types/course';

interface CoursesState {
  courses: Maybe<ICourse[]>;
  selectedCourse: Maybe<ICourseResponse>;
}

const initialState: CoursesState = {
  courses: null,
  selectedCourse: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    coursesLoadingStart: (state) => {},
    coursesSuccess: (state, action: PayloadAction<ICourse[]>) => {
      state.courses = action.payload;
    },
    courseLoadingStart: (state, action: PayloadAction<{ courseId: string }>) => {},
    courseSuccess: (state, action: PayloadAction<ICourseResponse>) => {
      state.selectedCourse = action.payload;
      state.selectedCourse.lessons.sort((a, b) => a.order - b.order);
    },
    updateCurrentTime: (state, action: PayloadAction<ILesson>) => {
      const updatedLessons = state.selectedCourse!.lessons.map((lesson) =>
        lesson.id !== action.payload.id ? lesson : action.payload
      );

      state.selectedCourse = {
        ...state.selectedCourse!,
        lessons: updatedLessons,
      };
    },
  },
});

export const {
  coursesLoadingStart,
  coursesSuccess,
  courseLoadingStart,
  courseSuccess,
  updateCurrentTime,
} = coursesSlice.actions;

export default coursesSlice.reducer;
