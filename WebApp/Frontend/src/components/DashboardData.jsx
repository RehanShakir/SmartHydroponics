import React from "react";
import { useQuery } from "react-query";
import { usersList, getAllUsersMqttData } from "../api/apiFunctions";
import { Link } from "react-router-dom";
export default function DashboardData() {
  const { data, isLoading } = useQuery("UsersList", usersList);
  const { data: mqttData, isLoading: mqttLoading } = useQuery(
    "getAllUsersMqttData",
    getAllUsersMqttData
  );

  const userDataArea = (data, index) => {
    return (
      <tr key={index}>
        <td className='table_text'>{`${data.tds}`}</td>
        <td className='table_text'>{`${data.ph}`}</td>
        <td className='table_text'>{`${data.orp}`}</td>
        <td className='table_text'>{`${data.liquidTemperature}`}</td>
        <td className='table_text'>{`${data.temperature}`}</td>
        <td className='table_text'>{`${data.humidity}`}</td>
      </tr>
    );
  };
  return (
    <>
      <div className='dashboard'>
        <div className='pr-4'>
          <div className='row pl-0 pr-0 mr-0 ml-0'>
            <div className='col-lg col-md padding_table'>
              <div className='table-responsive'>
                <div className='table_label mb-3 mt-3'>
                  <div className='upcom_lable'>All Users Data</div>
                  <div>
                    <div>
                      <img src='/images/table.svg' height='' width='' alt='' />
                    </div>
                  </div>
                </div>
                <table className='table  background_table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th className='heading_table' scope='col'>
                        TDS Sensor
                      </th>
                      <th className='heading_table' scope='col'>
                        pH Sensor
                      </th>
                      <th className='heading_table' scope='col'>
                        ORP Sensor
                      </th>
                      <th className='heading_table' scope='col'>
                        Liquid Temperature Sensor
                      </th>
                      <th className='heading_table' scope='col'>
                        Environment Temperature Sensor
                      </th>
                      <th className='heading_table' scope='col'>
                        Environment Humidity Sensor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mqttLoading || mqttData?.data?.mqttData.map(userDataArea)}
                  </tbody>
                </table>
                {/* <Link className='' to='/all-users-data'>
                  <div className='text-center pb-4'>
                    <img src='/images/dateimg.svg' alt='' />
                  </div>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
