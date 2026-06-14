import { roleValidator } from '@/lib/api/session';

const AttendeeLayout = async({children}) => {
    await roleValidator('attendee')
    return children;
}

export default AttendeeLayout