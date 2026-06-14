"use client";

import { useState } from "react";
import { Card, Button, Input } from "@heroui/react";
import { FaCheck } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { CircleInfo } from "@gravity-ui/icons"; 

export default function BookingWidget({ price, availableSeats, eventId, eventTitle }) {
  const [quantity, setQuantity] = useState(1);
  const isSoldOut = availableSeats <= 0;

  const { data: session } = useSession();
  const user = session?.user;

  const totalAmount = (price * quantity).toFixed(2);

  const handleBookTicket = async () => {
    const paymentData = {
      type: "booking",
      price: price.toFixed(2),
      eventId,
      eventTitle,
      quantity,
    };

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });
    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <Card className="glass border-white/5 bg-[#18181b]/80 border sticky top-24 shadow-xl rounded-2xl" variant="default">
      {user?.role === 'attendee' ? (
        <Card.Content className="p-8 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-white tracking-tight">Booking Details</h3>

          {/* Stat list */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Ticket Price:</span>
              <span className="text-pink-500 font-extrabold text-xl">
                {price === 0 ? "Free" : `$${price.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Available Seats:</span>
              <span className="text-white font-bold">
                {isSoldOut ? (
                  <span className="text-red-500 uppercase tracking-wider">Sold Out</span>
                ) : (
                  `${availableSeats} Seats Left`
                )}
              </span>
            </div>
          </div>

          {!isSoldOut && (
            <>
              {/* Quantity selector */}
              <Input
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                label="Quantity"
                placeholder="1"
                min={1}
                max={availableSeats}
                value={quantity}
                className="bg-zinc-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white"
              />

              <div className="flex justify-between items-center text-sm font-semibold text-white pt-2 border-t border-zinc-800/60">
                <span className="text-zinc-400">Total Amount:</span>
                <span className="text-white font-bold text-xl">
                  ${totalAmount}
                </span>
              </div>
            </>
          )}

          <Button
            isDisabled={isSoldOut}
            onClick={handleBookTicket}
            className={`w-full font-bold h-12 shadow-lg transition-all ${
              isSoldOut
                ? "bg-zinc-800 text-zinc-500 shadow-none cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-pink-500/10 hover:shadow-pink-500/20 active:scale-98"
            }`}
            radius="lg"
          >
            {isSoldOut ? "Sold Out" : "Book Ticket Now"}
          </Button>

          <div className="flex items-center gap-2 text-[11px] text-zinc-400 justify-center pt-2">
            <FaCheck className="text-green-500 shrink-0" />
            <span>Instant confirmation | Vetted organizers</span>
          </div>
        </Card.Content>
      ) : (
       
        <Card.Content className="p-8 flex flex-col gap-4 text-center items-center justify-center min-h-[250px]">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
            <CircleInfo width={24} height={24} />
          </div>
          
          <h4 className="text-lg font-bold text-white">Action Not Allowed</h4>
          
          <p className="text-sm text-zinc-400 max-w-[240px] leading-relaxed">
            As an <span className="text-amber-400 font-semibold uppercase tracking-wider">{user?.role || "Organizer"}</span>, you cannot purchase or book event tickets.
          </p>

          <div className="w-full mt-4 p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-xl text-xs text-zinc-500">
            Switch to an attendee account to purchase tickets for this event.
          </div>
        </Card.Content>
      )}
    </Card>
  );
}