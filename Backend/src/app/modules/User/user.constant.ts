export const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
