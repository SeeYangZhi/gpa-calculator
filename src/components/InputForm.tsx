import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function InputForm() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Add Course</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the course details to add it to your record
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="course-code">Course Code</Label>
          <Input id="course-code" placeholder="Enter course code" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            placeholder="Enter number of units"
            required
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Select>
            <SelectTrigger id="grade">
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="D">D</SelectItem>
              <SelectItem value="E">E</SelectItem>
              <SelectItem value="F">F</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" type="submit">
          Add Course
        </Button>
      </div>
    </div>
  );
}
