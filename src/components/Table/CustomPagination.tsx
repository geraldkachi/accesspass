import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import { HiChevronDown } from "react-icons/hi";
import Action from "./Action";
import useURLQuery from "../../hooks/useURLQuery";

interface CustomPaginationProps {
  totalPages?: number;
}

interface PageSizeOption {
  name: string;
  action: () => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ 
  totalPages = 50 
}) => {
  const [windowSize, setWindowSize] = useState<number>(() => window.innerWidth);
  const searchQueries = useURLQuery();
  const page = parseInt(searchQueries.value?.page ?? "1", 10);
  const pageSize = parseInt(searchQueries.value?.pageSize ?? "25", 10);

  const changePageAndSize = (_page: number, _size: number): void => {
    searchQueries.setURLQuery({ page: _page, pageSize: _size });
  };

  const changePage: ReactPaginateProps["onPageChange"] = (selectedItem) => {
    searchQueries.setURLQuery({ page: (selectedItem.selected ?? 0) + 1 });
  };

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageSizeOptions: PageSizeOption[] = [
    {
      name: "10",
      action: () => {
        changePageAndSize(1, 10);
      },
    },
    {
      name: "25",
      action: () => {
        changePageAndSize(1, 25);
      },
    },
    {
      name: "50",
      action: () => {
        changePageAndSize(1, 50);
      },
    },
    {
      name: "75",
      action: () => {
        changePageAndSize(1, 75);
      },
    },
    {
      name: "100",
      action: () => {
        changePageAndSize(1, 100);
      },
    },
  ];

  return (
    <div className="flex sm:flex-row flex-col mt-4 mb-6 px-4 items-start sm:items-center justify-between">
      <div className="flex mb-4 sm:mb-0 items-center">
        <span className="text-yep-inputText mr-2">Showing</span>
        <Action options={pageSizeOptions}>
          <button
            className="rounded-[5px] flex items-center px-1 bg-white text-yepprimary border border-yepprimary py-1"
            type="button"
          >
            <span>{pageSize}</span>
            <span className="ml-1">
              <HiChevronDown className="w-5 text-yep-inputText" />
            </span>
          </button>
        </Action>
        <span className="text-yep-inputText ml-2">Entries</span>
      </div>
      <div>
        <ReactPaginate
          previousLabel={<PreviousButton />}
          nextLabel={<NextButton />}
          breakLabel="..."
          breakClassName="self-end rounded-sm border border-yepprimary h-8 text-yepprimary text-center w-8 bg-white "
          pageCount={totalPages}
          disableInitialCallback
          forcePage={page - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={windowSize > 500 ? 2 : 0}
          onPageChange={changePage}
          containerClassName="flex justify-center items-center"
          pageClassName=" text-yepprimary cursor-pointer text-center bg-white border border-yepprimary  mx-1 rounded-sm"
          activeClassName="text-white bg-yepprimary"
          activeLinkClassName="!text-white"
          pageLinkClassName="text-yepprimary flex items-center justify-center h-8 w-10 hover:no-underline no-underline"
        />
      </div>
    </div>
  );
};

const NextButton: React.FC = () => {
  return (
    <div className="h-8 ml-1 flex px-3 border border-yepprimary rounded justify-center items-center">
      <span className="text-yepprimary ">Next</span>
    </div>
  );
};

const PreviousButton: React.FC = () => {
  return (
    <div className="h-8 flex mr-1 px-3 border border-yepprimary rounded justify-center items-center">
      <span className="text-yepprimary">Prev</span>
    </div>
  );
};

export default CustomPagination;