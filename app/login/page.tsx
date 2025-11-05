"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LoginPage() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            })

            if (response.ok) {
                // Redirect to home page after successful authentication
                window.location.href = "/"
            } else {
                setError("Incorrect password. Please try again.")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-2">
                            <Image src="/goldLogo.png" alt="Fridahva Logo" width={50} height={40} />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full"
                            />
                            {error && (
                                <p className="text-sm text-destructive font-medium">
                                    {error}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || !password.trim()}
                        >
                            {isLoading ? "Verifying..." : "Access Site"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}