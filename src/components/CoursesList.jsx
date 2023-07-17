import React, { useEffect, useState } from 'react'
import avatar from '../img/avatar.png'
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  IconButton,

} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import AddCourse from './AddCourse';

function CourseList() {

  const [courses, setCourses] = useState([]);

  const fetchingCourses = () => {
    fetch('http://localhost:9090/course')
      .then(response => response.json())
      .then(result => {
        setCourses(result);
      })
      .catch(error => {
        console.log('Error fetching courses: ', error);
      });
  }
  const deleteCourse = (cId) => {

    fetch(`http://localhost:9090/course/removeCourse/${cId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        handleRefreshCourses();
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetchingCourses();
  }, []);

  const handleRefreshCourses = () => {
    fetchingCourses();
  };


  return (
    <Card className="sm:w-11/12 lg:w-2/3">
      <AddCourse handleSubmit={handleRefreshCourses} />
      <List>

        {
          courses.map(course => {
            console.log(course.courses);
            return <ListItem key={course.id} ripple={false} className=' focus:bg-transparent hover:bg-transparent'>
              <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src={avatar} />
              </ListItemPrefix>
              <div className='flex flex-row items-center justify-between w-full'>
                <div className='flex flex-col'>
                  <Typography variant="h6" color="blue-gray">
                    {course.title} ({course.abbreviation})
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    Fee: {course.fee} Modules: {course.modules}
                  </Typography>
                </div>
                <div className='flex'>
                  <IconButton variant="text" color="red">
                    <TrashIcon className="h-5 w-5" onClick={() => deleteCourse(course.id)} />
                  </IconButton>
                </div>
              </div>
            </ListItem>
          })
        }


      </List>
    </Card>
  );
}


export default CourseList

