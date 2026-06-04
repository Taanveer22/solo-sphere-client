import axios from 'axios';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';

const TabCategories = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
        // console.log(res.data);
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  }, []);

  return (
    <Tabs>
      <div className=" container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Browse Jobs By Categories{jobs.length}
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Three categories available for the time being. They are Web Development, Graphics Design
          and Digital Marketing. Browse them by clicking on the tabs below.
        </p>
        <div className="flex items-center justify-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((jobElement) => jobElement.category === 'web development')
              .map((jobElement) => (
                <JobCard key={jobElement._id} jobElement={jobElement}></JobCard>
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((jobElement) => jobElement.category === 'graphics design')
              .map((jobElement) => (
                <JobCard key={jobElement._id} jobElement={jobElement}></JobCard>
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((jobElement) => jobElement.category === 'digital marketing')
              .map((jobElement) => (
                <JobCard key={jobElement._id} jobElement={jobElement}></JobCard>
              ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
