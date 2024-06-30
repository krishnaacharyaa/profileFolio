'use client'
import { RecoilRoot } from "recoil";


export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <RecoilRoot>{children}</RecoilRoot>
    );
}