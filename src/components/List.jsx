import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const pageSize = 5;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/getvendor`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.message === "Fetched Vendor") {
        setData(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  //delete data
  const handleDelete = async (id) => {
    try {
      const deletemess = confirm("Are you sure!");
      if (deletemess) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/deletevendor/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.message === "deleted successfully") {
          alert(result.message);
          fetchData();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //edit data
  const handleEdit = (id) => {
      navigate("/edit", { state: { id } });
  };

  return (
    <main className="min-w-[320px] mx-2 overflow-x-auto sm:overflow-hidden">
      <section>
        <table className="border border-black w-full">
          <caption className="font-bold text-xl py-2 text-left sm:text-center">
            Vendor List
          </caption>
          <thead>
            <tr>
              <th className="border border-black p-1">Vendor name</th>
              <th className="border border-black p-1">Bankacc no</th>
              <th className="border border-black p-1">Bank name</th>
              <th className="border border-black p-1">Address1</th>
              <th className="border border-black p-1">Address2</th>
              <th className="border border-black p-1">City</th>
              <th className="border border-black p-1">Country</th>
              <th className="border border-black p-1">Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, id) => (
              //data list
              <tr key={id}>
                <td className="border border-black p-1" align="center">
                  {item.vendorname}
                </td>
                <td className="border border-black p-1" align="center">
                  {item.bankaccno}
                </td>
                <td className="border border-black p-1" align="center">
                  {item.bankname}
                </td>
                <td className="border border-black p-1" align="center">
                  {item.address1}
                </td>
                <td className="border border-black p-1" align="center">
                  {item.address2}
                </td>
                <td className="border border-black p-1" align="center">
                  {item.city}
                </td>
                <td className="border border-black p-1" align="center">
                  {item.country}
                </td>
                <td className="border border-black p-1" align="center">
                  {item.zipcode}
                </td>

                {/* edit */}
                <td className="border border-black p-1" align="center">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="bg-yellow-200 p-2 rounded-full"
                  >
                    Edit
                  </button>
                </td>

                {/* delete */}
                <td className="border border-black p-1" align="center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-yellow-200 p-2 rounded-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Pagination controls */}
      <section className="flex justify-between my-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-400 p-2 rounded-md text-white"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-400 p-2 rounded-md text-white"
        >
          Next
        </button>
      </section>
    </main>
  );
}

export default List;
