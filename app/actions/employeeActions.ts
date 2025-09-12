// app/actions/employeeActions.ts
"use server";

import { supabaseAdmin } from "@/global/lib/supabaseAdmin";
import { generateRandomPassword } from "@/global/utils/getRandomPassword";
import { sendEmail } from "@/global/utils/sendMail";
import { TCreateEmployee, TEmployee, TUpdateEmployee } from "@/modules/Employees/types/employee";

// ✅ Create Employee
export async function createEmployee(
  input: TCreateEmployee
): Promise<TEmployee> {
  const { firstname, lastname, email, phoneNumber, gender, role, isActive } =
    input;
  if (!firstname || !lastname || !email)
    throw new Error("First name, last name, and email are required");

  const mode = process.env.ENVIRONMENT;
  const password =
    mode === "DEVELOPMENT" ? "123456789" : generateRandomPassword(firstname);

  const { data: userData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
  if (authError || !userData?.user?.id)
    throw new Error(authError?.message || "Failed to create auth user");

  const authUserId = userData.user.id;

  const { error: dbError } = await supabaseAdmin.from("employees").insert({
    auth_user_id: authUserId,
    firstname,
    lastname,
    email,
    phone_number: phoneNumber || null,
    gender,
    role: role || "employee",
    is_active: isActive ?? false,
  });
  if (dbError) {
    await supabaseAdmin.auth.admin.deleteUser(authUserId);
    throw new Error(dbError.message || "Failed to insert employee");
  }

  const { data: employeeData, error: fetchError } = await supabaseAdmin
    .from("employees")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single();
  if (fetchError || !employeeData)
    throw new Error(
      fetchError?.message || "Failed to fetch employee after insert"
    );

  const emailResult = await sendEmail(email, firstname, password, authUserId);
  if (!emailResult.success)
    console.warn("⚠️ Employee created but email failed to send");

  return {
    id: employeeData.id,
    firstname: employeeData.firstname,
    lastname: employeeData.lastname,
    email: employeeData.email,
    phoneNumber: employeeData.phone_number,
    gender: employeeData.gender,
    role: employeeData.role,
    isActive: employeeData.is_active,
    createdAt: employeeData.created_at,
  };
}

// ✅ Update Employee

export async function updateEmployee(
  input: TUpdateEmployee
): Promise<TEmployee> {
  const { id, ...rest } = input;
  if (!id) throw new Error("Employee ID is required");

  const { data, error } = await supabaseAdmin
    .from("employees")
    .update({
      firstname: rest.firstname,
      lastname: rest.lastname,
      email: rest.email,
      phone_number: rest.phoneNumber ?? null,
      gender: rest.gender,
      role: rest.role,
      is_active: rest.isActive,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) throw new Error(error?.message || "Failed to update employee");

  return {
    id: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phoneNumber: data.phone_number,
    gender: data.gender,
    role: data.role,
    isActive: data.is_active,
    createdAt: data.created_at,
  };
}




// ✅ Delete Employee
export async function deleteEmployee(
  employeeId: string
): Promise<{ message: string; warning?: string }> {
  if (!employeeId) throw new Error("Employee auth_user_id is required");

  const { data: employee, error: employeeCheckError } = await supabaseAdmin
    .from("employees")
    .select("id, auth_user_id, email, firstname, lastname")
    .eq("id", employeeId)
    .single();
  if (employeeCheckError || !employee) throw new Error("Employee not found");

  const { error: employeeError } = await supabaseAdmin
    .from("employees")
    .delete()
    .eq("id", employeeId);
  if (employeeError)
    throw new Error(employeeError.message || "Failed to delete employee");

  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
    employee.auth_user_id
  );
  if (authError) {
    return {
      message: "Employee deleted from database, but auth deletion failed",
      warning: authError.message,
    };
  }

  return { message: "Employee and auth user deleted successfully" };
}

// ✅ Get all employees
export async function getAllEmployees(): Promise<TEmployee[]> {
  const { data, error } = await supabaseAdmin
    .from("employees")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);

  return (data || []).map((emp) => ({
    id: emp.id,
    firstname: emp.firstname,
    lastname: emp.lastname,
    email: emp.email,
    phoneNumber: emp.phone_number,
    gender: emp.gender,
    role: emp.role,
    isActive: emp.is_active,
    createdAt: emp.created_at,
    registeredBy: emp.registered_by || null,
  }));
}

// ✅ Get employee by ID
export async function getEmployeeById(id: string): Promise<TEmployee | null> {
  if (!id) throw new Error("Employee ID is required");

  const { data, error } = await supabaseAdmin
    .from("employees")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;

  return {
    id: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phoneNumber: data.phone_number,
    gender: data.gender,
    role: data.role,
    isActive: data.is_active,
    createdAt: data.created_at,
  };
}

// ✅ Get employee by ID
export async function getEmployeeByEmail(
  email: string
): Promise<TEmployee | null> {
  if (!email) throw new Error("Employee ID is required");
  const { data, error } = await supabaseAdmin
    .from("employees")
    .select("*")
    .eq("email", email)
    .single();
  if (error) return null;

  return {
    id: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phoneNumber: data.phone_number,
    gender: data.gender,
    role: data.role,
    isActive: data.is_active,
    createdAt: data.created_at,
  };
}
