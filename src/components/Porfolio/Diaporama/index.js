'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
    initial: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            // scale: 0.5,
        }
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: 'spring', stiffness: 200, damping: 30 },
            opacity: { duration: 0.5 },
        },
    },
    exit: (direction) => {
        return {
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            transition: {
                x: { type: 'spring', stiffness: 200, damping: 30 },
                opacity: { duration: 0.5 },
            },
        }
    },
}

const Diaporama = ({ pictures }) => {
    const images = pictures
    console.log(images[0].img)

    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    function nextStep() {
        setDirection(1)
        if (index === images.length - 1) {
            setIndex(0)
            return
        }
        setIndex(index + 1)
    }

    function prevStep() {
        setDirection(-1)
        if (index === 0) {
            setIndex(images.length - 1)
            return
        }
        setIndex(index - 1)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextStep()
        }, 4000)
        return () => clearInterval(intervalId)
    }, [index])

    return (
        <div className=" relative h-full w-1/3 flex  p-7 items-center object-cover overflow-hidden bg-red-500">
            <div className="w-full h-2/3 m-0 p-0 flex items-center object-contain relative overflow-hidden rounded-2xl">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        variants={variants}
                        animate="animate"
                        initial="initial"
                        exit="exit"
                        src={images[index].img}
                        alt="slides"
                        className="absolute top-0 left-0 w-full h-full object-cover object-center"
                        key={index}
                        custom={direction}
                    />
                </AnimatePresence>
            </div>
            <motion.button
                onClick={prevStep}
                className="w-10 h-12 rounded-md bg-blue-900 border-none text-white absolute top-1/2 left-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                ◀
            </motion.button>
            <motion.button
                className="w-10 h-12 rounded-md bg-blue-900 border-none text-white absolute top-1/2 right-2"
                onClick={nextStep}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                ▶
            </motion.button>
        </div>
    )
}
export default Diaporama