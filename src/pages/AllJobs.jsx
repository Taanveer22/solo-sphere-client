import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import useAxiosCommon from '../hooks/useAxiosCommon';

const AllJobs = () => {
  const axiosCommon = useAxiosCommon();
  // ----- Data state -----
  const [jobs, setJobs] = useState([]);
  const [jobsCount, setJobsCount] = useState(0);
  // ----- Pagination state -----
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  // ----- Filter / sort state -----
  const [filteredJobs, setFilteredJobs] = useState('');
  const [sortedJobs, setSortedJobs] = useState('');
  // ----- Search state (two states: typing vs committed) -----
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // total pages based on total job count and items per page
  const totalPages = Math.ceil(jobsCount / itemsPerPage);
  const paginationPages = [...Array(totalPages).keys()];
  // console.log(filteredJobs, sortedJobs);

  // ----- Fetch jobs whenever any dependency changes -----
  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axiosCommon.get(
          `/paginationJobs?page=${currentPage}&size=${itemsPerPage}&filter=${filteredJobs}&sort=${sortedJobs}&search=${searchQuery}`
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
  }, [axiosCommon, currentPage, itemsPerPage, filteredJobs, sortedJobs, searchQuery]);

  // change current page (Prev / Next / number buttons)
  const handlePaginationBtnClick = (value) => {
    // console.log(value);
    setCurrentPage(value);
  };

  // reset all filters, sort, search, and page back to default
  const handleResetBtnClick = () => {
    setSortedJobs('');
    setFilteredJobs('');
    setSearchInput('');
    setSearchQuery('');
    setCurrentPage(0);
    setItemsPerPage(3);
  };

  // commit search only when user submits the form (press Enter / click Search button)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(0);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        {/*======  pagination boxes */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          {/* filter by category */}
          <div>
            <select
              onChange={(e) => {
                setFilteredJobs(e.target.value);
                setCurrentPage(0);
              }}
              value={filteredJobs}
              name="category"
              id="category"
              className="border p-4 rounded-lg"
            >
              <option value="">Filter By Category</option>
              <option value="web-development">Web Development</option>
              <option value="graphics-design">Graphics Design</option>
              <option value="digital-marketing">Digital Marketing</option>
            </select>
          </div>

          {/* search */}
          <form onSubmit={handleSearchSubmit}>
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
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

          {/* sort by deadline */}
          <div>
            <select
              onChange={(e) => {
                setSortedJobs(e.target.value);
                setCurrentPage(0);
              }}
              value={sortedJobs}
              name="sort"
              id="sort"
              className="border p-4 rounded-md"
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>

          {/* Items per page selector */}
          <div>
            <select
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(0);
              }}
              value={itemsPerPage}
              name="itemsPerPage"
              id="itemsPerPage"
              className="border p-4 rounded-lg"
            >
              <option value="3">3 per page</option>
              <option value="6">6 per page</option>
              <option value="9">9 per page</option>
              <option value="12">12 per page</option>
            </select>
          </div>

          {/* reset btn */}
          <button onClick={handleResetBtnClick} className="btn">
            Reset
          </button>
        </div>

        {/*======  cards */}
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((jobElement) => (
            <JobCard key={jobElement?._id} jobElement={jobElement}></JobCard>
          ))}
        </div>

        {/*====== pagination buttons */}
        <div className="flex justify-center gap-4 mt-8 xl:mt-16">
          <button
            onClick={() => handlePaginationBtnClick(currentPage - 1)}
            disabled={currentPage === 0}
            className={`${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600'} px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg`}
          >
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

          <button
            onClick={() => handlePaginationBtnClick(currentPage + 1)}
            disabled={currentPage === paginationPages.length - 1}
            className={`${
              currentPage === paginationPages.length - 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-600'
            } px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
