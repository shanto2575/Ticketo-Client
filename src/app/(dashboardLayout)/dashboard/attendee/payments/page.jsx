import DashbordHeading from '@/components/DashbordHeading'
import PaymentsTable from '@/components/PaymentsTable'
import { fetchMyPayments } from '@/lib/api/payments/data'
import { getUser } from '@/lib/api/session'
import React from 'react'

const AttendeePaymentsPage =async () => {
  const user=await getUser()
  // console.log(user)
  const payment=await fetchMyPayments(user?.email)
  console.log(payment)
  return (
    <div>
        <DashbordHeading title='Payments' description='Attendees Payments'/>
        <PaymentsTable payments={payment}/>
    </div>
  )
}

export default AttendeePaymentsPage
