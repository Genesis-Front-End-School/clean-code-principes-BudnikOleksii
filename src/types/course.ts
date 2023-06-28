import { Id, Maybe } from './helper-types';

export interface ICourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}

interface IMetaData {
  slug: string;
  skills?: string[];
  courseVideoPreview?: ICourseVideoPreview;
  fullCourseProductId?: string;
  fullCourseProductFamily?: string;
}

export interface ILesson {
  id: Id;
  duration: number;
  link: string;
  meta: Maybe<IMetaData>;
  order: number;
  previewImageLink: string;
  status: 'locked' | 'unlocked';
  title: string;
  type: 'article' | 'video' | 'quiz_simulator';
  currentTime?: number;
}

export interface ICourse {
  id: Id;
  title: string;
  tags: string[];
  launchDate: string | 'launched';
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: IMetaData;
}

export interface ICoursesResponse {
  courses: ICourse[];
}

export interface ICourseResponse extends ICourse {
  lessons: ILesson[];
}
