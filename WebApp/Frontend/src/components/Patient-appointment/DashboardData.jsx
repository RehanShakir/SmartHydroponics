import React from "react";
import { useQuery } from "react-query";
import { usersList } from "../../api/apiFunctions";
import { Link } from "react-router-dom";
export default function DashboardData() {
  const { data, isLoading } = useQuery("UsersList", usersList);
  // console.log(data.data.users[0]);

  const userData = [
    {
      name: `${data?.data?.users[0]?.fullName}`,
      email: `${data?.data?.users[0]?.email}`,
    },
    {
      name: `${data?.data?.users[1]?.fullName}`,
      email: `${data?.data?.users[1]?.email}`,
    },
    {
      name: `${data?.data?.users[2]?.fullName}`,
      email: `${data?.data?.users[2]?.email}`,
    },
  ];
  const userDataArea = (data, index) => {
    return (
      <tr key={index}>
        <td className='table_text'>{data.name}</td>
        <td className='table_text'>{data.email}</td>
      </tr>
    );
  };
  return (
    <>
      <div className='dashboard'>
        <div className='pr-4'>
          <div className='row pl-0 pr-0 mr-0 ml-0'>
            <div className='col-lg-6 col-md-6 padding_table'>
              <div className='table-responsive'>
                <div className='table_label mb-3 mt-3'>
                  <div className='upcom_lable'>All Users</div>
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
                        Name
                      </th>
                      <th className='heading_table' scope='col'>
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>{userData.map(userDataArea)}</tbody>
                </table>
                {/* <Skeleton loading={loading} active /> */}
                <Link className='' to='/all-users-data'>
                  <div className='text-center pb-4'>
                    <img src='/images/dateimg.svg' alt='' />
                  </div>
                </Link>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 padding_table'>
              <div className='table-responsive'>
                <div className='table_label mb-3 mt-3'>
                  <div className='upcom_lable'>New Users</div>
                  <div>
                    <img src='/images/table.svg' alt='' />
                  </div>
                </div>
                <table className='table background_table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th className='heading_table' scope='col'>
                        Name
                      </th>
                      <th className='heading_table' scope='col'>
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>{userData.map(userDataArea)}</tbody>
                </table>
                {/* <Skeleton loading={loading} active /> */}
                <Link className='' to='/all-users-data'>
                  <div className='text-center pb-4'>
                    <img src='/images/dateimg.svg' alt='' />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* <div className='row pl-0 pr-0 mr-0 ml-0'>
            <div className='col-lg-6 col-md-6 pl-0 mt-5 padding_table'>
              <div className='table-responsive'>
                <div className='table_label mb-3 mt-3 pl-0'>
                  <div className='upcom_lable'>Missed appointments</div>
                  <div>
                    <img src='/images/table.svg' alt='' />
                  </div>
                </div>
                <table className='table background_table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th className='heading_table' scope='col'>
                        Name
                      </th>
                      <th className='heading_table' scope='col'>
                        Time
                      </th>

                      <th className='heading_table' scope='col'>
                        Specialty
                      </th>
                    </tr>
                  </thead>
                  <tbody>{userData.map(userDataArea)}</tbody>
                </table>
                <div className='text-center pb-4'></div>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 pl-0 mt-5 padding_table'>
              <div className='table-responsive'>
                <div className='table_label mb-3 mt-3 pl-0'>
                  <div className='upcom_lable'>Calling List</div>
                  <div>
                    <img src='/images/table.svg' alt='' />
                  </div>
                </div>
                <table className='table background_table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th className='heading_table' scope='col'>
                        Name
                      </th>
                      <th className='heading_table' scope='col'>
                        Time
                      </th>

                      <th className='heading_table' scope='col'>
                        Specialty
                      </th>
                    </tr>
                  </thead>
                  <tbody>{userData.map(userDataArea)}</tbody>
                </table>
                <div className='text-center pb-4'></div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
