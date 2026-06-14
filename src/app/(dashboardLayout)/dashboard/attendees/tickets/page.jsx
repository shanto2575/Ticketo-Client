import DashbordHeading from '@/components/DashbordHeading'
import TicketsTable from '@/components/TicketsTable'
import { fetchMyBooking } from '@/lib/api/booking/data'
import { getUser } from '@/lib/api/session'
import React from 'react'

const AttendeeTicketsPage = async() => {
  const user=await getUser()
  const booking=await fetchMyBooking(user?.email)
  // console.log(booking)
  return (
    <div>
      <DashbordHeading title='My Booked Tickets' description='All the Booked Tickets ' />
      <TicketsTable tickets={booking}/>
    </div>
  )
}

export default AttendeeTicketsPage