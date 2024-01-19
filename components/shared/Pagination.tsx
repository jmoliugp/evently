import React from "react";

interface Props {
  page: number;
  totalPages: number;
  urlParamName?: string;
}

export const Pagination: React.FC<Props> = () => {
  return <div>Pagination</div>;
};
