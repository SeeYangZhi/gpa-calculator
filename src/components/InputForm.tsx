"use client";

import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Course } from "./course.types";
// import { toast } from "@/components/ui/use-toast";

interface InputFormProps {
  addCourse: (course: Course) => void;
}

const Course = z.object({
  course: z.string().default("CS1231S"),
  grade: z
    .string({
      required_error: "Please select a grade."
    })
    .default("A"),
  credit: z.coerce
    .number({
      required_error: "Please enter the unit."
    })
    .refine((val) => val >= 0, "Credit cannot be negative.")
    .default(4)
});

export function InputForm({ addCourse }: InputFormProps) {
  const form = useForm<z.infer<typeof Course>>({
    resolver: zodResolver(Course)
  });

  const onSubmit = (data: z.infer<typeof Course>) => {
    addCourse({ id: uuidv4(), ...data });
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Add Course</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the course details to calculate your GPA
        </p>
      </div>
      <div className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-md space-y-6"
          >
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CS1231S"
                      defaultValue={"CS1231S"}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="4"
                      defaultValue={4}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="A" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="C+">C+</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D+">D+</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Add Course
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
