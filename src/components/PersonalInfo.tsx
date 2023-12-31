import { SubmitHandler, useForm } from "react-hook-form";
import useFormContext from "../hooks/useFormContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Buttons from "./Buttons";

const PersonalInfoSchema = z.object({
  name: z.string().nonempty("This field is required"),
  email: z
    .string()
    .nonempty("This field is required")
    .email("Email format is invalid")
    .endsWith("com"),
  phone: z
    .string()
    .nonempty("This field is required")
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
});

const PersonalInfo = () => {
  const { formDetails, setFormDetails, setCurrentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string; phone: string }>({
    defaultValues: {
      name: formDetails?.name,
      email: formDetails?.email,
      phone: formDetails?.phone,
    },
    resolver: zodResolver(PersonalInfoSchema),
  });

  const onSubmit: SubmitHandler<{
    name: string;
    email: string;
    phone: string;
  }> = (data) => {
    const { name, email, phone } = data;

    setFormDetails((prevInfo) => ({
      ...prevInfo,
      name: name,
      email: email,
      phone: phone,
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 grid gap-4">
          <div>
            <div className="flex justify-between">
              <label htmlFor="name" className="mb-1 text-primary-Marine-blue">
                Name{" "}
              </label>
              <p className="font-semibold text-primary-Strawberry-red">
                {errors.name?.message}
              </p>
            </div>
            <input
              type="text"
              id="name"
              placeholder="e.g. Jane Doe"
              className={`${
                errors.name?.message
                  ? "border-primary-Strawberry-red"
                  : "border-neutral-Light-gray"
              } w-full rounded border px-5 py-2 font-medium placeholder:text-neutral-Cool-gray backdrop:bg-none hover:border-primary-Purplish-blue focus:outline-none focus:ring focus:ring-primary-Purplish-blue/80 focus-visible:ring-offset-2`}
              {...register("name")}
            />
          </div>

          <div>
            <div className="flex flex-wrap justify-between">
              <label htmlFor="email" className="mb-1 text-primary-Marine-blue">
                Email{" "}
              </label>
              <p className="font-semibold text-primary-Strawberry-red">
                {errors.email?.message}
              </p>
            </div>
            <input
              type="email"
              id="email"
              placeholder="e.g. jane@email.com"
              className={`${
                errors.email?.message
                  ? "border-primary-Strawberry-red"
                  : "border-neutral-Light-gray"
              } w-full rounded border px-5 py-2 font-medium placeholder:text-neutral-Cool-gray focus:outline-none focus:ring focus:ring-primary-Purplish-blue/80 focus-visible:ring-offset-2`}
              {...register("email")}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="name" className="mb-1 text-primary-Marine-blue">
                Phone{" "}
              </label>
              <p className="font-semibold text-primary-Strawberry-red">
                {errors.phone?.message}
              </p>
            </div>
            <input
              type="text"
              id="phone"
              placeholder="e.g. 123 456 7890"
              className={`${
                errors.phone?.message
                  ? "border-primary-Strawberry-red"
                  : "border-neutral-Light-gray"
              } w-full rounded border px-5 py-2 font-medium placeholder:text-neutral-Cool-gray focus:outline-none focus:ring focus:ring-primary-Purplish-blue/80 focus-visible:ring-offset-2`}
              {...register("phone")}
            />
          </div>
        </div>

        <Buttons />
      </form>
    </>
  );
};

export default PersonalInfo;
