import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import useAxiosCommon from '../hooks/useAxiosCommon';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsCount, setJobsCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const axiosCommon = useAxiosCommon();

  const totalPages = Math.ceil(jobsCount / itemsPerPage);
  const paginationPages = [...Array(totalPages).keys()];

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axiosCommon.get(
          `/paginationJobs?page=${currentPage}&size=${itemsPerPage}`
        );
        // console.log(res.data.jobsData);
        // console.log(res.data.jobsDataCount);
        setJobs(res.data.jobsData);
        setJobsCount(res.data.jobsDataCount);
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  }, [axiosCommon, currentPage, itemsPerPage]);

  const handlePaginationBtnClick = (value) => {
    // console.log(value);
    setCurrentPage(value);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        {/* pagination items */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div>
            <select name="category" id="category" className="border p-4 rounded-lg">
              <option value="">Filter By Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          <form>
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
              />

              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
          <div>
            <select name="category" id="category" className="border p-4 rounded-md">
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button className="btn">Reset</button>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((jobElement) => (
            <JobCard key={jobElement?._id} jobElement={jobElement}></JobCard>
          ))}
        </div>

        {/* pagination buttons */}
        <div className="flex justify-center gap-4 mt-8 xl:mt-16">
          <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Prev
          </button>

          {paginationPages.map((element) => (
            <button
              onClick={() => handlePaginationBtnClick(element)}
              key={element}
              className={`${element === currentPage ? 'bg-blue-500 ' : ' bg-gray-600'} px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80`}
            >
              {element}
            </button>
          ))}

          <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
