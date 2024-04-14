import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import csvtojson from "csvtojson";
import Navbar from "../../page/Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:8080/api/v1";

const SingleDns = () => {

  const navigate = useNavigate();

  
  const [singledomainName, setSingleDomainName] = useState("");

  const [domainName, setDomainName] = useState("");
  const [Type, setType] = useState("");
  const [TTL, SetTTL] = useState("");
  const [ResourceRecords, setResourceRecords] = useState("");

  const hostedZoneId = useParams().hostid;
  const hostedName = useParams().name;
 
  //have to add with same name



  const HostedZoneId = hostedZoneId;
  console.log(HostedZoneId);

  const addDNS = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");

    console.log(ResourceRecords);


    try {
      const parsedResourceRecords = JSON.parse(ResourceRecords);

      console.log(parsedResourceRecords);
      console.log(domainName,Type,TTL)

      const response = await axios.post(
        `${URL}/dns-records/create-one?HostedZoneId=${HostedZoneId}`,
        [
          {
            Name: domainName || '',
            Type: Type,
            TTL: TTL,
            ResourceRecords: parsedResourceRecords,
            HostedZoneId:HostedZoneId
          },
        ],

        {
          headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      );

      console.log("response after create", response);

      if (response.status === 201) {
        message.success(`${domainName} created successfully`);
        setDomainName(""); // Reset domainName when success
        setType(""); // Reset Type
        SetTTL(""); // Reset TTL
        setResourceRecords(""); // Reset ResourceRecords

        navigate(`/dns/${hostedName}/${hostedZoneId}`);


      } else {
        message.error(response.error , "Failed to create domain");
        console.log(domainName, "DOMAIN NAME");
      }
    } catch (error) {
      message.error("Error occurred: " + "please fill the form correctly");
      console.log("Request error:", error);
    }
  };

  return (

    <>

    <Navbar hostedZoneId={hostedZoneId} hostedName={hostedName} />


    <div class="h-[35rem] w-400 p-3 mx-auto m-2 border-2">


      <div class="p-1 flex justify-center">
        <h1 class="text-2xl font-bold">Create new DNS</h1>
      </div>

      <div class="p-1 flex justify-center">
        <h1 class="text-xl font-bold">Enter your DNS values For Domain {hostedName} </h1>
      </div>

      {/* <div className="p-4">
        <form>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="DNS Value"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DNS Value
              </label>
              <input
                type="text"
                value={domainName}
                id="DNS Value"
                onChange={(event) => setDomainName(event.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="nikhil.com"
                required
              />
            </div>
            <div>
              <label
                for="DNS Type"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DNS Type
              </label>
              <input
                type="text"
                id="DNS Type"
                value={Type}
                onChange={(event) => setType(event.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="AAAA"
                required
              />
            </div>
            <div>
              <label
                for="DNS TTL"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DNS TTL
              </label>
              <input
                type="text"
                id="DNS TTL"
                value={TTL}
                onChange={(event) => SetTTL(event.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="3600"
                required
              />
            </div>
          </div>

          <div class="mb-6">
            <label
              for="DNS ResourceRecords"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              DNS ResourceRecords
            </label>

            <textarea
            value={ResourceRecords}
              className="bg-gray-50 border border-gray-300 h-[10rem] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pb-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="ResourceRecords"
              placeholder={`

            [
              {
                  "Value": "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
              }
            ]

            `}
              onChange={(event) => setResourceRecords(event.target.value)}
              rows={8}
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={addDNS}
          >
            ADD
          </button>
        </form>
      </div> */}






      
      <div className="m-2 mt-11"></div>
           

  

<div class="w-full p-4 text-center bg-cool-gray border border-red-500 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
           
<form>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="DNS Value"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DNS Value
              </label>
              <input
                type="text"
                value={domainName}
                id="DNS Value"
                onChange={(event) => setDomainName(event.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="nikhil.com"
                required
              />
            </div>
            <div>
              <label
                for="DNS Type"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DNS Type
              </label>
              <input
                type="text"
                id="DNS Type"
                value={Type}
                onChange={(event) => setType(event.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="AAAA"
                required
              />
            </div>
            <div>
              <label
                for="DNS TTL"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DNS TTL
              </label>
              <input
                type="text"
                id="DNS TTL"
                value={TTL}
                onChange={(event) => SetTTL(event.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="3600"
                required
              />
            </div>
          </div>

          <div class="mb-6">
            <label
              for="DNS ResourceRecords"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              DNS ResourceRecords
            </label>

            <textarea
            value={ResourceRecords}
              className="bg-gray-50 border border-gray-300 h-[10rem] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pb-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="ResourceRecords"
              placeholder={`

            [
              {
                  "Value": "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
              }
            ]

            `}
              onChange={(event) => setResourceRecords(event.target.value)}
              rows={8}
            />
          </div>

          <button
            type="submit"
            class="bg-green-600 text-gray-200 px-6 py-3 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100"
            onClick={addDNS}
          >
            ADD DNS
          </button>
        </form>


  
    <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">

    </div>
</div>


    </div>

    </>

  );
};

export default SingleDns;
