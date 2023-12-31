import { FormContext } from "../../../../Context/FormContext";
import { useContext } from "react";
import dayjs from "dayjs";
import { Divider } from "antd";
import Download from "../../../../components/Sidebar/components/Download";

const InvoiceCard = () => {
  let number = [0];
  const { forminfo, todata, fromdata, description} = useContext(FormContext);
  number = forminfo?.terms === "none" ? [0] : (forminfo?.terms?.match(/\d+/g) || []).map(Number);
  console.log(number);
  const formattedDate = dayjs(forminfo?.date).format("dddd, MMMM DD, YYYY");
  const formattedDueDate = dayjs(forminfo?.date)
    .add(+number[0], "day")
    .format("dddd, MMMM DD, YYYY");

  const markAsPaid = () => {
    // Call API or update invoice status
    console.log('Marking invoice as paid:', forminfo?.number);
  };

  const markAsPartiallyPaid = () => {
    // Call API or update invoice status
    console.log('Marking invoice as partially paid:', forminfo?.number);
  };

  return (
    <div className="bg-gray-200 p-4 mb-4 ">
      <div className="border border-2 border-blue-500 w-700 mb-10 p-10 bg-white">
      <h3>Invoice #{forminfo?.number}</h3>
      <p>Client: {todata?.name}</p>
      <p>Sender: {fromdata?.name}</p>
      <p>Amount: {forminfo?.subTotal}</p>
      <p>Status: Paid</p>
      {forminfo?.notes === 'pending' && (
        <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4  py-2 mr-2"
          onClick={markAsPaid}
        >
          Mark as Paid
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={markAsPartiallyPaid}
        >
          Mark as Partially Paid
        </button>
      </div>
        )}
        <div className="mt-4 flex justify-between items-center">
          <div>
          <button
            className="bg-blue-500 text-white  rounded-lg px-4 py-2 mr-2"
            onClick={markAsPaid}
          >
            Mark as Paid
          </button>
          <button
            className="bg-blue-500 text-white  rounded-lg px-4 py-2"
            onClick={markAsPartiallyPaid}
          >
            Mark as Partially Paid
          </button>
          </div>
          <div>
          <button
            className="bg-blue-500 text-white gap-4 rounded-lg mx-5  items-endjustify-between px-4 py-2"
            onClick={Download}
          >
            Download
          </button>
          </div>
        </div>
      </div>
      
      
       <div className="flex flex-col bg-white w-full h-auto p-4 md:p-10 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-start">
          <img
            src={forminfo.logo}
            alt="Invoice logo"
            className="w-[80px] md:w-[120px] mr-4 flex items-start "
          />
        </div>
        <div>
          <p className="text-3xl font-semibold mb-3">{forminfo.title}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <h2 className="mb-1 text-sm md:text-lg font-bold">{fromdata.name}</h2>
        <p className="mb-1 text-sm md:text-base">{fromdata.email}</p>
        <p className="mb-1 text-sm md:text-base">{fromdata.phone}</p>
        <p className="mb-1 text-sm md:text-base">{fromdata.address}</p>
        <p className="mb-1 text-sm md:text-base">{fromdata.city}</p>
        <p className="mb-1 text-sm md:text-base">{fromdata.website}</p>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-1 w-full dark:bg-gray-700" />
      <div className="flex justify-between mb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold mb-2">BILLED TO:</h3>

          <div>
            <p className="mb-1 text-sm md:text-base font-bold">{todata?.name}</p>
            <p className="mb-1 text-sm md:text-base">{todata?.phone}</p>
            <p className="mb-1 text-sm md:text-base">{todata?.email}</p>
            <p className="mb-1 text-sm md:text-base">{todata?.address}</p>
            <p className="mb-1 text-sm md:text-base">{todata?.city}</p>
            <p className="mb-1 text-sm md:text-base">{todata?.website}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex mb-1">
            <h1 className="font-bold text-sm md:text-base mr-0 md:mr-2 ">INVOICE NUMBER:</h1>
            <p className="text-gray-600 text-sm md:text-base">{forminfo.number}</p>
          </div>
          <div className="flex mb-1 text-sm md:text-base">
            <h3 className="font-bold mr-0 md:mr-2 text-sm md:text-base">INVOICE DATE:</h3>
            <p>{forminfo.date ? formattedDate : null}</p>
          </div>
          <div className="flex mb-1 text-sm md:text-base">
            <h3 className="font-bold mr-0 md:mr-2  text-sm md:text-base">DUE DATE:</h3>
            <p>{forminfo.date ? formattedDueDate : null}</p>
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-1 w-full dark:bg-gray-700" />
      <div className="border border-y-stone-950 border-x-white  grid grid-cols-12 p-1 mb-3">
        <div className="col-span-4 md:col-span-5">
          <h5 className="font-bold text-sm md:text-base">Description</h5>
        </div>
        <div className="col-span-2">
          <h5 className="flex items-center justify-end font-bold text-sm md:text-base">Quantity</h5>
        </div>
        <div className="col-span-2">
          <h5 className="flex items-center justify-end font-bold text-sm md:text-base">
            Price
          </h5>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h5 className="flex items-center justify-end font-bold text-sm md:text-base">Tax</h5>
        </div>
        <div className="col-span-2">
          <h5 className="flex items-center justify-end font-bold text-sm md:text-base">Amount</h5>
        </div>
      </div>
      {description.map((desc, i) => {
        return (
          <div key={i}>
            <div className="grid text-sm md:text-base grid-cols-12 gap-1">
              <div className="col-span-4 md:col-span-5">
                <div className="grid-rows-2">
                  <p>{desc?.description}</p>
                  <p>{desc?.additional}</p>
                </div>
              </div>
              <div className="flex  justify-end col-span-2">
                <p>{desc?.qty}</p>
              </div>
              <div className="flex  justify-end col-span-2">
                <p>{(desc?.rate)?.toLocaleString()}</p>
              </div>
              <div className="flex  justify-end col-span-2 md:col-span-1">
                <p>{`${desc?.taxrate}.00%`}</p>
              </div>
              <div className="flex  justify-end col-span-2">
                <h5>{(
                      desc?.qty * desc?.rate +
                      (desc.taxrate * (desc?.qty * desc?.rate)) / 100
                    )?.toLocaleString()}</h5>
              </div>
            </div>{" "}
            <Divider dashed />
          </div>
        );
      })}
      <div className="grid text-sm md:text-base grid-cols-12 gap-1">
        <div className="col-span-7 md:col-span-8"></div>
        <div className="flex justify-end col-span-2 md:col-span-2">
          <div className="grid-rows-2">
            <p>Sub-total</p>
            <p>Total</p>
          </div>
        </div>
        <div className="flex  justify-end col-span-3 md:col-span-2">
          <div className="grid-rows-2">
            <p>{forminfo.currency} {forminfo.subTotal?.toLocaleString()}</p>
            <p className="font-bold">{forminfo.currency} {forminfo.total?.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className=" flex w-full my-20">{forminfo.notes}</div>
      <div className="flex flex-col justify-center items-center font-bold">
        <p className="mb-4">
          Kindly pay your invoice{" "}
          {forminfo.terms === "none" ? "Today" : `within ${forminfo.terms} `}
        </p>
        <p className="mb-2">Terms&conditions</p>
      </div>
    </div>
    </div>
    
  );
};

export default InvoiceCard;
