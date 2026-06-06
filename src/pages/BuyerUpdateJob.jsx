import axios from 'axios';
import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const BuyerUpdateJob = () => {
  const params = useParams();
  // console.log(params);
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdateJobFormSubmit = async (e) => {
    e.preventDefault();
    const jobTitle = e.target.job_title.value;
    const category = e.target.category.value;
    const minPrice = parseFloat(e.target.min_price.value);
    const maxPrice = parseFloat(e.target.max_price.value);
    const description = e.target.description.value;
    const deadline = startDate;

    const jobData = {
      jobTitle,
      category,
      minPrice,
      maxPrice,
      description,
      deadline,
    };
    console.log(jobData);

    if (minPrice > maxPrice) {
      return toast.error('Min price cannot be more than max price');
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/jobs/table/${params.id}`,
        jobData
      );
      // console.log(res.data);
      res?.data?.modifiedCount > 0 && toast.success('Updated job successfully');
      navigate('/buyer-posted-jobs', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-2xl text-center font-semibold text-gray-700 capitalize ">
          Update Job Data
        </h2>

        <form onSubmit={handleUpdateJobFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Job Title
              </label>
              <input
                id="job_title"
                name="job_title"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                value={user?.email || ''}
                id="emailAddress"
                type="email"
                name="email"
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <select name="category" id="category" className="border p-2 rounded-md">
                <option value="web-development">web development</option>
                <option value="graphics-design">graphics design</option>
                <option value="digital-marketing">digital marketing</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="min_price">
                Minimum Price
              </label>
              <input
                id="min_price"
                name="min_price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="max_price">
                Maximum Price
              </label>
              <input
                id="max_price"
                name="max_price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
              cols="30"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default BuyerUpdateJob;
