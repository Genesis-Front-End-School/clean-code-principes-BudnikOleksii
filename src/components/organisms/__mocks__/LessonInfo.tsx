import { FC } from 'react';
import { ILesson } from '../../../types/course';

interface Props {
  lesson: ILesson;
  onCurrentChange: (lesson: ILesson) => void;
}

export const LessonInfo: FC<Props> = ({ lesson, onCurrentChange }) => (
  <div data-testid="lesson-info" onClick={() => onCurrentChange(lesson)}>
    Mocked LessonInfo
  </div>
);
