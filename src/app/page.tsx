"use client";

import { useState } from "react";

import { Container } from "@/components/Container";
import { GPATable } from "@/components/GPATable";
import { InputForm } from "@/components/InputForm";
import type { Course } from "@/types/course.types";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <Container>
      <InputForm addCourse={addCourse} />
      <GPATable
        courses={courses}
        setCourses={setCourses}
        removeCourse={removeCourse}
      />
    </Container>
  );
}
