import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { selectCourses } from '../features/courses/courses-selectors';
import { coursesLoadingStart } from '../features/courses/courses-slice';
import { Heading } from '../components/molecules/Heading';
import { CoursesList } from '../components/organisms/CoursesList';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { COURSES_PER_PAGE, PATHS } from '../constants';

const Courses = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const { courses } = useAppSelector(selectCourses);
  const currentPage = Number(page) || 1;
  const indexOfLastHero = currentPage * COURSES_PER_PAGE;
  const indexOfFirstHero = indexOfLastHero - COURSES_PER_PAGE;

  useEffect(() => {
    dispatch(registerAction(coursesLoadingStart.type));
    dispatch(coursesLoadingStart());
  }, []);

  const handlePageChange = (page: number) => {
    navigate(`${PATHS.courses}?page=${page}`);
  };

  return (
    <div>
      <Heading title="Courses" />

      {courses && courses.length > 0 && (
        <CoursesList
          courses={courses.slice(indexOfFirstHero, indexOfLastHero)}
        />
      )}

      {courses && courses.length === 0 && (
        <Typography variant="h5">There no courses yet</Typography>
      )}

      {courses && courses.length > 0 && (
        <Pagination
          sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
          count={Math.ceil(courses?.length / COURSES_PER_PAGE)}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={(_, pageNumber) => {
            handlePageChange(pageNumber);
          }}
        />
      )}
    </div>
  );
};

export default Courses;
