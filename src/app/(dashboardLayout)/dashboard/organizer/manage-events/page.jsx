
import { myEvents } from "@/lib/api/events/data";
import { auth } from "@/lib/auth";
import { Spinner } from "@heroui/react";
import { headers } from "next/headers";
import { Suspense } from "react";
import ManageEventClient from "./ManageEventClient";
import DashbordHeading from "@/components/DashbordHeading";

const ManageEvent = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const events = await myEvents(session?.user?.email)



    return (
        <div>
            <DashbordHeading
                title="Manage Event"
                description="Manage event"
            />
            <Suspense fallback={<Spinner />}>
                <ManageEventClient events={events} />
            </Suspense>

        </div>
    );
};

export default ManageEvent;