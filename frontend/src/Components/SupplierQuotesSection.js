import React from 'react';

const SupplierQuotesSection = () => {
  return (
    <div className="w-full bg-slate-200 lg:px-20 py-4">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(44, 124, 241, 0.5), rgba(0, 209, 255, 0.5)),
            url('/supplierQuoteImage.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex justify-between px-4 lg:px-6 py-4">
          <div className=' text-white text-start flex flex-col items-start justify-start'>
          <h1 className='font-bold lg:text-3xl w-60 lg:w-[21rem]'>An easy way to send requests to all suppliers</h1>
          <button className='w-24 h-8 lg:hidden rounded mt-2 bg-blue-700 text-white text-sm'>Send Inquiry</button>
          <p className='hidden lg:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <form className='w-[28rem] hidden bg-white rounded text-start lg:flex flex-col items-start justify-start px-6 py-4'>
            <h1 className='font-bold w-full'>Send quote to suppliers</h1>
            <h1 className='border w-full border-black p-1 mt-2 rounded'>What item you need?</h1>
            <textarea className='border border-black p-1 mt-2 rounded' cols={51} rows={3} placeholder='Type your details'></textarea>
            <div className='flex gap-2'>
            <input type='text' value="Quantity" className='p-1 w-48 border rounded border-black mt-2'/>
            <select className='w-20 p-1 mt-2 border border-black rounded'>
                <option>Pcs</option>
            </select>
            </div>
            <button className='w-28 h-8 rounded mt-2 bg-blue-700 text-white'>Send Inquiry</button>
        </form>
        </div>

        
      </div>
    </div>
  );
};

export default SupplierQuotesSection;
