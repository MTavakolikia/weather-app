import { useState } from "react";
import apiClient, { weatherApiKey } from "../services/api-client";
import "./App.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { TbSteam } from "react-icons/tb";
import { MdRefresh } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

import Logo from "./assets/Logo.svg";
import FeelsLike from "./assets/feels-like.svg";
import Humidity from "./assets/humidity.png";
import WindSpeed from "./assets/wind-speed.png";

function App() {
  const [data, setData] = useState();
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const onSearch = () => {
    apiClient
      .get(
        `/${location}?unitGroup=metric&key=${weatherApiKey}&contentType=json`
      )
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => setError(err.message));
  };
  const getData = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  if (error) return <p>{error}</p>;
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500  w-full h-screen flex justify-center items-center">
      <div className="absolute left-2 top-2 flex justify-center items-center">
        <img src={Logo} />
        <p className="font-bold text-white ml-2">MT Weather App</p>
      </div>

      <div className="w-3/5 rounded-sm contentContainer">
        <div className="flex items-center">
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={getData}
            value={location}
            placeholder="Enter Location..."
            className="shadow appearance-none border uppercase rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400"
          />

          <span
            className="bg-slate-700 rounded-md cursor-pointer p-1 mx-2 "
            onClick={onSearch}
            title="Search"
          >
            <BsSearch className="text-white font-bold text-2xl " />
          </span>
          {data && (
            <span
              className="bg-slate-700 rounded-md cursor-pointer p-1"
              onClick={() => {
                setData("");
                setLocation("");
              }}
              title="Reset"
            >
              <MdRefresh className="text-white font-bold text-2xl " />
            </span>
          )}
        </div>
        {data ? (
          <div className=" rounded p-4 shadow-lg my-5 bg-red-300 bg-opacity-70">
            <h4 className="text-left flex items-center">
              <span className="mr-1 text-blue-500">
                <IoLocationSharp />
              </span>
              {data?.address.toUpperCase()}
            </h4>

            <h2 className="text-left flex items-center">
              <span className="mr-1 text-gray-700">
                <FaThermometerThreeQuarters />
              </span>
              {data && data.currentConditions.temp}°C
            </h2>
            <h5 className="text-left flex items-center">
              <span className="mr-1 text-orange-800">
                <TbSteam />
              </span>
              {data?.currentConditions.conditions}
            </h5>
            <p className="mt-3 text-gray-700">{data?.description}</p>
          </div>
        ) : null}
        {data ? (
          <div className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0">
            <div className="flex w-40 sm:w-auto  mx-4">
              <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                <img src={Humidity} className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <p className="text-xl text-black-600 font-bold">
                  {data?.currentConditions.humidity}
                </p>
                <p className="text-lg text-black-500">Humidity</p>
              </div>
            </div>
            <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
            <div className="flex w-40 sm:w-auto mx-4">
              <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                <img src={FeelsLike} className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <p className="text-xl text-black-600 font-bold">
                  {data?.currentConditions.feelslike}°C
                </p>
                <p className="text-lg text-black-500">FeelsLike</p>
              </div>
            </div>
            <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
            <div className="flex w-40 sm:w-auto mx-4">
              <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                <img src={WindSpeed} className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <p className="text-xl text-black-600 font-bold">
                  {data?.currentConditions.windspeed}
                </p>
                <p className="text-lg text-black-500">WindSpeed</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
