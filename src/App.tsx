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
import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import "./style.css";

function App() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchemaType>({
    defaultValues: initialFormValues,
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    try {
      // Upload file
      console.log("vshgdcvshdcvisdc scd jsdnc ", data);
      const uploadedFile = await uploadFile(data.resume[0]);
      console.log("File uploaded:", uploadedFile);

      // Save form data with file path to local storage
      const formDataWithFilePath = { ...data, resume: uploadedFile };
      localStorage.setItem("formData", JSON.stringify(formDataWithFilePath));
      console.log(formDataWithFilePath);
      // Show success message
      toast({
        title: "Success!",
        description: `Form submitted successfully`,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error!",
        description: `Failed to submit form`,
      });
    }
  };

  const uploadFile = async (file: any) => {
    // Simulate file upload process
    console.log(file);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`/assets/${file?.name}`); // Assuming file is uploaded to /uploads folder
      }, 2000);
    });
  };

  const handleReset = () => {
    reset(initialFormValues);
    localStorage.removeItem("formData");
  };

  return (
    <div className="flex justify-center items-center h-screen px-10">
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
                  <Input id="name" placeholder="Name" {...register("name")} />
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Your Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    type="text"
                    placeholder="Experience (in years)"
                    {...register("experience")}
                  />
                  {errors.experience && (
                    <span className="text-red-500">
                      {errors.experience.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register("resume")}
                  />
                  {errors.resume && (
                    <span className="text-red-500">
                      {"Image file validation error!"}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </div>
        <CardFooter className="flex justify-end gap-5">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button
            type="button"
            id="submitButton"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}

export default App;

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email address"),
  experience: z.string().min(0, { message: "Experience cannot be negative" }),
  resume: z.custom((file: any) => {
    if (!file) {
      return "Image is required";
    }
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!acceptedImageTypes.includes(file.type)) {
      return "Invalid file type. Please upload an image (JPEG, PNG, or GIF)";
    }
    return true;
  }),
});

type ValidationSchemaType = z.infer<typeof validationSchema>;

const initialFormValues: ValidationSchemaType = {
  name: "",
  email: "",
  experience: "",
  resume: "",
};
