import { Wallet1, Clock, Sound, MessageRemove, Calendar1, Verify, Warning2 } from "iconsax-react";
import { useRouter } from "next/router";
import { getCurrencyName } from "../../Constants";
import { getMeetDateTS, getStateTS } from "../../helper/DataHelper";
import { getFundTotal } from "../../helper/FundHelper";
import { getTime, formatDate, getState, getTimeFromDate } from "../../helper/TimeHelper";
import useTwitterProfile from "../../hooks/useTwitterProfile";
import ChainTag, { SChainTag } from "../utils/ChainTag";
import Image from "next/image";

const DiscourseLongList = ({ state, data }: { state: number, data: any }) => {
    const route = useRouter();

    const handleClick = () => {
        route.push(`/${data.id}`)
    }

    const u1 = useTwitterProfile(data.speakers[0].username);
    const u2 = useTwitterProfile(data.speakers[1].username);
    

    return (
        <div onClick={handleClick} className='cursor-pointer w-full bg-card p-4 rounded-xl flex flex-col gap-2 justify-between'>
            {/* left section */}

            {/* avatar */}
            <div className="flex items-center gap-2">

            <div className='flex items-center w-16 h-8 relative'>
                <div className='flex items-center w-8 h-8 rounded-xl ring-[3px] ring-[#141515] overflow-clip'>
                    {/* TODO: add twitter fetch avatar */}
                    <img className="scale-105 w-8 h-8 object-cover rounded-xl object-center" src={u1?.profile_image_url!} alt="" />
                </div>
                <div className='flex items-center absolute left-[35%] w-8 h-8 rounded-xl ring-[3px] ring-[#141515] overflow-clip'>
                    <img className="scale-105 w-8 h-8 object-cover rounded-xl object-center" src={u2?.profile_image_url} alt="" />
                </div>
            </div>
            <div className='sm:flex flex-col hidden'>
                <h4 className='text-[#c6c6c6] text-xs tracking-wide font-medium'>{u1?.name}</h4>
                <h4 className='text-[#c6c6c6] text-xs tracking-wide font-medium'>{u2?.name}</h4>
            </div>
            </div>

            {/* title */}
            <h3 className='text-white text-sm font-semibold'>{data.title}</h3>
            {/* divider */}
            <div className='w-full mx-1 h-[1px] bg-[#303030] flex rounded-xl' />

            <div className="flex w-full justify-between items-center">
                <div className='flex items-center gap-4 flex-1 justify-between min-h-[36px]'>
                    <StateView state={getStateTS(data)} data={data} />
                </div>
                <div className="flex items-center justify-end gap-2 flex-1">
                    <SChainTag chainId={data.chainId} />
                    <p className='text-[#68D391] font-bold text-xs'>{getFundTotal(data.funds)} {getCurrencyName(data.chainId)}</p>
                </div>
            </div>
        </div>
    );
}

const StateView = ({ state, data }: { state: number, data: any }) => {

    if (state === 0) {
        return (
            <div className='flex flex-col gap-1'>
                <div className='flex items-end gap-2'>
                    <Wallet1 size="16" color="#68D391" variant='Bold' />
                    <p className='uppercase text-[10px] font-Lexend text-[#68D391] tracking-wider font-medium'>funding</p>
                </div>
                <div className='flex items-end gap-2'>
                    <Clock size="16" color="#6a6a6a" variant='Bold' />
                    <p className='uppercase font-Lexend text-[10px] text-[#6a6a6a] tracking-wider font-semibold'>{formatDate(getTime(data.endTS))}</p>
                </div>
            </div>
        )
    }

    if (state === 1) {
        return (

            <div className='flex flex-col gap-1'>
                <div className='flex items-end gap-2'>
                    <Clock size="16" color="#6c6c6c" variant='Bold' />
                    <p className='uppercase font-Lexend text-[10px] text-[#6c6c6c] tracking-wider font-medium'>scheduling</p>
                </div>
            </div>
        )
    }

    if (state === 2) {
        return (
            <div className='flex flex-col gap-1'>
                <div className='flex items-end gap-2'>
                    <Calendar1 size="16" color="#F6E05E" variant='Bold' />
                    <p className='uppercase text-[10px] font-Lexend text-[#F6E05E] tracking-wider font-medium'>{formatDate(getTime(data.endTS))}</p>
                </div>
                <div className='flex items-end gap-2'>
                    <Clock size="16" color="#6a6a6a" variant='Bold' />
                    <p className='uppercase font-Lexend text-[10px] text-[#6a6a6a] tracking-wider font-semibold'> {getTimeFromDate(new Date(getMeetDateTS(data)))}</p>
                </div>
            </div>
        )
    }

    if (state === 3) {
        return (
            <div className='flex flex-col gap-1'>
                <div className='flex items-end gap-2'>
                    <Verify size="16" color="#ABECD6" variant='Bold' />
                    <p className='uppercase font-Lexend text-[10px] text-[#ABECD6] tracking-wider font-medium'>Completed</p>
                </div>
            </div>
        )
    }

    if (state === 4) {
        return (
            <div className='flex flex-col gap-1'>
                <div className='flex items-end gap-2'>
                    <MessageRemove size="16" color="#FC8181" variant='Bold' />
                    <p className='uppercase font-Lexend text-[10px] text-[#FC8181] tracking-wider font-medium'>Terminated</p>
                </div>
            </div>
        )
    }
    if (state === 5) {
        return (
            <div className='flex flex-col gap-1'>
                <div className='flex items-end gap-2'>
                    <Warning2 size="16" color="#FC8181" variant='Bold' />
                    <p className='uppercase font-Lexend text-[10px] text-[#FC8181] tracking-wider font-medium'>Disputed</p>
                </div>
            </div>
        )
    }



    return (
        <div className='flex flex-col gap-1'>
            <div className='flex items-end gap-2'>
                <Sound size="16" color="#12D8FA" variant='Bold' />
                <p className='uppercase font-Lexend text-[10px] text-[#12D8FA] tracking-wider font-medium'>ongoing</p>
            </div>
        </div>
    );
}

export default DiscourseLongList;