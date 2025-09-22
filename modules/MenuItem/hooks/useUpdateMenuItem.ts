import { useEffect, useRef, useState } from "react";
import { toast } from "react-toast";
import {
  menuItemErrorsInitials,
  updateMenuItemInitials,
} from "../form/menuItems";
import {
  TCreateMenuItem,
  TMenuItemErrors,
  TUpdateMenuItem,
} from "../types/menuItem";
import { useUpdateMenuItem as useUpdateMenuItemAPI } from "../hooks/useMenuItemServices";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoryDataStore";
import { useMenuItemUtilStore } from "../store/useMenuItemUtilStore";
import { MenuItemDomain } from "../services/menuItemDomain";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";
import { uploadMenuItemImage } from "@/app/actions/menuItemActions";

export function useUpdateteMenuItem() {
  const [form, setForm] = useState<TUpdateMenuItem>(updateMenuItemInitials);
  const [errors, setErrors] = useState<TMenuItemErrors>(menuItemErrorsInitials);
  const [preview, setPreview] = useState<string | null>(null);
  const { categories } = useCategoryDataStore();
  const { activeModal, closeModal, selectedMenuItem } = useMenuItemUtilStore();
  const { updateMenuItem } = useMenuItemDataStore();
  const { mutate, isPending } = useUpdateMenuItemAPI();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputClass =
    "w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400";
  const errorClass = "text-xs text-red-500 mt-1";
  const setField = (field: keyof TCreateMenuItem, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const toggleAvailability = () => {
    setForm((prevForm) => {
      const newForm = { ...prevForm, isAvailable: !prevForm.isAvailable };
      return newForm;
    });
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
  const resetForm = () => {
    setForm(updateMenuItemInitials);
    setPreview(null);
  };
  useEffect(() => {
    if (selectedMenuItem) {
      const newFormData = MenuItemDomain.setUpdateForm(selectedMenuItem);
      setPreview(newFormData?.imageUrl ?? "");
      if (newFormData) setForm(newFormData);
    }
  }, [selectedMenuItem]);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let imageUrl: string | undefined = undefined;
    if (form.image && form.image instanceof File) {
      imageUrl = await uploadMenuItemImage(form.image);
    } else if (typeof form.image === "string") {
      imageUrl = form.image;
    }
    const validate = MenuItemDomain.validateUpdateMenuItem(form);
    if (!validate.isValid) {
      setErrors(validate.errors);
      return;
    }
    const payload = { ...form, imageUrl };
    mutate(payload, {
      onSuccess: (data) => {
        resetForm();
        updateMenuItem(data);
        closeModal();
        toast.success(`${data.name} Created Successfully`);
      },
      
    });
  };
  return {
    form,
    preview,
    errors,
    categories,
    setField,
    fileInputRef,
    handleFileChange,
    isPending,
    isOpen: activeModal == "update",
    inputClass,
    errorClass,
    closeModal,
    toggleAvailability,
    resetForm,
    handleSubmit, // exposed for the component
  };
}
