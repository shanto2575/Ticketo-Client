import DashbordHeading from "@/components/DashbordHeading";
import UpdateToPremiumButton from "@/components/UpdateToPremiumButton";
import { getUser } from "@/lib/api/session";
import { Button, Card } from "@heroui/react";
import { FaCalendarAlt, FaCrown, FaDollarSign, FaUsers } from "react-icons/fa";

const OrganizerOverviewPage = async () => {
    const stats = {
        totalEvents: 15,
        totalAttendees: 450,
        totalRevenue: 25000,
        totalSoldTickets: 780,
    };

    const user = await getUser()
    // console.log(user)
    const isPremium=user?.isPremium;
    // const isPremium = false;

    

    return (
        <div className="space-y-6 mt-6 px-6">
            <DashbordHeading title={'OverView'} description={'Dashboard Overview'} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Hosted Events</span>
                            <h2 className="text-3xl font-extrabold text-white">{stats.totalEvents}</h2>
                        </div>
                        <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20"><FaCalendarAlt size={24} /></div>
                    </div>
                </Card>
                <Card className="glass border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Ticket Sales</span>
                            <h2 className="text-3xl font-extrabold text-white">{stats.totalAttendees}</h2>
                        </div>
                        <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20"><FaUsers size={24} /></div>
                    </div>
                </Card>
                <Card className="glass border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Accumulated Revenue</span>
                            <h2 className="text-3xl font-extrabold text-white">{`$${stats.totalRevenue.toFixed(2)}`}</h2>
                        </div>
                        <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20"><FaDollarSign size={24} /></div>
                    </div>
                </Card>
            </div>

            {!isPremium ? (
                <Card className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent relative overflow-hidden" radius="lg">
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FaCrown className="text-yellow-400" /> Unlock Unlimited Event Creation
                            </h3>
                            <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                                Standard organizer accounts are limited to <strong>3 events</strong>. Upgrade to our Premium Package for <strong>$49.00</strong> to host unlimited events.
                            </p>
                        </div>
                    <UpdateToPremiumButton/>
                    </div>
                </Card>
            ) : (
                
                <Card className="border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-950 relative overflow-hidden shadow-2xl shadow-indigo-500/5" radius="lg">
                    
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
                                <FaCrown className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]" /> Premium Plan Active
                            </h3>
                            <p className="text-slate-300 text-xs max-w-xl leading-relaxed">
                                Welcome to the elite club! You have unlocked **Unlimited Event Creation**, priority support, and advanced visibility. Enjoy hosting without limits!
                            </p>
                        </div>

                        <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full shadow-inner tracking-wider uppercase shrink-0">
                            PRO ORGANIZER
                        </span>
                    </div>
                </Card>
            )}
        </div>
    )
}
export default OrganizerOverviewPage;