"use client";

import { useEffect, useState } from 'react'

export const BaseSlider = ({
    items,
    visible=4,
    autoPlay=false,
    intervalTime=3000,
    children
}) => {

    const [index, setIndex] = useState(0);

    const maxIndex = Math.max(0, items.length - visible);

    const next = () => {
        setIndex((prev) => Math.min(prev + 1, maxIndex));
    }

    const prev = () => {
        setIndex((prev) => Math.max(prev - 1, 0));
    }

    useEffect(() => {
        if(!autoPlay || items.length <= visible) return;

        const interval = setInterval(() => {
            setIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
        }, intervalTime)

        return () => clearInterval(interval);
    }, [autoPlay, items.length, maxIndex, intervalTime])

    return children({
        index, setIndex, next, prev, visible, maxIndex, items
    })
}
