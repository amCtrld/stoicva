"use client"

import { useState, useEffect } from "react"
import { CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Custom hook to detect screen size
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }
        const listener = () => setMatches(media.matches)
        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [matches, query])

    return matches
}

export function BookCallButton() {
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")
    const calendarLink = process.env.NEXT_PUBLIC_CALENDAR_LINK || "https://calendar.app.google/YvUxHcScmVoCDcGw7"

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="bg-[#D4AF37] hover:bg-[#7c5835] text-white rounded-xl shadow-md">
                    Book a Call
                    <CalendarClock className="ml-2 w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className={`${isMobile ? "h-[90vh]" : "w-[90vw] sm:w-[540px]"} p-0 bg-[#800020] border-none`}
            >
                <SheetHeader className="p-6 pb-4 border-b border-[white]/20">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-semibold text-[#D4AF37]">Schedule a Google Meet</SheetTitle>
                    </div>
                </SheetHeader>
                <div className="p-6 pt-4 h-full">
                    <iframe
                        src={calendarLink}
                        className="w-full h-[85vh] border-0 rounded-lg"
                        title="Schedule a Call"
                        loading="lazy"
                        style={{
                            minHeight: "600px",
                            background: "white"
                        }}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}