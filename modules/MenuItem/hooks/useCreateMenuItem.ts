import { useRef, useState } from "react";
import { toast } from "react-toast";
import {
  createMenuItemInitials,
  menuItemErrorsInitials,
} from "../form/menuItems";
import { TCreateMenuItem, TMenuItemErrors } from "../types/menuItem";
import { useCreateMenuItem as  useCreateMenuItemAPI} from "../hooks/useMenuItemServices";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoryDataStore";
import { useMenuItemUtilStore } from "../store/useMenuItemUtilStore";
import { MenuItemDomain } from "../services/menuItemDomain";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";
import { uploadMenuItemImage } from "@/app/actions/menuItemActions";

export function useCreateMenuItem() {
  const [form, setForm] = useState<TCreateMenuItem>(createMenuItemInitials);
  const [errors, setErrors] = useState<TMenuItemErrors>(menuItemErrorsInitials);
  const [preview, setPreview] = useState<string | null>(null);
  const { categories } = useCategoryDataStore();
  const {addMenuItem} = useMenuItemDataStore()
  const { activeModal, closeModal } = useMenuItemUtilStore();
  const { mutate, isPending } = useCreateMenuItemAPI();
  const inputClass =
    "w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400";
  const errorClass = "text-xs text-red-500 mt-1";
  const setField = (field: keyof TCreateMenuItem, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleAvailability = () => {
    
    setForm({ ...form, isAvailable: !form.isAvailable });
  };
  const handleFileChange = (file: File | null) => {
    if (!file) {
      setField("image", null);
      setPreview(null);
      return;
    }
    setField("image", file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetForm = () => {
    setForm(createMenuItemInitials);
    setPreview(null);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let imageUrl: string | undefined = undefined;
    if (form.image && form.image instanceof File) {
      imageUrl = await uploadMenuItemImage(form.image);
    } else if (typeof form.image === "string") {
      imageUrl = form.image;
    }
    const validate = MenuItemDomain.validateCreateMenuItem(form);
    if (!validate.isValid) {
      setErrors(validate.errors);
      return;
    }
    const payload = { ...form, imageUrl };
    mutate(payload, {
      onSuccess: (data) => {
        resetForm();
        addMenuItem(data)
        closeModal();
        toast.success(`${data.name} Created Successfully`);
      },
      onError: (err) => {
        console.error("Failed to create menu item:", err);
      },
    });
  };
  return {
    form,
    preview,
    errors,
    categories,
    inputClass,
    errorClass,
    setField,
    fileInputRef,
    handleFileChange,
    isPending,
    isOpen: activeModal == "create",
    closeModal,
    toggleAvailability,
    resetForm,
    handleSubmit, // exposed for the component
  };
}
