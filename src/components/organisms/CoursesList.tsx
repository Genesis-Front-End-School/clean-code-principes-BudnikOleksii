import { FC } from 'react';
import { ICourse } from '../../types/course';
import { CourseCard } from './CourseCard';
import { GridContainer } from '../../lib/dist';

interface Props {
  courses: ICourse[];
}

export const CoursesList: FC<Props> = ({ courses }) => {
  return (
    <GridContainer>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} isWithLink={true} />
      ))}
    </GridContainer>
  );
};
