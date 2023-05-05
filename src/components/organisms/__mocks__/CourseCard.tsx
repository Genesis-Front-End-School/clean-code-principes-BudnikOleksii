import { ICourse } from '../../../types/course';

export const CourseCard = ({ course }: { course: ICourse }) => (
  <div data-testid="course-card">Mocked CourseCard for {course.title}</div>
);
