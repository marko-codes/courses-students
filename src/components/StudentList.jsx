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

import AddStudent from './AddStudent';
import AssignCourse from './AssignCourse';

function StudentList() {

  const [students, setStudents] = useState([]);

  const fetchingStudents = () => {
    fetch('http://localhost:9090/student')
      .then(response => response.json())
      .then(result => {
        setStudents(result);
      })
      .catch(error => {
        console.log('Error fetching students: ', error);
      });
  }

  const deleteStudent = (sId) => {

    fetch(`http://localhost:9090/student/removeStudent/${sId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        handleRefreshStudents();
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetchingStudents();
  }, []);

  const handleRefreshStudents = () => {
    fetchingStudents();
  };


  return (
    <Card className="sm:w-11/12 lg:w-2/3">
      <AddStudent handleSubmit={handleRefreshStudents} />
      <List>

        {
          students.map(student => {
            //console.log(student.courses);
            return <ListItem key={student.id} ripple={false} className=' focus:bg-transparent hover:bg-transparent'>
              <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src={avatar} />
              </ListItemPrefix>
              <div className='flex flex-row items-center justify-between w-full'>
                <div className='flex flex-col'>
                  <Typography variant="h6" color="blue-gray">
                    {student.name} ({student.department})
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    Assigned courses:
                    {
                      student.courses.map((assignedCourses, index) => {
                        const isLast = index === student.courses.length - 1;
                        const separator = isLast ? '.' : ',';
                        return ' ' + assignedCourses.abbreviation + separator;
                      })
                    }

                  </Typography>
                </div>
                <div className='flex'>
                  <AssignCourse studentId={student.id} studentCourses={student.courses} onSubmit={handleRefreshStudents} />
                  <IconButton variant="text" color="red" onClick={() => deleteStudent(student.id)}>
                    <TrashIcon className="h-5 w-5" />
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


export default StudentList

