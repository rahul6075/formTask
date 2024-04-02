import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import "./style.css";
function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[550px] border border-gray-300 shadow-lg flex flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <CardDescription>Fill all the required information</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Your Email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="Experience(in years)"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Job Profile</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">NodeJs Developer</SelectItem>
                      <SelectItem value="sveltekit">
                        Full Stack Developer
                      </SelectItem>
                      <SelectItem value="astro">Python Developer</SelectItem>
                      <SelectItem value="nuxt">React JS Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
        </div>
        <CardFooter className="flex justify-end gap-5">
          <Button variant="outline">Reset</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
