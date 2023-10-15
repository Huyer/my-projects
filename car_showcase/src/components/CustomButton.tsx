"use client"
import React from 'react'
import Image from 'next/image'
import { CustomButtonProps } from '@/types'
type Props = {}

const CustomButton = ({ title, containerStyles, handleClick }: CustomButtonProps) => {
    return (
        <button className={`custom-btn ${containerStyles}`} onClick={handleClick}>
            {title}
        </button>
    )
}

export default CustomButton