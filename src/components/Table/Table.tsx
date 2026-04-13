/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { ReactNode } from "react";import clsx from "clsx";
import { 
  HiDotsHorizontal, 
  HiOutlineEye, 
  HiOutlinePencil, 
  HiOutlineTrash, 
  HiClipboardCopy 
} from "react-icons/hi";
import Action from "./Action";
import CustomPagination from "./CustomPagination";

// Type definitions
export type ActionName = "view" | "edit" | "delete" | "remove" | "copy" | string;

export interface RowAction<T = any> {
  name: string;
  action: () => void;
  hide?: boolean;
  view?: (row: T, rowIndex: number) => ReactNode;
}

export interface Column<T = any> {
  header: string | ReactNode;
  view: (row: T, rowIndex: number) => ReactNode;
}

export interface TableProps<T = any> {
  tableHeight?: string;
  isLoading?: boolean;
  tableData: T[];
  clickRowAction?: (row: T, rowIndex: number) => void;
  rowActions?: (row: T, rowIndex: number) => RowAction<T>[];
  columns: Column<T>[];
  hideTableHeader?: boolean;
  showAction?: boolean;
  actionType?: "inline" | "dropdown";
  totalPages?: number;
  showPagination?: boolean;
}

const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
  const {
    tableHeight = "sm:h-[80vh] h-[100vh]",
    isLoading = false,
    tableData,
    clickRowAction,
    rowActions = () => [],
    columns,
    hideTableHeader = false,
    showAction = false,
    actionType = "inline",
    totalPages = 1,
    showPagination = true
  } = props;

  return (
    <div
      className={clsx(
        "flex flex-col relative overflow-y-hidden overflow-x-scroll", 
        tableHeight, 
        isLoading && "overflow-x-hidden"
      )}
    >
      <div>
        {/* header */}
        {/* {topSlot && <div className="px-7 pb-5 pt-5 text-yep-header font-semibold text-sm leading-[22px]">{topSlot}</div>} */}
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div
          className={clsx(
            "h-full w-full custom-scrollbar pr-3 relative",
            isLoading ? "overflow-hidden" : "overflow-auto"
          )}
        >
          <table className="table table-auto w-full border-collapse ">
            <thead className={`sticky top-0  ${hideTableHeader ? "hidden" : ""}`}>
              <tr className="[&>th:nth-child(2)]:pl-0 bg-white dark:bg-kiwishade">
                {columns.map((col, index) => (
                  <th
                    key={`${col.header}-head-${index}`}
                    className="text-yep-header border-[#F4F6F8] border-b-[6px] first:rounded-l-[7px] last:rounded-r-[7px] text-sm leading-normal px-5 py-3 whitespace-nowrap "
                  >
                    <span className="w-full font-medium block text-left">{col.header}</span>
                  </th>
                ))}
                {showAction && (
                  <th className="text-yep-header border-[#F4F6F8] border-b-[6px] text-sm rounded-r-[7px] leading-normal px-5 py-3 whitespace-nowrap ">
                    <span className="w-full font-medium block  text-left">Action</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="">
              {!isLoading &&
                tableData.length > 0 &&
                tableData.map((row, rowIndex) => {
                  const validRowActions = rowActions(row, rowIndex).filter((action) => !action?.hide);
                  return (
                    <tr
                      key={`table-body-row-${rowIndex}`}
                      className={clsx(
                        "px-5",
                        "bg-white [&>td:nth-child(2)]:pl-0",
                        "dark:bg-kiwishade",
                        "hover:bg-yep-border/30"
                      )}
                    >
                      {columns?.map((col, colIndex) => {
                        const view = col.view(row, rowIndex);

                        return (
                          <td
                            key={`table-body-cell-${colIndex}`}
                            className={clsx(
                              "border-[#F4F6F8] border-b-[6px] px-5 py-3 whitespace-nowrap first:rounded-l-[7px] last:rounded-r-[7px]",
                              clickRowAction && "cursor-pointer"
                            )}
                            onClick={() => clickRowAction?.(row, rowIndex)}
                          >
                            <span className="w-full text-sm leading-normal text-lightnavyblue block font-normal text-left">
                              {view}
                            </span>
                          </td>
                        );
                      })}
                      {showAction && validRowActions?.length > 0 && (
                        <td className="border-[#F4F6F8] border-b-[6px] px-5 py-3">
                          <span className="w-full block">
                            {actionType === "dropdown" && (
                              <Action options={validRowActions} alignment="end">
                                <span className="">
                                  <HiDotsHorizontal className="w-6 font-bold text-yepprimary" />
                                </span>
                              </Action>
                            )}
                            {actionType === "inline" && (
                              <div className="flex items-center flex-nowrap">
                                {validRowActions.map((rowAction, __index) => (
                                  <button
                                    key={`actionButton-${__index}`}
                                    onClick={() => {
                                      rowAction?.action();
                                    }}
                                    type="button"
                                    className="outline-none mr-3 flex items-center flex-nowrap last:ml-0 "
                                  >
                                    {getIcon(rowAction?.name ?? "")}
                                    {getLabel(rowAction?.name ?? "")}
                                  </button>
                                ))}
                              </div>
                            )}
                          </span>
                        </td>
                      )}
                    </tr>
                  );
                })}

              {isLoading && renderLoader(showAction ? columns.length + 1 : columns.length)}

              {!isLoading && tableData.length === 0 && (
                <tr className="">
                  <td 
                    className="" 
                    colSpan={showAction ? columns.length + 1 : columns.length}
                  >
                    <div className="flex items-center justify-center w-full first:rounded-l-[7px] last:rounded-r-[7px] h-[50vh] bg-slate-200">
                      <p className="text-yep-inputText">No data available.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPagination && <CustomPagination totalPages={totalPages} />}
    </div>
  );
};

// Helper functions
const getIcon = (val: string): ReactNode => {
  const lowerCase = val?.toLowerCase();

  if (["view"].includes(lowerCase)) {
    return <HiOutlineEye className="w-5 text-yepprimary" />;
  }
  if (["delete", "remove"].includes(lowerCase)) {
    return <HiOutlineTrash className="w-5 text-red-500" />;
  }
  if (["edit"].includes(lowerCase)) {
    return <HiOutlinePencil className="w-5 text-yep-inputText" />;
  }
  if (["copy"].includes(lowerCase)) {
    return <HiClipboardCopy className="w-5 text-yep-inputText" />;
  }

  return "";
};

const getLabel = (val: string): ReactNode => {
  const lowerCase = val?.toLowerCase();

  if (["view"].includes(lowerCase)) {
    return <span className="text-[14px] text-yepprimary ml-1">{val}</span>;
  }
  if (["delete", "remove"].includes(lowerCase)) {
    return <span className="text-[14px] text-red-500 ml-1">{val}</span>;
  }
  if (["edit"].includes(lowerCase)) {
    return <span className="text-[14px] text-yep-inputText ml-1">{val}</span>;
  }
  if (["copy"].includes(lowerCase)) {
    return <span className="text-[14px] text-yep-inputText ml-1">{val}</span>;
  }

  return "";
};

const renderLoader = (rowLength: number): ReactNode => (
  <>
    {Array(12)
      .fill("")
      .map((_, index) => (
        <tr key={`tr-loader-${index}`}>
          <td
            colSpan={rowLength}
            className="px-[2px] first:rounded-l-[7px] last:rounded-r-[7px] border-[#F4F6F8] border-b-[6px]"
          >
            <div className="block w-full relative custom-skeleton-loader rounded h-7 bg-yep-border"></div>
          </td>
        </tr>
      ))}
  </>
);

export default Table;