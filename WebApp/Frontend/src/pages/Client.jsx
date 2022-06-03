import { Skeleton, Modal, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getDataByMacAddress,
  addMacAddress,
  publishToMqtt,
  getAllMacAdresses,
} from "../api/apiFunctions";
import Swal from "sweetalert2";

const { Option } = Select;

const pumpBtns = [
  { name: "Pump 1", value: 1, state: 0 },
  { name: "Pump 2", value: 2, state: 0 },
  { name: "Pump 3", value: 3, state: 0 },
  { name: "Pump 4", value: 4, state: 0 },
  { name: "Pump 5", value: 5, state: 0 },
  { name: "Pump 6", value: 6, state: 0 },
  { name: "Pump 7", value: 7, state: 0 },
  { name: "Pump 8", value: 8, state: 0 },
];

const Client = () => {
  /* Component States */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [macaddress, setMacaddress] = useState("");
  const [selectedMacaddress, setSelectedMacaddress] = useState("");
  const [okBtnLoading, seOkBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mqttData, setMqttData] = useState([]);

  /* Component Data Fetching */
  const { data: macAddressess } = useQuery("MacAddressess", getAllMacAdresses);

  const queryClient = useQueryClient();

  /* Mutations */
  const getMacMutation = useMutation(getAllMacAdresses, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("MacAddressess");
    },
  });

  /* Use Effect Hooks */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

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

  //Modal functions
  const handleOk = async () => {
    seOkBtnLoading(true);
    const res = await addMacAddress(macaddress);
    if (res.status === 200) {
      getMacMutation.mutate();
      seOkBtnLoading(false);

      setIsModalVisible(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Macaddress Added",
        titleText: res?.data?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      setIsModalVisible(false);
      seOkBtnLoading(false);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went Wrong! Please check your internet connection",
        // titleText: res?.data?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  const handleMacaddressChange = async (value) => {
    setSelectedMacaddress(value);
    setLoading(true);

    const res = await getDataByMacAddress(value);
    if (res.status === 200) {
      setLoading(false);

      setMqttData(res.data.data);
      setFilteredData(res.data.data);
    }
  };

  const renderOptions = macAddressess?.data?.Macaddressess?.macAddress?.map(
    (macAddress) => {
      return <Option value={macAddress}>{macAddress}</Option>;
    }
  );

  const handlePumpBtns = async (pumpNumber, pumpState, index) => {
    if (pumpState === 1) {
      pumpBtns[index].state = 0;
    } else {
      pumpBtns[index].state = 1;
    }
    const res = await publishToMqtt(
      selectedMacaddress,
      `${pumpNumber},${pumpBtns[index].state}`
    );
    if (res.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pump",
        titleText: `Pump ${pumpNumber} ${pumpState === 1 ? "Off" : "On"}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went Wrong! Please check your internet connection",
        // titleText: res?.data?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <>
      <div>
        <div className='d-flex justify-content-between'>
          <p
            className='dash_title
      pt-2'>
            All Users
          </p>
          {/* <Link className='' to='/add-new-patient'> */}
          <button
            className='creat_btn mt-5 mb-3 mr-4'
            onClick={() => setIsModalVisible(true)}>
            Add New MacAddress
          </button>
          {/* </Link> */}
        </div>
        <div className='patient_labels d-flex justify-content-between pr-5'>
          <div className='patient_data'>
            Sensors /
            <span style={{ color: "#4A47A3", paddingLeft: "8px" }}>Data</span>
          </div>
        </div>
        <div className=' mt-3'>
          <div className='serch'>
            <div style={{ display: "flex" }}>
              <Select
                className='col-10'
                defaultValue='Select Macaddress'
                onClick={() => {
                  getMacMutation.mutate();
                }}
                onChange={handleMacaddressChange}>
                {renderOptions}
              </Select>
            </div>
          </div>
        </div>
        <div className='col-lg-12 col-md-8 padding_table mt-2 pl-0'>
          <div className='table-responsive pl-0 pr-0'>
            <table className='table  background_table'>
              <thead className='thead-dark'>
                <tr>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    TDS Sensor
                  </th>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    pH Sensor
                  </th>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    ORP Sensor
                  </th>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    Liquid Temperature Sensor
                  </th>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    Environment Temperature Sensor
                  </th>
                  <th
                    className='heading_table'
                    scope='col'
                    style={{ textAlign: "center" }}>
                    Environment Humidity Sensor
                  </th>
                </tr>
              </thead>
              {mqttData && Object.keys(mqttData).length > 0 && (
                <tbody>{mqttData.map(userDataArea)}</tbody>
              )}
            </table>
            {loading && <Skeleton paragraph={{ rows: 5 }} active />}

            {pumpBtns.map((btn, index) => {
              return (
                <button
                  className='creat_btn mt-5 mb-3 mr-4'
                  onClick={() => handlePumpBtns(btn.value, btn.state, index)}>
                  {btn.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title='New MacAddress'
        visible={isModalVisible}
        onOk={handleOk}
        okText={"Add"}
        okButtonProps={{ loading: okBtnLoading, style: { color: "#1890ff" } }}
        okType={"primary"}
        bodyStyle={{ borderRadius: 50 }}
        onCancel={() => setIsModalVisible(false)}>
        <Input
          placeholder='Enter Macaddress'
          onChange={(e) => {
            setMacaddress(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};

export default Client;
