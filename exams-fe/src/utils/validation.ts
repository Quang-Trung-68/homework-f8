import { z } from "zod";
// login validation
export const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type LoginData = z.infer<typeof loginSchema>;

// register validation
export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Tên không được để trống" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Vui lòng xác nhận mật khẩu" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RegisterFields = z.infer<typeof registerSchema>;

// change password validation
export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Vui lòng nhập mật khẩu cũ" }),
    newPassword: z
      .string()
      .min(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Vui lòng xác nhận mật khẩu mới" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

// Schema validation cho change user form
export const changeUserSchema = z.object({
    name: z.string().min(1, "Tên không được để trống").min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    school: z.string().min(1, "Tên trường không được để trống"),
    parent_name: z.string().min(1, "Tên phụ huynh không được để trống").min(2, "Tên phụ huynh phải có ít nhất 2 ký tự"),
    parent_phone: z.string()
        .min(1, "Số điện thoại/email phụ huynh không được để trống")
        .refine((val) => {
            // Kiểm tra email hoặc số điện thoại
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10,11}$/;
            return emailRegex.test(val) || phoneRegex.test(val);
        }, "Vui lòng nhập email hợp lệ hoặc số điện thoại 10-11 số")
});

export type ChangeUserForm = z.infer<typeof changeUserSchema>;
