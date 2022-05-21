import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { usersList } from "../api/apiFunctions";

const AllUsersData = () => {
  /* Component States */
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [visible, setVisible] = useState({
    status: false,
    message: "",
    type: "",
  });

  /* Component Data Fetching */
  const { data, isLoading } = useQuery("UsersList", usersList);

  console.log(data);
  const queryClient = useQueryClient();
  /* Mutations */
  // const mutation = useMutation(
  //   (data) => updatePatient(data, selectedPatient._id),
  //   {
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries("UsersList");
  //       Swal.fire({
  //         icon: "success",
  //         timer: 1000,
  //         showConfirmButton: false,
  //         text: `${data.data.message || "Updated Record"}`,
  //       });
  //       setSelectedPatient({});
  //       setShowEditModal(false);
  //       return;
  //     },
  //     onError: (error) => {
  //       Swal.fire({
  //         icon: "error",
  //         text: `${error?.response?.data?.message || "Server Error"}`,
  //       });
  //     },
  //   }
  // );

  /* Use Effect Hooks */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  useEffect(() => {
    setUserData(data?.data?.users);
    setFilteredData(data?.data?.users);
  }, [isLoading, data?.data?.users]);

  /* On change function for fields */

  const onSearch = ({ target: { value } }) =>
    setFilteredData(
      userData.filter((user) =>
        `${user.fullName}`.toLowerCase().includes(value.toLowerCase())
      )
    );
  const userDataArea = (data, index) => {
    return (
      <tr key={index}>
        <td className='table_text'>{`${data.fullName}`}</td>
        <td className='table_text'>{`${data.email}`}</td>
      </tr>
    );
  };
  return (
    <>
      {/* {mutation.isSuccess && visible.status && (
        <Alert
          message={`${visible.message}`}
          type={`${visible.type}`}
          showIcon
          closable
          onClose={(e) => setVisible(false)}
        />
      )}
      {mutation.isError && visible.status && (
        <Alert
          message={`${visible.message}`}
          type={`${visible.type}`}
          showIcon
          closable
          onClose={(e) => setVisible(false)}
        />
      )} */}
      <div>
        <div className='d-flex justify-content-between'>
          <p
            className='dash_title
      pt-2'>
            All Users
          </p>
          {/* <Link className='' to='/add-new-patient'>
            <button className='creat_btn mt-5 mb-3 mr-4'>
              Add New Patient
            </button>
          </Link> */}
        </div>
        <div className='patient_labels d-flex justify-content-between pr-5'>
          <div className='patient_data'>
            Users /
            <span style={{ color: "#4A47A3", paddingLeft: "8px" }}>
              All users data
            </span>
          </div>
        </div>
        <div className=' mt-3'>
          <div className='serch'>
            <img className='search_img' src='/images/searc.svg' alt='' />
            <input
              type='text'
              className='form-control search_input col-10'
              placeholder='Search By User Name'
              onChange={onSearch}
            />
          </div>
        </div>
        <div className='col-lg-12 col-md-8 padding_table mt-2 pl-0'>
          <div className='table-responsive pl-0 pr-0'>
            <table className='table  background_table'>
              <thead className='thead-dark'>
                <tr>
                  <th className='heading_table' scope='col'>
                    Full Name
                  </th>
                  <th className='heading_table' scope='col'>
                    Email
                  </th>
                </tr>
              </thead>
              {isLoading ||
                (filteredData && Object.keys(filteredData).length > 0 && (
                  <tbody>{filteredData.map(userDataArea)}</tbody>
                ))}
            </table>
            {isLoading && <Skeleton paragraph={{ rows: 5 }} active />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsersData;
