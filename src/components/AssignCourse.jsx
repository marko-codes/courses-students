import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  List,
  ListItem,
  Checkbox,

} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function AssignCourse({ studentId, onSubmit }) {


  const [student, setStudent] = useState({});

  const [coursesId, setCoursesId] = useState([]);

  const [courses, setCourses] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const fetchingStudent = () => {
    fetch(`http://localhost:9090/student/findById/${studentId}`)
      .then(response => response.json())
      .then(result => {
        setStudent(result);
      })
      .catch(error => {
        console.error('Error fetching courses: ', error);
      });
  };

  const fetchingCourses = () => {
    fetch('http://localhost:9090/course')
      .then(response => response.json())
      .then(result => {
        setCourses(result);
      })
      .catch(error => {
        console.error('Error fetching courses: ', error);
      });
  };

  useEffect(() => {
    fetchingStudent();
    fetchingCourses();
  }, []);


  const handleCheckbox = (id) => {

    const courseIdChecked = coursesId.some((cId) => cId === id);
    if (courseIdChecked) {
      const newCoursesIds = coursesId.filter((cId) => cId !== id);
      setCoursesId(newCoursesIds);
    } else {
      setCoursesId((prev) => [...prev, id]);
    }


  };

  const handleSubmitForm = () => {

    if (coursesId.length <= 0) {
      return;
    }
    fetch(`http://localhost:9090/student/assignCourseToStudent/${studentId}/${coursesId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        setCoursesId([]);
        console.log(result);
        fetchingStudent();
        onSubmit();
      })
      .catch(error => {

        console.log('Error assigning courses to student: ', error);
      });



    setCoursesId([]);

    handleOpen();
  };


  return (
    <>
      <Button onClick={handleOpen} className='flex flex-row w-32 justify-center items-center text-sm'>Course <PlusCircleIcon className="h-5 w-5" /></Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Assign Course
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <List>

              {
                courses?.map(course => {
                  const isCourseAssigned = student.courses?.some((assignedCourse) => assignedCourse.id === course.id);
                  const isCourseChecked = coursesId?.some((checkedId) => checkedId === course.id);
                  return <ListItem key={course.id} ripple={false} className="focus:bg-transparent hover:bg-transparent" onClick={() => handleCheckbox(course.id)}>
                    <div className='flex flex-row items-center justify-between w-full'>
                      <div className='flex flex-col'>
                        <Typography variant="h6" color="blue-gray">
                          {course.title}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                          Modules: {course.modules}, Fee: {course.fee}
                        </Typography>
                      </div>
                      <div className='flex'>

                        <Checkbox key={course.id} ripple={false} className="hover:before:opacity-0" color={isCourseAssigned ? "gray" : "blue"} readOnly={isCourseAssigned} checked={isCourseAssigned ? true : isCourseChecked} onChange={() => { }} />

                      </div>
                    </div>
                  </ListItem>
                })
              }



            </List>
          </CardBody>
          <CardFooter className="pt-0">
            <Button color="green" variant="gradient" onClick={handleSubmitForm} fullWidth>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
