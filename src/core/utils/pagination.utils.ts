export const getTake = (
  limit: number,
  whereConditions: any,
): number | undefined => {
  return Object.values(whereConditions).some((val) => val !== undefined)
    ? undefined
    : limit;
};

export const getSkip = (
  page: number,
  whereConditions: any,
): number | undefined => {
  return Object.values(whereConditions).some((val) => val !== undefined)
    ? undefined
    : page;
};
