import axios from 'axios';
import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const JobCardDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const detailsData = useLoaderData();
  // console.log(detailsData);
  const { deadline, category, jobTitle, description, minPrice, maxPrice, buyer } = detailsData;

  const handleBidFormSubmit = async (e) => {
    e.preventDefault();
    const bidPrice = e.target.price.value;
    const comment = e.target.comment.value;
    const deadline = startDate;
    const freelancerEmail = user?.email;
    const buyerEmail = detailsData?.buyer?.email;

    if (buyerEmail === freelancerEmail) {
      return toast.error('Action not permitted');
    }

    if (bidPrice <= parseInt(minPrice)) {
      return toast.error('Bid price must be equal or more than min price');
    }

    const bidData = {
      bidPrice,
      comment,
      deadline,
      freelancerEmail,
      buyerEmail,
    };
    // console.log(bidData);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/bids`, bidData);
      // console.log(res.data);
      res?.data?.insertedId && toast.success('Bid complete on this job successfully');
      navigate('/freelancer-bids', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-7xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-87.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 ">
            Deadline: {new Date(deadline).toLocaleDateString()}
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 bg-blue-200 rounded-full ">
            {category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">{jobTitle}</h1>

          <p className="mt-2 text-lg text-gray-600 ">{description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">Buyer Details:</p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">Name: {buyer?.name}</p>
              <p className="mt-2 text-sm  text-gray-600 ">Email: {buyer?.email}</p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img src={buyer?.photo} alt="Photo" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${minPrice} - ${maxPrice}
          </p>
        </div>
      </div>

      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-87.5">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">Place A Bid</h2>

        <form onSubmit={handleBidFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
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
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobCardDetails;
