import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export default function AddCourse({ handleSubmit }) {

  const [courseTitle, setCourseTitle] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [courseModules, setCourseModules] = useState('');
  const [courseAbb, setCourseAbb] = useState('');

  const [newCourse, setNewCourse] = useState(
    {
      title: '',
      fee: '',
      modules: '',
      abbreviation: ''
    }
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const postNewCourse = () => {

    fetch('http://localhost:9090/course/addCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    })
      .then(response => response.json())
      .then(data => {
        setNewCourse({
          title: '',
          fee: '',
          modules: '',
          abbreviation: ''
        })
        setCourseAbb('');
        setCourseFee('');
        setCourseModules('');
        setCourseTitle('');

        handleSubmit();
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleSelect = (e) => {
    console.log(e);
    setCourseModules(e);

    setNewCourse({
      title: courseTitle,
      fee: courseFee,
      modules: e,
      abbreviation: courseAbb
    });

  }
  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setCourseTitle(e.target.value);

    setNewCourse({
      title: e.target.value,
      fee: courseFee,
      modules: courseModules,
      abbreviation: courseAbb
    });

  }
  const handleFeeChange = (e) => {
    console.log(e.target.value);
    setCourseFee(e.target.value);

    setNewCourse({
      title: courseTitle,
      fee: e.target.value,
      modules: courseModules,
      abbreviation: courseAbb
    });

  }
  const handleAbbChange = (e) => {
    console.log(e.target.value);
    setCourseAbb(e.target.value);

    setNewCourse({
      title: courseTitle,
      fee: courseFee,
      modules: courseModules,
      abbreviation: e.target.value
    });

  }
  const handleSubmitForm = () => {

    postNewCourse();

    handleOpen();
  }
  console.log(newCourse);

  return (
    <>
      <Button onClick={handleOpen} className='flex flex-row w-full justify-center items-center text-sm'>Add new course <UserPlusIcon className="h-5 w-5" /></Button>
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
              Add Course
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Title" size="lg" onChange={handleTitleChange} value={courseTitle} />
            <Input label="Abb" size="lg" onChange={handleAbbChange} value={courseAbb} />
            <Input type="number" label="Fee" size="lg" onChange={handleFeeChange} value={courseFee} />
            <div className="w-full">
              <Select label="Modules" value={courseModules} onChange={handleSelect}>
                <Option value="6">6</Option>
                <Option value="12">12</Option>
                <Option value="18">18</Option>
              </Select>
            </div>
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
