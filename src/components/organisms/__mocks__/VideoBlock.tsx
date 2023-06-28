import { FC } from 'react';
import { ILesson } from '../../../types/course';

interface Props {
  lesson: ILesson;
}

export const VideoBlock: FC<Props> = ({ lesson }) => (
  <div data-testid="video-block">Video Block for {lesson.title}</div>
);
