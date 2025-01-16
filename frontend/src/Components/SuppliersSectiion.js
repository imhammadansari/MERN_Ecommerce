import React from 'react'

const SuppliersSectiion = () => {
  return (
    <>
    <div className='w-full bg-slate-200 lg:px-20 lg:py-2'>
    <h1 className='font-bold hidden lg:block text-xl text-start'>Suppliers by region</h1>
        <div className='w-full hidden lg:flex gap-[6rem]'>

        <div className='flex flex-col gap-4 py-4'>
            <div className='flex items-center'>
                <img className='h-8 w-10' src='UAE.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>Arabic Emirates</p>
                <p className='text-xs text-start'>shopname.ae</p>
                </div>
            </div>

            <div className='flex items-center'>
                <img className='h-8 w-10' src='DK.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>Denmark</p>
                <p className='text-xs text-start'>denmark.com.dk</p>
                </div>
            </div>

        </div>

        <div className='flex flex-col gap-4 py-4'>
            <div className='flex items-center'>
                <img className='h-8 w-10' src='Australia.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>Australia</p>
                <p className='text-xs text-start'>shopname.ae</p>
                </div>
            </div>

            <div className='flex items-center'>
                <img className='h-8 w-10' src='France.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>France</p>
                <p className='text-xs text-start'>shopname.com.fr</p>
                </div>
            </div>

        </div>

        <div className='flex flex-col gap-4 py-4'>
            <div className='flex items-center'>
                <img className='h-8 w-10' src='US.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>United States</p>
                <p className='text-xs text-start'>shopname.ae</p>
                </div>
            </div>

            <div className='flex items-center'>
                <img className='h-8 w-10' src='UAE.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>Arabic Emirates</p>
                <p className='text-xs text-start'>shopname.ae</p>
                </div>
            </div>

        </div>


        <div className='flex flex-col gap-4 py-4'>
            <div className='flex items-center'>
                <img className='h-8 w-10' src='Russia.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>Russia</p>
                <p className='text-xs text-start'>shopname.ru</p>
                </div>
            </div>

            <div className='flex items-center'>
                <img className='h-8 w-10' src='China.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>China</p>
                <p className='text-xs text-start'>shopname.ae</p>
                </div>
            </div>

        </div>

        <div className='flex flex-col gap-4 py-4'>
            <div className='flex items-center'>
                <img className='h-8 w-10' src='Italy.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>Italy</p>
                <p className='text-xs text-start'>shopname.it</p>
                </div>
            </div>

            <div className='flex items-center'>
                <img className='h-8 w-10' src='GB.png' />
                <div className='px-2'>
                <p className='text-lg text-start'>Great Britain</p>
                <p className='text-xs text-start'>shopname.co.uk</p>
                </div>
            </div>

        </div>

        </div>
        
    </div>
    </>
  )
}

export default SuppliersSectiion