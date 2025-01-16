import React from 'react'

const SubscribeSection = () => {
  return (
    <>
    <div className='w-full px-4 lg:px-20 py-4 bg-gray-300'>
        <div className='py-4'>
            <h1 className='font-bold text-xl'>Subscribe on our newsletter</h1>
            <p>Get daily news on upcoming offers from many suppliers all over the world</p>

            <form className='flex gap-2 pt-3 items-center justify-center'>
                <input type='text' placeholder='Email' className='w-[15rem] bg-white text-black p-1'/>
                <button className='w-28 h-8 rounded bg-blue-600 text-white'>Subscribe</button>
            </form>

        </div>

    </div>
    </>
  )
}

export default SubscribeSection