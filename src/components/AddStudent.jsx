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

export default function AddStudent({ handleSubmit }) {

  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentDepartment, setStudentDepartment] = useState('');

  const [newStudent, setNewStudent] = useState(
    {
      name: '',
      age: '',
      department: ''
    }
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const postNewStudent = () => {

    fetch('http://localhost:9090/student/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then(response => response.json())
      .then(data => {
        setNewStudent({
          name: '',
          age: '',
          department: ''
        })
        setStudentName('');
        setStudentAge('');
        setStudentDepartment('');
        handleSubmit();
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleSelect = (e) => {
    console.log(e);
    setStudentDepartment(e);

    setNewStudent({
      name: studentName,
      age: studentAge,
      department: e
    });
  }
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setStudentName(e.target.value);

    setNewStudent({
      name: e.target.value,
      age: studentAge,
      department: studentDepartment
    });
  }
  const handleAgeChange = (e) => {
    console.log(e.target.value);
    setStudentAge(e.target.value);

    setNewStudent({
      name: studentName,
      age: e.target.value,
      department: studentDepartment
    });
  }
  const handleSubmitForm = () => {

    postNewStudent();

    handleOpen();
  }
  console.log(newStudent);

  return (
    <>
      <Button onClick={handleOpen} className='flex flex-row w-full justify-center items-center text-sm'>Add new student <UserPlusIcon className="h-5 w-5" /></Button>
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
              Add Student
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" onChange={handleNameChange} value={studentName} />
            <Input type="number" label="Age" size="lg" onChange={handleAgeChange} value={studentAge} />
            <div className="w-full">
              <Select label="Department" value={studentDepartment} onChange={handleSelect}>
                <Option value="Frontend">Frontend</Option>
                <Option value="Backend">Backend</Option>
                <Option value="Full Stack">Full Stack</Option>
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
