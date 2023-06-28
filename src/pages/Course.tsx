import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCourses } from '../features/courses/courses-selectors';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { courseLoadingStart } from '../features/courses/courses-slice';
import { selectIsActionInProcess } from '../features/actions-info/actions-info-selector';
import Box from '@mui/material/Box';
import { CourseCard } from '../components/organisms/CourseCard';
import { CourseContent } from '../components/organisms/CourseContent';
import NotFound from './NotFound';

const Course = () => {
  const { courseId } = useParams();
  const dispatch = useAppDispatch();
  const { selectedCourse } = useAppSelector(selectCourses);
  const isLoading = useAppSelector(selectIsActionInProcess(courseLoadingStart.type));

  useEffect(() => {
    dispatch(registerAction(courseLoadingStart.type));
    dispatch(courseLoadingStart({ courseId: courseId! }));
  }, [courseId]);

  return (
    <>
      {selectedCourse && !isLoading && (
        <Box component="section">
          <CourseCard course={selectedCourse} />
          <CourseContent lessons={selectedCourse.lessons} />
        </Box>
      )}

      {!selectedCourse && !isLoading && <NotFound />}
    </>
  );
};

export default Course;
