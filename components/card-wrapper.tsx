"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonHref} : CardWrapperProps) => {
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl">{headerLabel}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel} />
            </CardFooter>
        </Card>
    )
}