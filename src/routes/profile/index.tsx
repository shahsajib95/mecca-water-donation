import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useGetUserQuery } from "@/features/users/usersQuery";
import { useUpdateUserMutation } from "@/features/auth/authQuery";
import HeaderTitle from "@/components/goBack";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().min(8, "Too short").required("Phone is required"),
});

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUser(values).unwrap();
        toast.success("Profile updated successfully!");
      } catch {
        toast.error("Failed to update profile.");
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const { t } = useLanguage();

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load profile.</p>
    );

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg space-y-6">
      <div className="flex justify-between">
        <HeaderTitle title="My Profile" />
        <Button className="text-sm  items-center gap-1 border rounded-full bg-purple-900 px-4 py-2 md:px-5 md:py-2 flex  sm:hidden">
          <span>{t("logout")}</span>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <Input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <Button
          type="submit"
          className=" text-white w-full mt-4 rounded-full bg-purple-900"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}
