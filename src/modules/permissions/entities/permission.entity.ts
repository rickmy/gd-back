import { Permission } from "@prisma/client";

export class PermissionEntity implements Permission {
  id: number;
  name: string;
  endpoint: string;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
