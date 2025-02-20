import { PaginationOptions } from '@core/models/paginationOptions';
import { Prisma } from '@prisma/client';

export const buildContainsCondition = (
  value?: string,
): Prisma.StringFilter | undefined => {
  return value
    ? { contains: value, mode: Prisma.QueryMode.insensitive }
    : undefined;
};

export const buildContainsNameCondition = (key: string, value?: string) => {
  return value
    ? {
        [key]: {
          contains: value,
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : undefined;
};

export function buildWhereConditions(
  options: PaginationOptions,
  allActive?: boolean,
  keyId?: string,
) {
  const filters = {
    state: allActive ? true : undefined,
    [keyId]: buildContainsCondition(options.identification),
    name: buildContainsCondition(options.name),
    code: buildContainsCondition(options.code),
  };
  return filters;
}
