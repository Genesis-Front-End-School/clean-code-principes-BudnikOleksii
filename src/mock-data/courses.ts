import { ICourse, ICourseResponse, ILesson } from '../types/course';

export const mockCourse: ICourse = {
  id: '352be3c6-848b-4c19-9e7d-54fe68fef183',
  title: 'Lack of Motivation & How to Overcome It',
  tags: ['productivity'],
  launchDate: '2023-03-06T16:50:06.000Z',
  status: 'launched',
  description: 'Reignite your inner drive by managing factors that dampen your motivation.',
  duration: 521,
  lessonsCount: 2,
  containsLockedLessons: true,
  previewImageLink:
    'https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it',
  rating: 3.5,
  meta: {
    slug: 'lack-of-motivation-how-to-overcome-it',
    skills: ['Aligning your goals with your motives'],
    courseVideoPreview: {
      link: 'https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8',
      duration: 27,
      previewImageLink:
        'https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/preview',
    },
  },
};

export const mockCourses = [mockCourse];
export const mockLesson: ILesson = {
  duration: 255,
  id: '278e5a0e-8df1-4646-9984-10289d52dc2d',
  link: 'https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/lesson-1/AppleHLS1/lesson-1.m3u8',
  meta: null,
  order: 1,
  previewImageLink:
    'https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1',
  status: 'unlocked',
  title: 'Why we lack motivation',
  type: 'video',
};
export const mockLesson2 = {
  ...mockLesson,
  id: '125be3c6-848b-4c19-9e7d-54ash8fef183',
};

export const mockLessons = [mockLesson, mockLesson2];
export const mockCourseWithLessons: ICourseResponse = {
  ...mockCourse,
  meta: { ...mockCourse.meta },
  lessons: mockLessons,
};
