import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;
  const bankaccnoedit = location.state.bankaccno
  const [vendorname, setVendorname] = useState("");
  const [bankname, setBankname] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/editvendor/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendorname,
            bankaccnoedit,
            bankname,
            address1,
            address2,
            city,
            country,
            zipcode,
          }),
        }
      );

      const result = await response.json();

      if (result.message === "Vendor edited") {
        alert(result.message);
        setVendorname("");
        setBankname("");
        setAddress1("");
        setAddress2("");
        setCity("");
        setCountry("");
        setZipcode("");
        setTimeout(() => {
          navigate("/list");
        }, 2000);
      } else if (result.message === "Vendor not exists!") {
        alert(result.message);
        setVendorname("");
        setBankname("");
        setAddress1("");
        setAddress2("");
        setCity("");
        setCountry("");
        setZipcode("");
      } else if ((result.message = "Wrong Id used for edit")) {
        alert("Wrong Id used for edit");
        setTimeout(() => {
          navigate("/list");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section className="flex flex-col w-full min-w-[350px] h-auto items-center p-4 gap-2">
        <h1 className="font-medium underline">Edit Vendor</h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          <label htmlFor="vendorName">Vendor Name :</label>
          <input
            type="text"
            name="vendorName"
            placeholder="Vendor Name..."
            className="border border-gray-500 p-1 rounded-md"
            required
            value={vendorname}
            onChange={(e) => {
              setVendorname(e.target.value);
            }}
          />

          <label htmlFor="bankaccountNo">Bank Account No :</label>
          <input
            type="text"
            name="bankaccountNo"
            placeholder="Bank Account No..."
            className="border border-gray-500 p-1 rounded-md font-medium"
            readOnly
            value={bankaccnoedit}
          />

          <label htmlFor="bankName">Bank Name :</label>
          <input
            type="text"
            name="bankName"
            placeholder="Bank Name..."
            className="border border-gray-500 p-1 rounded-md"
            required
            value={bankname}
            onChange={(e) => {
              setBankname(e.target.value);
            }}
          />

          <label htmlFor="addressLine1">Address Line 1 :</label>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1..."
            className="border border-gray-500 p-1 rounded-md"
            required
            value={address1}
            onChange={(e) => {
              setAddress1(e.target.value);
            }}
          />

          <label htmlFor="addressLine2">Address Line 2 :</label>
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2..."
            className="border border-gray-500 p-1 rounded-md"
            required
            value={address2}
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
          />

          <label htmlFor="city">City :</label>
          <input
            type="text"
            name="city"
            placeholder="City..."
            className="border border-gray-500 p-1 rounded-md"
            required
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />

          <label htmlFor="country">Country :</label>
          <input
            type="text"
            name="country"
            placeholder="Country..."
            className="border border-gray-500 p-1 rounded-md"
            required
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />

          <label htmlFor="zipCode">Zip Code :</label>
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code..."
            className="border border-gray-500 p-1 rounded-md"
            required
            value={zipcode}
            onChange={(e) => {
              setZipcode(e.target.value);
            }}
          />
        </form>
        <button
          className="bg-blue-400 rounded-md w-32 h-10 ml-10 sm:col-start-2"
          onClick={handleEdit}
        >
          Submit
        </button>
      </section>
    </main>
  );
}

export default Edit;
